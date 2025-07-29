import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Stall } from 'src/stalls/entities/stall.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminDashboardService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Stall) private stallRepository: Repository<Stall>,
    @InjectRepository(MenuItem) private menuItemRepository: Repository<MenuItem>,
  ) {}

  async getTodaySales() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const query = `
        SELECT SUM(total_amount) as total
        FROM orders
        WHERE DATE(created_at) = $1
      `;
      const result = await this.orderRepository.query(query, [today]);

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

  async getSalesByPeriod(startDate: string, endDate: string) {
    try {
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
        WHERE created_at BETWEEN $1 AND $2
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
      `;
      const result = await this.orderRepository.query(query, [startDate, endDate]);

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

  async getIncomeByPeriod(startDate: string, endDate: string) {
    try {
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
        WHERE created_at BETWEEN $1 AND $2
      `;
      const result = await this.orderRepository.query(query, [startDate, endDate]);

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

  async getUniversityShare(startDate: string, endDate: string) {
    try {
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
        SELECT SUM(o.total_amount * s.university_share_percent / 100) as university_share,
               SUM(o.total_amount) as total_sales
        FROM orders o
        JOIN stalls s ON o.stall_id = s.id
        WHERE o.created_at BETWEEN $1 AND $2
      `;
      const result = await this.orderRepository.query(query, [startDate, endDate]);

      return {
        message: 'University share fetched successfully.',
        data: {
          universityShare: parseFloat(result[0]?.university_share) || 0,
          totalSales: parseFloat(result[0]?.total_sales) || 0,
          period: { start: startDate, end: endDate },
        },
      };
    } catch (error) {
      console.error('Error in getUniversityShare:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch university share');
    }
  }

  async getStallSales(startDate: string, endDate: string) {
    try {
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
        SELECT s.id as stall_id, s.name as stall_name,
               SUM(o.total_amount) as total_sales,
               SUM(o.total_amount * s.university_share_percent / 100) as university_share
        FROM orders o
        JOIN stalls s ON o.stall_id = s.id
        WHERE o.created_at BETWEEN $1 AND $2
        GROUP BY s.id, s.name
        ORDER BY total_sales DESC
      `;
      const result = await this.orderRepository.query(query, [startDate, endDate]);

      if (result.length === 0) {
        return { message: 'No stall sales found for the specified period' };
      }

      return {
        message: 'Stall sales fetched successfully.',
        data: result.map(item => ({
          stallId: item.stall_id,
          stallName: item.stall_name,
          totalSales: parseFloat(item.total_sales) || 0,
          universityShare: parseFloat(item.university_share) || 0,
        })),
      };
    } catch (error) {
      console.error('Error in getStallSales:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch stall sales');
    }
  }

  async getTopSellingItems(startDate: string, endDate: string, limit: number = 10) {
    try {
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
        SELECT mi.id as item_id, mi.name as item_name, s.name as stall_name,
               SUM(oi.quantity) as total_quantity,
               SUM(oi.quantity * oi.item_price) as total_revenue
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN menu_items mi ON oi.menu_item_id = mi.id
        JOIN stalls s ON mi.stall_id = s.id
        WHERE o.created_at BETWEEN $1 AND $2
        GROUP BY mi.id, mi.name, s.name
        ORDER BY total_quantity DESC
        LIMIT $3
      `;
      const result = await this.orderRepository.query(query, [startDate, endDate, limit]);

      if (result.length === 0) {
        return { message: 'No top selling items found for the specified period' };
      }

      return {
        message: 'Top selling items fetched successfully.',
        data: result.map(item => ({
          itemId: item.item_id,
          itemName: item.item_name,
          stallName: item.stall_name,
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

  async getDashboardOverview() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const last30Days = new Date();
      last30Days.setDate(last30Days.getDate() - 30);
      const last30DaysStr = last30Days.toISOString().split('T')[0];

      const todaySalesQuery = `
        SELECT SUM(total_amount) as total
        FROM orders
        WHERE DATE(created_at) = $1
      `;
      const last30DaysSalesQuery = `
        SELECT SUM(total_amount) as total
        FROM orders
        WHERE created_at BETWEEN $1 AND $2
      `;
      const topItemsQuery = `
        SELECT mi.id as item_id, mi.name as item_name, s.name as stall_name,
               SUM(oi.quantity) as total_quantity,
               SUM(oi.quantity * oi.item_price) as total_revenue
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN menu_items mi ON oi.menu_item_id = mi.id
        JOIN stalls s ON mi.stall_id = s.id
        WHERE o.created_at BETWEEN $1 AND $2
        GROUP BY mi.id, mi.name, s.name
        ORDER BY total_quantity DESC
        LIMIT 5
      `;
      const stallCountQuery = `SELECT COUNT(*) as count FROM stalls`;
      const menuItemCountQuery = `SELECT COUNT(*) as count FROM menu_items`;

      const [todaySalesResult, last30DaysSalesResult, topItemsResult, stallCountResult, menuItemCountResult] =
        await Promise.all([
          this.orderRepository.query(todaySalesQuery, [today]),
          this.orderRepository.query(last30DaysSalesQuery, [last30DaysStr, today]),
          this.orderRepository.query(topItemsQuery, [last30DaysStr, today]),
          this.stallRepository.query(stallCountQuery),
          this.menuItemRepository.query(menuItemCountQuery),
        ]);

      return {
        message: 'Dashboard overview fetched successfully.',
        data: {
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
            stallName: item.stall_name,
            totalQuantity: parseInt(item.total_quantity) || 0,
            totalRevenue: parseFloat(item.total_revenue) || 0,
          })) : [],
          stallCount: parseInt(stallCountResult[0]?.count) || 0,
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