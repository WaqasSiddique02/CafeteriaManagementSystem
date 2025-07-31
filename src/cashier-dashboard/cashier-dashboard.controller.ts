import {
  Controller,
  Get,
  Query,
  UseGuards,
  BadRequestException,
  Param,
  Put,
  Body,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/authorization/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from 'src/auth/authorization/role.enum';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { CashierDashboardService } from './cashier-dashboard.service';

@ApiTags('Cashier Dashboard')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.Cashier)
@Controller('cashier-dashboard')
export class CashierDashboardController {
  constructor(
    private readonly cashierDashboardService: CashierDashboardService,
  ) {}

  @Get(':stallId/today-sales')
  @ApiOperation({
    summary: "Get today's sales and order count for a specific stall",
  })
  @ApiParam({ name: 'stallId', type: Number, description: 'ID of the stall' })
  @ApiResponse({ status: 200, description: "Returns today's sales data" })
  @ApiResponse({ status: 404, description: 'Stall not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getTodaySales(@Param('stallId') stallId: string) {
    return this.cashierDashboardService.getTodaySales(parseInt(stallId));
  }

  @Get(':stallId/recent-orders')
  @ApiOperation({ summary: 'Get recent orders for a specific stall' })
  @ApiParam({ name: 'stallId', type: Number, description: 'ID of the stall' })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of orders to return (default: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns list of recent orders with items',
  })
  @ApiResponse({ status: 400, description: 'Invalid limit value' })
  @ApiResponse({ status: 404, description: 'Stall not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getRecentOrders(
    @Param('stallId') stallId: string,
    @Query('limit') limit: string,
  ) {
    return this.cashierDashboardService.getRecentOrders(
      parseInt(stallId),
      limit ? parseInt(limit) : 10,
    );
  }

  @Get(':stallId/quick-stats')
  @ApiOperation({ summary: 'Get quick statistics for the cashier dashboard' })
  @ApiParam({ name: 'stallId', type: Number, description: 'ID of the stall' })
  @ApiResponse({
    status: 200,
    description: 'Returns quick stats including sales, orders, and menu items',
  })
  @ApiResponse({ status: 404, description: 'Stall not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getQuickStats(@Param('stallId') stallId: string) {
    return this.cashierDashboardService.getQuickStats(parseInt(stallId));
  }

  @Get(':stallId/popular-items')
  @ApiOperation({ summary: "Get today's popular items for a specific stall" })
  @ApiParam({ name: 'stallId', type: Number, description: 'ID of the stall' })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of items to return (default: 5)',
  })
  @ApiResponse({ status: 200, description: 'Returns list of popular items' })
  @ApiResponse({ status: 400, description: 'Invalid limit value' })
  @ApiResponse({ status: 404, description: 'Stall not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getPopularItems(
    @Param('stallId') stallId: string,
    @Query('limit') limit: string,
  ) {
    return this.cashierDashboardService.getPopularItems(
      parseInt(stallId),
      limit ? parseInt(limit) : 5,
    );
  }
}
