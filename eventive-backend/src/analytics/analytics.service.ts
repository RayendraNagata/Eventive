import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface EventAnalyticsData {
  eventId: string;
  eventTitle: string;
  totalViews: number;
  uniqueViews: number;
  totalTicketsSold: number;
  totalRevenue: number;
  totalCheckIns: number;
  conversionRate: number;
  checkInRate: number;
  ticketTypeBreakdown: Array<{
    name: string;
    sold: number;
    revenue: number;
    price: number;
  }>;
  dailyStats: Array<{
    date: string;
    views: number;
    ticketsSold: number;
    revenue: number;
    checkIns: number;
  }>;
}

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getEventAnalytics(eventId: string, organizationId: string): Promise<EventAnalyticsData> {
    const event = await this.prisma.event.findFirst({
      where: {
        id: eventId,
        organizationId,
      },
      include: {
        ticketTypes: {
          include: {
            _count: {
              select: {
                tickets: {
                  where: {
                    status: { notIn: ['CANCELLED', 'REFUNDED'] },
                  },
                },
              },
            },
          },
        },
        tickets: {
          where: {
            status: { notIn: ['CANCELLED', 'REFUNDED'] },
          },
        },
        checkIns: true,
        analytics: {
          orderBy: {
            date: 'asc',
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    // Calculate totals
    const totalViews = event.analytics.reduce((sum, a) => sum + a.views, 0);
    const uniqueViews = event.analytics.reduce((sum, a) => sum + a.uniqueViews, 0);
    const totalTicketsSold = event.tickets.length;
    const totalRevenue = event.tickets.reduce((sum, ticket) => {
      return sum + Number(ticket.price);
    }, 0);
    const totalCheckIns = event.checkIns.length;

    // Calculate conversion and check-in rates
    const conversionRate = uniqueViews > 0 ? (totalTicketsSold / uniqueViews) * 100 : 0;
    const checkInRate = totalTicketsSold > 0 ? (totalCheckIns / totalTicketsSold) * 100 : 0;

    // Ticket type breakdown
    const ticketTypeBreakdown = event.ticketTypes.map(ticketType => {
      const soldTickets = event.tickets.filter(t => t.ticketTypeId === ticketType.id);
      const revenue = soldTickets.reduce((sum, ticket) => sum + Number(ticket.price), 0);
      
      return {
        name: ticketType.name,
        sold: soldTickets.length,
        revenue,
        price: Number(ticketType.price),
      };
    });

    // Daily stats from analytics table
    const dailyStats = event.analytics.map(analytic => ({
      date: analytic.date.toISOString().split('T')[0],
      views: analytic.views,
      ticketsSold: analytic.ticketsSold,
      revenue: Number(analytic.revenue),
      checkIns: analytic.checkIns,
    }));

    return {
      eventId: event.id,
      eventTitle: event.title,
      totalViews,
      uniqueViews,
      totalTicketsSold,
      totalRevenue,
      totalCheckIns,
      conversionRate: Math.round(conversionRate * 100) / 100,
      checkInRate: Math.round(checkInRate * 100) / 100,
      ticketTypeBreakdown,
      dailyStats,
    };
  }

  async getOrganizationAnalytics(organizationId: string, dateFrom?: Date, dateTo?: Date) {
    const whereCondition: any = { organizationId };
    
    if (dateFrom || dateTo) {
      whereCondition.createdAt = {};
      if (dateFrom) whereCondition.createdAt.gte = dateFrom;
      if (dateTo) whereCondition.createdAt.lte = dateTo;
    }

    const [totalEvents, totalTicketsSold, totalRevenue, totalCheckIns] = await Promise.all([
      this.prisma.event.count({ where: whereCondition }),
      this.prisma.ticket.count({
        where: {
          ...whereCondition,
          status: { notIn: ['CANCELLED', 'REFUNDED'] },
        },
      }),
      this.prisma.ticket.aggregate({
        where: {
          ...whereCondition,
          status: { notIn: ['CANCELLED', 'REFUNDED'] },
        },
        _sum: {
          price: true,
        },
      }),
      this.prisma.checkIn.count({
        where: {
          event: whereCondition,
        },
      }),
    ]);

    const checkInRate = totalTicketsSold > 0 ? (totalCheckIns / totalTicketsSold) * 100 : 0;

    return {
      totalEvents,
      totalTicketsSold,
      totalRevenue: Number(totalRevenue._sum.price || 0),
      totalCheckIns,
      checkInRate: Math.round(checkInRate * 100) / 100,
    };
  }

  async recordEventView(eventId: string, isUnique: boolean = false) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAnalytic = await this.prisma.eventAnalytic.findUnique({
      where: {
        eventId_date: {
          eventId,
          date: today,
        },
      },
    });

    if (existingAnalytic) {
      await this.prisma.eventAnalytic.update({
        where: { id: existingAnalytic.id },
        data: {
          views: existingAnalytic.views + 1,
          uniqueViews: isUnique ? existingAnalytic.uniqueViews + 1 : existingAnalytic.uniqueViews,
        },
      });
    } else {
      await this.prisma.eventAnalytic.create({
        data: {
          eventId,
          date: today,
          views: 1,
          uniqueViews: isUnique ? 1 : 0,
        },
      });
    }
  }
}
