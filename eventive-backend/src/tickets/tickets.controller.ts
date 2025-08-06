import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto, UpdateTicketDto, TicketTypeDto } from './dto/ticket.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('events/:eventId/tickets')
@UseGuards(JwtAuthGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async createTicket(
    @Param('eventId') eventId: string,
    @Body() createTicketDto: CreateTicketDto,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.createTicket(
      eventId,
      createTicketDto,
      user.organizationId,
      user.userId,
    );
  }

  @Get()
  async findTicketsByEvent(
    @Param('eventId') eventId: string,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.findTicketsByEvent(eventId, user.organizationId);
  }

  @Get(':id')
  async findTicketById(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.findTicketById(id, user.organizationId);
  }

  @Patch(':id')
  async updateTicket(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.updateTicket(id, updateTicketDto, user.organizationId);
  }

  @Post('types')
  async createTicketType(
    @Param('eventId') eventId: string,
    @Body() ticketTypeDto: TicketTypeDto,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.createTicketType(
      eventId,
      ticketTypeDto,
      user.organizationId,
    );
  }

  @Get('types/list')
  async getTicketTypes(
    @Param('eventId') eventId: string,
    @CurrentUser() user: any,
  ) {
    return this.ticketsService.getTicketTypes(eventId, user.organizationId);
  }

  @Get('validate/:ticketNumber')
  async validateTicket(@Param('ticketNumber') ticketNumber: string) {
    const ticket = await this.ticketsService.validateTicket(ticketNumber);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
    return ticket;
  }
}
