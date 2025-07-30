import { Controller, Get, Query, UseGuards, BadRequestException, Param } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/authorization/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Role } from 'src/auth/authorization/role.enum';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { StallManagerDashboardService } from './manager-dashboard.service';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Manager)
@Controller('stall-manager-dashboard')
export class StallManagerDashboardController {
  constructor(private readonly stallManagerDashboardService: StallManagerDashboardService) {}

  @Get(':stallId/today-sales')
  @ApiOperation({ summary: 'Get total sales for today for a specific stall' })
  @ApiParam({ name: 'stallId', type: Number, description: 'ID of the stall' })
  @ApiResponse({ status: 200, description: 'Returns today’s sales for the stall' })
  async getTodaySales(@Param('stallId') stallId: string) {
    return await this.stallManagerDashboardService.getTodaySales(parseInt(stallId));
  }

  @Get(':stallId/sales-by-period')
  @ApiOperation({ summary: 'Get sales for a specified period for a specific stall' })
  @ApiParam({ name: 'stallId', type: Number, description: 'ID of the stall' })
  @ApiQuery({ name: 'startDate', type: String, description: 'Start date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'endDate', type: String, description: 'End date in YYYY-MM-DD format' })
  @ApiResponse({ status: 200, description: 'Returns sales by period for the stall' })
  async getSalesByPeriod(
    @Param('stallId') stallId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!startDate || !endDate) {
      throw new BadRequestException('startDate and endDate are required');
    }
    return await this.stallManagerDashboardService.getSalesByPeriod(parseInt(stallId), startDate, endDate);
  }

  @Get(':stallId/income-by-period')
  @ApiOperation({ summary: 'Get total income for a specified period for a specific stall' })
  @ApiParam({ name: 'stallId', type: Number, description: 'ID of the stall' })
  @ApiQuery({ name: 'startDate', type: String, description: 'Start date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'endDate', type: String, description: 'End date in YYYY-MM-DD format' })
  @ApiResponse({ status: 200, description: 'Returns income by period for the stall' })
  async getIncomeByPeriod(
    @Param('stallId') stallId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!startDate || !endDate) {
      throw new BadRequestException('startDate and endDate are required');
    }
    return await this.stallManagerDashboardService.getIncomeByPeriod(parseInt(stallId), startDate, endDate);
  }

  @Get(':stallId/top-items')
  @ApiOperation({ summary: 'Get top selling items for a specified period for a specific stall' })
  @ApiParam({ name: 'stallId', type: Number, description: 'ID of the stall' })
  @ApiQuery({ name: 'startDate', type: String, description: 'Start date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'endDate', type: String, description: 'End date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'limit', type: Number, description: 'Number of items to return', required: false })
  @ApiResponse({ status: 200, description: 'Returns top selling items for the stall' })
  async getTopSellingItems(
    @Param('stallId') stallId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('limit') limit: string,
  ) {
    if (!startDate || !endDate) {
      throw new BadRequestException('startDate and endDate are required');
    }
    return await this.stallManagerDashboardService.getTopSellingItems(
      parseInt(stallId),
      startDate,
      endDate,
      parseInt(limit) || 10
    );
  }

  @Get(':stallId/overview')
  @ApiOperation({ summary: 'Get dashboard overview with key metrics for a specific stall' })
  @ApiParam({ name: 'stallId', type: Number, description: 'ID of the stall' })
  @ApiResponse({ status: 200, description: 'Returns dashboard overview for the stall' })
  async getDashboardOverview(@Param('stallId') stallId: string) {
    return await this.stallManagerDashboardService.getDashboardOverview(parseInt(stallId));
  }
}