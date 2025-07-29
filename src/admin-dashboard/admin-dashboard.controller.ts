import { Controller, Get, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/authorization/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Role } from 'src/auth/authorization/role.enum';
import { Roles } from 'src/auth/authorization/roles.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Admin)
@Controller('admin-dashboard')
export class AdminDashboardController {
  constructor(private readonly adminDashboardService: AdminDashboardService) {}

  @Get('today-sales')
  @ApiOperation({ summary: 'Get total sales for today' })
  @ApiResponse({ status: 200, description: 'Returns today’s sales' })
  async getTodaySales() {
    return await this.adminDashboardService.getTodaySales();
  }

  @Get('sales-by-period')
  @ApiOperation({ summary: 'Get sales for a specified period' })
  @ApiQuery({ name: 'startDate', type: String, description: 'Start date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'endDate', type: String, description: 'End date in YYYY-MM-DD format' })
  @ApiResponse({ status: 200, description: 'Returns sales by period' })
  async getSalesByPeriod(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!startDate || !endDate) {
      throw new BadRequestException('startDate and endDate are required');
    }
    return await this.adminDashboardService.getSalesByPeriod(startDate, endDate);
  }

  @Get('income-by-period')
  @ApiOperation({ summary: 'Get total income for a specified period' })
  @ApiQuery({ name: 'startDate', type: String, description: 'Start date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'endDate', type: String, description: 'End date in YYYY-MM-DD format' })
  @ApiResponse({ status: 200, description: 'Returns income by period' })
  async getIncomeByPeriod(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!startDate || !endDate) {
      throw new BadRequestException('startDate and endDate are required');
    }
    return await this.adminDashboardService.getIncomeByPeriod(startDate, endDate);
  }

  @Get('university-share')
  @ApiOperation({ summary: 'Get university’s share for a specified period' })
  @ApiQuery({ name: 'startDate', type: String, description: 'Start date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'endDate', type: String, description: 'End date in YYYY-MM-DD format' })
  @ApiResponse({ status: 200, description: 'Returns university share' })
  async getUniversityShare(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!startDate || !endDate) {
      throw new BadRequestException('startDate and endDate are required');
    }
    return await this.adminDashboardService.getUniversityShare(startDate, endDate);
  }

  @Get('stall-sales')
  @ApiOperation({ summary: 'Get sales for each stall in a specified period' })
  @ApiQuery({ name: 'startDate', type: String, description: 'Start date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'endDate', type: String, description: 'End date in YYYY-MM-DD format' })
  @ApiResponse({ status: 200, description: 'Returns stall sales' })
  async getStallSales(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!startDate || !endDate) {
      throw new BadRequestException('startDate and endDate are required');
    }
    return await this.adminDashboardService.getStallSales(startDate, endDate);
  }

  @Get('top-items')
  @ApiOperation({ summary: 'Get top selling items for a specified period' })
  @ApiQuery({ name: 'startDate', type: String, description: 'Start date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'endDate', type: String, description: 'End date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'limit', type: Number, description: 'Number of items to return', required: false })
  @ApiResponse({ status: 200, description: 'Returns top selling items' })
  async getTopSellingItems(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('limit') limit: string,
  ) {
    if (!startDate || !endDate) {
      throw new BadRequestException('startDate and endDate are required');
    }
    return await this.adminDashboardService.getTopSellingItems(startDate, endDate, parseInt(limit) || 10);
  }

  @Get('overview')
  @ApiOperation({ summary: 'Get dashboard overview with key metrics' })
  @ApiResponse({ status: 200, description: 'Returns dashboard overview' })
  async getDashboardOverview() {
    return await this.adminDashboardService.getDashboardOverview();
  }
}