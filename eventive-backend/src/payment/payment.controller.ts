import {
  Controller,
  Post,
  Body,
  Param,
  Headers,
  RawBody,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

export class CreatePaymentIntentDto {
  ticketId: string;
  amount: number;
  currency?: string;
}

export class ConfirmPaymentDto {
  paymentIntentId: string;
  ticketId: string;
}

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-intent')
  @UseGuards(JwtAuthGuard)
  async createPaymentIntent(
    @Body() createPaymentIntentDto: CreatePaymentIntentDto,
    @CurrentUser() user: any,
  ) {
    return this.paymentService.createPaymentIntent(
      createPaymentIntentDto.ticketId,
      createPaymentIntentDto.amount,
      createPaymentIntentDto.currency,
    );
  }

  @Post('confirm')
  @UseGuards(JwtAuthGuard)
  async confirmPayment(
    @Body() confirmPaymentDto: ConfirmPaymentDto,
    @CurrentUser() user: any,
  ) {
    return this.paymentService.confirmPayment(
      confirmPaymentDto.paymentIntentId,
      confirmPaymentDto.ticketId,
    );
  }

  @Post('refund/:ticketId')
  @UseGuards(JwtAuthGuard)
  async refundPayment(
    @Param('ticketId') ticketId: string,
    @CurrentUser() user: any,
  ) {
    return this.paymentService.refundPayment(ticketId);
  }

  @Post('webhook/stripe')
  async handleStripeWebhook(
    @Headers('stripe-signature') signature: string,
    @RawBody() payload: Buffer,
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    return this.paymentService.handleStripeWebhook(signature, payload);
  }
}
