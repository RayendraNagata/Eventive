import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('events/:eventId')
  async getEventAnalytics(
    @Param('eventId') eventId: string,
    @CurrentUser() user: any,
  ) {
    return this.analyticsService.getEventAnalytics(eventId, user.organizationId);
  }

  @Get('organization')
  async getOrganizationAnalytics(
    @CurrentUser() user: any,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const fromDate = dateFrom ? new Date(dateFrom) : undefined;
    const toDate = dateTo ? new Date(dateTo) : undefined;
    
    return this.analyticsService.getOrganizationAnalytics(
      user.organizationId,
      fromDate,
      toDate,
    );
  }
}
