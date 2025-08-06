import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CheckinService } from './checkin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

export class CheckInDto {
  ticketNumber: string;
  location?: string;
  notes?: string;
}

@Controller('checkin')
@UseGuards(JwtAuthGuard)
export class CheckinController {
  constructor(private readonly checkinService: CheckinService) {}

  @Post(':eventId/scan')
  async checkInTicket(
    @Param('eventId') eventId: string,
    @Body() checkInDto: CheckInDto,
    @CurrentUser() user: any,
  ) {
    return this.checkinService.checkInTicket(
      checkInDto.ticketNumber,
      eventId,
      user.userId,
      checkInDto.location,
      checkInDto.notes,
    );
  }

  @Get(':eventId')
  async getEventCheckIns(
    @Param('eventId') eventId: string,
    @CurrentUser() user: any,
  ) {
    return this.checkinService.getEventCheckIns(eventId, user.organizationId);
  }

  @Get(':eventId/stats')
  async getCheckInStats(
    @Param('eventId') eventId: string,
    @CurrentUser() user: any,
  ) {
    return this.checkinService.getCheckInStats(eventId, user.organizationId);
  }
}
