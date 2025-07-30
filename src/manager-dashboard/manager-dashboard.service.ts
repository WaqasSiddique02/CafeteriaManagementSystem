import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Stall } from 'src/stalls/entities/stall.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StallManagerDashboardService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Stall) private stallRepository: Repository<Stall>,
    @InjectRepository(MenuItem) private menuItemRepository: Repository<MenuItem>,
  ) {}

  private async validateStall(stallId: number) {
    const stall = await this.stallRepository.findOne({ where: { id: stallId } });
    if (!stall) {
      throw new BadRequestException('Stall not found');
    }
    return stall;
  }

  async getTodaySales(stallId: number) {
    try {
      await this.validateStall(stallId);
      const today = new Date().toISOString().split('T')[0];
      const query = `
        SELECT SUM(total_amount) as total
        FROM orders
        WHERE stall_id = $1 AND DATE(created_at) = $2
      `;
      const result = await this.orderRepository.query(query, [stallId, today]);

      return {
        message: 'Today’s sales fetched successfully.',
        data: {
          totalSales: parseFloat(result[0]?.total) || 0,
          date: today,
        },
      };
    } catch (error) {
      console.error('Error in getTodaySales:', error);
      throw new InternalServerErrorException('Failed to fetch today’s sales');
    }
  }

  async getSalesByPeriod(stallId: number, startDate: string, endDate: string) {
    try {
      await this.validateStall(stallId);
      if (!startDate || !endDate) {
        throw new BadRequestException('startDate and endDate are required');
      }
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new BadRequestException('Invalid date format');
      }
      if (start > end) {
        throw new BadRequestException('Start date must be before end date');
      }

      const query = `
        SELECT DATE(created_at) as date, SUM(total_amount) as total
        FROM orders
        WHERE stall_id = $1 AND created_at BETWEEN $2 AND $3
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
      `;
      const result = await this.orderRepository.query(query, [stallId, startDate, endDate]);

      if (result.length === 0) {
        return { message: 'No sales found for the specified period' };
      }

      return {
        message: 'Sales by period fetched successfully.',
        data: result.map(item => ({
          date: item.date,
          total: parseFloat(item.total) || 0,
        })),
      };
    } catch (error) {
      console.error('Error in getSalesByPeriod:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch sales by period');
    }
  }

  async getIncomeByPeriod(stallId: number, startDate: string, endDate: string) {
    try {
      await this.validateStall(stallId);
      if (!startDate || !endDate) {
        throw new BadRequestException('startDate and endDate are required');
      }
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new BadRequestException('Invalid date format');
      }
      if (start > end) {
        throw new BadRequestException('Start date must be before end date');
      }

      const query = `
        SELECT SUM(total_amount) as total
        FROM orders
        WHERE stall_id = $1 AND created_at BETWEEN $2 AND $3
      `;
      const result = await this.orderRepository.query(query, [stallId, startDate, endDate]);

      return {
        message: 'Income by period fetched successfully.',
        data: {
          totalIncome: parseFloat(result[0]?.total) || 0,
          period: { start: startDate, end: endDate },
        },
      };
    } catch (error) {
      console.error('Error in getIncomeByPeriod:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch income by period');
    }
  }

  async getTopSellingItems(stallId: number, startDate: string, endDate: string, limit: number = 10) {
    try {
      await this.validateStall(stallId);
      if (!startDate || !endDate) {
        throw new BadRequestException('startDate and endDate are required');
      }
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new BadRequestException('Invalid date format');
      }
      if (start > end) {
        throw new BadRequestException('Start date must be before end date');
      }
      if (limit < 1) {
        throw new BadRequestException('Limit must be a positive number');
      }

      const query = `
        SELECT mi.id as item_id, mi.name as item_name,
               SUM(oi.quantity) as total_quantity,
               SUM(oi.quantity * oi.item_price) as total_revenue
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN menu_items mi ON oi.menu_item_id = mi.id
        WHERE o.stall_id = $1 AND o.created_at BETWEEN $2 AND $3
        GROUP BY mi.id, mi.name
        ORDER BY total_quantity DESC
        LIMIT $4
      `;
      const result = await this.orderRepository.query(query, [stallId, startDate, endDate, limit]);

      if (result.length === 0) {
        return { message: 'No top selling items found for the specified period' };
      }

      return {
        message: 'Top selling items fetched successfully.',
        data: result.map(item => ({
          itemId: item.item_id,
          itemName: item.item_name,
          totalQuantity: parseInt(item.total_quantity) || 0,
          totalRevenue: parseFloat(item.total_revenue) || 0,
        })),
      };
    } catch (error) {
      console.error('Error in getTopSellingItems:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch top selling items');
    }
  }

  async getDashboardOverview(stallId: number) {
    try {
      const stall = await this.validateStall(stallId);
      const today = new Date().toISOString().split('T')[0];
      const last30Days = new Date();
      last30Days.setDate(last30Days.getDate() - 30);
      const last30DaysStr = last30Days.toISOString().split('T')[0];

      const todaySalesQuery = `
        SELECT SUM(total_amount) as total
        FROM orders
        WHERE stall_id = $1 AND DATE(created_at) = $2
      `;
      const last30DaysSalesQuery = `
        SELECT SUM(total_amount) as total
        FROM orders
        WHERE stall_id = $1 AND created_at BETWEEN $2 AND $3
      `;
      const topItemsQuery = `
        SELECT mi.id as item_id, mi.name as item_name,
               SUM(oi.quantity) as total_quantity,
               SUM(oi.quantity * oi.item_price) as total_revenue
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN menu_items mi ON oi.menu_item_id = mi.id
        WHERE o.stall_id = $1 AND o.created_at BETWEEN $2 AND $3
        GROUP BY mi.id, mi.name
        ORDER BY total_quantity DESC
        LIMIT 5
      `;
      const menuItemCountQuery = `SELECT COUNT(*) as count FROM menu_items WHERE stall_id = $1`;

      const [todaySalesResult, last30DaysSalesResult, topItemsResult, menuItemCountResult] =
        await Promise.all([
          this.orderRepository.query(todaySalesQuery, [stallId, today]),
          this.orderRepository.query(last30DaysSalesQuery, [stallId, last30DaysStr, today]),
          this.orderRepository.query(topItemsQuery, [stallId, last30DaysStr, today]),
          this.menuItemRepository.query(menuItemCountQuery, [stallId]),
        ]);

      return {
        message: 'Dashboard overview fetched successfully.',
        data: {
          stallInfo: {
            id: stall.id,
            name: stall.name,
            universitySharePercent: stall.university_share_percent,
          },
          todaySales: {
            totalSales: parseFloat(todaySalesResult[0]?.total) || 0,
            date: today,
          },
          last30DaysSales: {
            totalIncome: parseFloat(last30DaysSalesResult[0]?.total) || 0,
            period: { start: last30DaysStr, end: today },
          },
          topItems: topItemsResult.length > 0 ? topItemsResult.map(item => ({
            itemId: item.item_id,
            itemName: item.item_name,
            totalQuantity: parseInt(item.total_quantity) || 0,
            totalRevenue: parseFloat(item.total_revenue) || 0,
          })) : [],
          menuItemCount: parseInt(menuItemCountResult[0]?.count) || 0,
          lastUpdated: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Error in getDashboardOverview:', error);
      throw new InternalServerErrorException('Failed to fetch dashboard overview');
    }
  }
}