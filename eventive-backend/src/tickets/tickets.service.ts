import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto, UpdateTicketDto, TicketTypeDto } from './dto/ticket.dto';
import { Ticket, TicketType, TicketStatus, PaymentStatus } from '@prisma/client';
import * as QRCode from 'qrcode';
import { randomBytes } from 'crypto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async createTicket(
    eventId: string,
    createTicketDto: CreateTicketDto,
    organizationId: string,
    userId?: string,
  ): Promise<Ticket> {
    const ticketType = await this.prisma.ticketType.findUnique({
      where: { id: createTicketDto.ticketTypeId },
      include: { event: true },
    });

    if (!ticketType) {
      throw new NotFoundException('Ticket type not found');
    }

    if (ticketType.eventId !== eventId) {
      throw new BadRequestException('Ticket type does not belong to this event');
    }

    // Check availability
    const soldTickets = await this.prisma.ticket.count({
      where: {
        ticketTypeId: createTicketDto.ticketTypeId,
        status: { not: TicketStatus.CANCELLED },
      },
    });

    if (ticketType.quantity && soldTickets >= ticketType.quantity) {
      throw new BadRequestException('Ticket type is sold out');
    }

    // Generate unique ticket number and QR code
    const ticketNumber = this.generateTicketNumber();
    const qrCodeData = await this.generateQRCode(ticketNumber);

    const ticket = await this.prisma.ticket.create({
      data: {
        ticketNumber,
        qrCode: qrCodeData,
        firstName: createTicketDto.firstName,
        lastName: createTicketDto.lastName,
        email: createTicketDto.email,
        phone: createTicketDto.phone,
        price: ticketType.price,
        currency: ticketType.currency,
        notes: createTicketDto.notes,
        eventId,
        ticketTypeId: createTicketDto.ticketTypeId,
        userId,
        organizationId,
        paymentMethod: createTicketDto.paymentMethod || 'FREE',
        paymentStatus: ticketType.price.equals(0) ? PaymentStatus.COMPLETED : PaymentStatus.PENDING,
        status: ticketType.price.equals(0) ? TicketStatus.CONFIRMED : TicketStatus.PENDING,
      },
      include: {
        event: true,
        ticketType: true,
        user: true,
      },
    });

    return ticket;
  }

  async findTicketsByEvent(eventId: string, organizationId: string): Promise<Ticket[]> {
    return this.prisma.ticket.findMany({
      where: {
        eventId,
        organizationId,
      },
      include: {
        ticketType: true,
        user: true,
        checkIns: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findTicketById(id: string, organizationId: string): Promise<Ticket> {
    const ticket = await this.prisma.ticket.findFirst({
      where: {
        id,
        organizationId,
      },
      include: {
        event: true,
        ticketType: true,
        user: true,
        checkIns: true,
      },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return ticket;
  }

  async updateTicket(
    id: string,
    updateTicketDto: UpdateTicketDto,
    organizationId: string,
  ): Promise<Ticket> {
    const ticket = await this.findTicketById(id, organizationId);

    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
      include: {
        event: true,
        ticketType: true,
        user: true,
      },
    });
  }

  async createTicketType(
    eventId: string,
    ticketTypeDto: TicketTypeDto,
    organizationId: string,
  ): Promise<TicketType> {
    const event = await this.prisma.event.findFirst({
      where: {
        id: eventId,
        organizationId,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.prisma.ticketType.create({
      data: {
        ...ticketTypeDto,
        eventId,
      },
    });
  }

  async getTicketTypes(eventId: string, organizationId: string): Promise<TicketType[]> {
    const event = await this.prisma.event.findFirst({
      where: {
        id: eventId,
        organizationId,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.prisma.ticketType.findMany({
      where: { eventId },
      include: {
        _count: {
          select: {
            tickets: {
              where: {
                status: { not: TicketStatus.CANCELLED },
              },
            },
          },
        },
      },
    });
  }

  private generateTicketNumber(): string {
    const timestamp = Date.now().toString();
    const random = randomBytes(4).toString('hex').toUpperCase();
    return `TKT-${timestamp.slice(-6)}-${random}`;
  }

  private async generateQRCode(ticketNumber: string): Promise<string> {
    try {
      const qrCodeData = await QRCode.toDataURL(ticketNumber);
      return qrCodeData;
    } catch (error) {
      throw new BadRequestException('Failed to generate QR code');
    }
  }

  async validateTicket(ticketNumber: string): Promise<Ticket | null> {
    return this.prisma.ticket.findUnique({
      where: { ticketNumber },
      include: {
        event: true,
        ticketType: true,
        checkIns: true,
      },
    });
  }
}
