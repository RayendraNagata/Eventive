import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { organization: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.organizationId) {
      throw new ForbiddenException('User must belong to an organization to create events');
    }

    // Generate slug from title
    const slug = createEventDto.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const event = await this.prisma.event.create({
      data: {
        ...createEventDto,
        slug: `${slug}-${Date.now()}`, // Add timestamp to ensure uniqueness
        startDate: new Date(createEventDto.startDate),
        endDate: new Date(createEventDto.endDate),
        organizationId: user.organizationId,
        createdById: userId,
      },
      include: {
        organization: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        ticketTypes: true,
      },
    });

    return event;
  }

  async findAll(query: any = {}) {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      type,
      isPublic,
      organizationId,
    } = query;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (type) {
      where.type = type;
    }

    if (isPublic !== undefined) {
      where.isPublic = isPublic === 'true';
    }

    if (organizationId) {
      where.organizationId = organizationId;
    }

    const skip = (page - 1) * limit;

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          organization: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          ticketTypes: {
            where: { status: 'ACTIVE' },
          },
          _count: {
            select: {
              tickets: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.event.count({ where }),
    ]);

    return {
      events,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        organization: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        ticketTypes: {
          where: { status: 'ACTIVE' },
          orderBy: { price: 'asc' },
        },
        _count: {
          select: {
            tickets: true,
            checkIns: true,
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async findBySlug(slug: string) {
    const event = await this.prisma.event.findUnique({
      where: { slug },
      include: {
        organization: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        ticketTypes: {
          where: { status: 'ACTIVE' },
          orderBy: { price: 'asc' },
        },
        _count: {
          select: {
            tickets: true,
            checkIns: true,
          },
        },
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: { organization: true },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // Check if user has permission to update this event
    if (
      event.createdById !== userId &&
      user?.organizationId !== event.organizationId &&
      user?.role !== 'ADMIN'
    ) {
      throw new ForbiddenException('You do not have permission to update this event');
    }

    const updateData: any = { ...updateEventDto };

    if (updateEventDto.startDate) {
      updateData.startDate = new Date(updateEventDto.startDate);
    }

    if (updateEventDto.endDate) {
      updateData.endDate = new Date(updateEventDto.endDate);
    }

    const updatedEvent = await this.prisma.event.update({
      where: { id },
      data: updateData,
      include: {
        organization: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        ticketTypes: true,
      },
    });

    return updatedEvent;
  }

  async remove(id: string, userId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    // Check if user has permission to delete this event
    if (
      event.createdById !== userId &&
      user?.organizationId !== event.organizationId &&
      user?.role !== 'ADMIN'
    ) {
      throw new ForbiddenException('You do not have permission to delete this event');
    }

    await this.prisma.event.delete({
      where: { id },
    });

    return { message: 'Event deleted successfully' };
  }
}
