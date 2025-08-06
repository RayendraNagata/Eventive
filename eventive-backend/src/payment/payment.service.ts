import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

export interface PaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  error?: string;
}

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is required');
    }
    
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-07-30.basil',
    });
  }

  async createPaymentIntent(
    ticketId: string,
    amount: number,
    currency: string = 'usd',
  ): Promise<PaymentIntent> {
    try {
      const ticket = await this.prisma.ticket.findUnique({
        where: { id: ticketId },
        include: {
          event: true,
          ticketType: true,
        },
      });

      if (!ticket) {
        throw new BadRequestException('Ticket not found');
      }

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
        metadata: {
          ticketId: ticket.id,
          eventId: ticket.eventId,
          ticketNumber: ticket.ticketNumber,
        },
        description: `Ticket for ${ticket.event.title} - ${ticket.ticketType.name}`,
      });

      return {
        clientSecret: paymentIntent.client_secret || '',
        paymentIntentId: paymentIntent.id,
        amount,
        currency,
      };
    } catch (error) {
      throw new BadRequestException(`Payment intent creation failed: ${error.message}`);
    }
  }

  async confirmPayment(
    paymentIntentId: string,
    ticketId: string,
  ): Promise<PaymentResult> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status === 'succeeded') {
        // Update ticket payment status
        await this.prisma.ticket.update({
          where: { id: ticketId },
          data: {
            paymentStatus: 'COMPLETED',
            status: 'CONFIRMED',
            paymentId: paymentIntentId,
            paymentData: {
              stripePaymentIntentId: paymentIntentId,
              amount: paymentIntent.amount,
              currency: paymentIntent.currency,
              paymentMethod: 'STRIPE',
            },
          },
        });

        return {
          success: true,
          paymentId: paymentIntentId,
        };
      }

      return {
        success: false,
        error: `Payment status: ${paymentIntent.status}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async handleStripeWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');

    if (!webhookSecret) {
      throw new BadRequestException('Stripe webhook secret is not configured');
    }

    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      return { received: true };
    } catch (error) {
      throw new BadRequestException(`Webhook error: ${error.message}`);
    }
  }

  private async handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
    const ticketId = paymentIntent.metadata?.ticketId;

    if (ticketId) {
      await this.prisma.ticket.update({
        where: { id: ticketId },
        data: {
          paymentStatus: 'COMPLETED',
          status: 'CONFIRMED',
          paymentId: paymentIntent.id,
        },
      });

      // You can add email notification here
      console.log(`Payment succeeded for ticket ${ticketId}`);
    }
  }

  private async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
    const ticketId = paymentIntent.metadata?.ticketId;

    if (ticketId) {
      await this.prisma.ticket.update({
        where: { id: ticketId },
        data: {
          paymentStatus: 'FAILED',
          status: 'CANCELLED',
        },
      });

      console.log(`Payment failed for ticket ${ticketId}`);
    }
  }

  async createMidtransPayment(ticketId: string, amount: number) {
    // Placeholder for Midtrans integration
    // This would integrate with Midtrans SDK
    throw new BadRequestException('Midtrans integration not implemented yet');
  }

  async refundPayment(ticketId: string): Promise<PaymentResult> {
    try {
      const ticket = await this.prisma.ticket.findUnique({
        where: { id: ticketId },
      });

      if (!ticket || !ticket.paymentId) {
        throw new BadRequestException('Ticket or payment not found');
      }

      const refund = await this.stripe.refunds.create({
        payment_intent: ticket.paymentId,
      });

      if (refund.status === 'succeeded') {
        await this.prisma.ticket.update({
          where: { id: ticketId },
          data: {
            paymentStatus: 'REFUNDED',
            status: 'REFUNDED',
          },
        });

        return {
          success: true,
          paymentId: refund.id,
        };
      }

      return {
        success: false,
        error: `Refund status: ${refund.status}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
