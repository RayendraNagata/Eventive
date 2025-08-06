import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

enum TicketStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  USED = 'USED',
}

export interface CheckInResult {
  success: boolean;
  message: string;
  ticket?: any;
  checkIn?: any;
}

@Injectable()
export class CheckinService {
  constructor(private prisma: PrismaService) {}

  async checkInTicket(
    ticketNumber: string,
    eventId: string,
    userId?: string,
    location?: string,
    notes?: string,
  ): Promise<CheckInResult> {
    // Find the ticket
    const ticket = await this.prisma.ticket.findUnique({
      where: { ticketNumber },
      include: {
        event: true,
        ticketType: true,
        checkIns: true,
      },
    });

    if (!ticket) {
      return {
        success: false,
        message: 'Ticket not found',
      };
    }

    if (ticket.eventId !== eventId) {
      return {
        success: false,
        message: 'Ticket is not for this event',
      };
    }

    if (ticket.status !== TicketStatus.CONFIRMED) {
      return {
        success: false,
        message: `Ticket status is ${ticket.status}. Only confirmed tickets can be checked in.`,
      };
    }

    // Check if already checked in
    const existingCheckIn = await this.prisma.checkIn.findUnique({
      where: {
        ticketId_eventId: {
          ticketId: ticket.id,
          eventId: eventId,
        },
      },
    });

    if (existingCheckIn) {
      return {
        success: false,
        message: 'Ticket has already been checked in',
        ticket,
        checkIn: existingCheckIn,
      };
    }

    // Create check-in record
    const checkIn = await this.prisma.checkIn.create({
      data: {
        ticketId: ticket.id,
        eventId: eventId,
        userId: userId,
        location: location,
        notes: notes,
      },
    });

    // Update ticket status to USED
    await this.prisma.ticket.update({
      where: { id: ticket.id },
      data: { status: TicketStatus.USED },
    });

    return {
      success: true,
      message: 'Check-in successful',
      ticket,
      checkIn,
    };
  }

  async getEventCheckIns(eventId: string, organizationId: string) {
    const event = await this.prisma.event.findFirst({
      where: {
        id: eventId,
        organizationId,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return this.prisma.checkIn.findMany({
      where: { eventId },
      include: {
        ticket: {
          include: {
            ticketType: true,
          },
        },
        user: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  async getCheckInStats(eventId: string, organizationId: string) {
    const event = await this.prisma.event.findFirst({
      where: {
        id: eventId,
        organizationId,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const [totalTickets, checkedInTickets, checkInsByHour] = await Promise.all([
      this.prisma.ticket.count({
        where: {
          eventId,
          status: { in: [TicketStatus.CONFIRMED, TicketStatus.USED] },
        },
      }),
      this.prisma.checkIn.count({
        where: { eventId },
      }),
      this.prisma.checkIn.groupBy({
        by: ['timestamp'],
        where: { eventId },
        _count: true,
      }),
    ]);

    const checkInRate = totalTickets > 0 ? (checkedInTickets / totalTickets) * 100 : 0;

    return {
      totalTickets,
      checkedInTickets,
      checkInRate: Math.round(checkInRate * 100) / 100,
      pendingTickets: totalTickets - checkedInTickets,
      checkInsByHour,
    };
  }
}
