import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Stall } from 'src/stalls/entities/stall.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';

@Injectable()
export class CashierDashboardService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Stall) private stallRepository: Repository<Stall>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  private async validateStall(stallId: number) {
    const stall = await this.stallRepository.findOne({
      where: { id: stallId },
    });
    if (!stall) {
      throw new NotFoundException('Stall not found');
    }
    return stall;
  }

  async getTodaySales(stallId: number) {
    try {
      await this.validateStall(stallId);
      const today = new Date().toISOString().split('T')[0];

      const query = `
        SELECT 
          SUM(total_amount) as total_sales,
          COUNT(*) as order_count
        FROM orders
        WHERE stall_id = $1 AND DATE(created_at) = $2
      `;

      const result = await this.orderRepository.query(query, [stallId, today]);

      return {
        message: "Today's sales fetched successfully",
        data: {
          totalSales: parseFloat(result[0]?.total_sales) || 0,
          orderCount: parseInt(result[0]?.order_count) || 0,
          date: today,
        },
      };
    } catch (error) {
      console.error('Error in getTodaySales:', error);
      throw new InternalServerErrorException("Failed to fetch today's sales");
    }
  }

  async getRecentOrders(stallId: number, limit: number = 10) {
    try {
      await this.validateStall(stallId);

      if (limit < 1) {
        throw new BadRequestException('Limit must be at least 1');
      }

      console.log(
        'Fetching recent orders for stallId:',
        stallId,
        'limit:',
        limit,
      );

      // Get orders with cashier information
      const ordersQuery = `
      SELECT 
        o.id,
        o.customer_name,
        o.total_amount,
        o.created_at,
        u.name as cashier_name
      FROM orders o
      LEFT JOIN users u ON o.cashier_id = u.id
      WHERE o.stall_id = $1
      ORDER BY o.created_at DESC
      LIMIT $2
    `;

      let orders;
      try {
        orders = await this.orderRepository.query(ordersQuery, [
          stallId,
          limit,
        ]);
      } catch (queryError) {
        console.error('Orders query failed:', queryError);
        throw new InternalServerErrorException('Failed to fetch orders');
      }

      if (!orders || orders.length === 0) {
        return {
          message: 'No recent orders found',
          data: [],
        };
      }

      // Get items for these orders
      const orderIds = orders.map((order) => order.id);
      console.log('Order IDs:', orderIds);

      const itemsQuery = `
      SELECT 
        oi.order_id,
        oi.id,
        oi.menu_item_id,
        mi.name as menu_item_name,
        oi.quantity,
        oi.item_price
      FROM order_items oi
      LEFT JOIN menu_items mi ON oi.menu_item_id = mi.id
      WHERE oi.order_id = ANY($1)
    `;

      let items;
      try {
        items = await this.orderItemRepository.query(itemsQuery, [orderIds]);
      } catch (queryError) {
        console.error('Items query failed:', queryError);
        throw new InternalServerErrorException('Failed to fetch order items');
      }

      // Combine the data
      const ordersWithItems = orders.map((order) => ({
        id: order.id,
        customerName: order.customer_name || 'Unknown',
        totalAmount: isNaN(parseFloat(order.total_amount))
          ? 0
          : parseFloat(order.total_amount),
        createdAt: order.created_at,
        cashierName: order.cashier_name || 'Unknown',
        items: items
          .filter((item) => item.order_id === order.id)
          .map((item) => ({
            id: item.id,
            menuItemId: item.menu_item_id,
            name: item.menu_item_name || 'Unknown Item',
            quantity: parseInt(item.quantity) || 0,
            price: isNaN(parseFloat(item.item_price))
              ? 0
              : parseFloat(item.item_price),
          })),
      }));

      return {
        message: 'Recent orders fetched successfully',
        data: ordersWithItems,
      };
    } catch (error) {
      console.error('Detailed error in getRecentOrders:', {
        message: error.message,
        stack: error.stack,
        stallId,
        limit,
      });

      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException({
        success: false,
        message: 'Failed to fetch recent orders',
        error: error.message,
      });
    }
  }

  async getQuickStats(stallId: number) {
    try {
      const stall = await this.validateStall(stallId);
      const today = new Date().toISOString().split('T')[0];

      const [todaySalesResult, menuItemsResult] = await Promise.all([
        this.orderRepository.query(
          `
          SELECT 
            SUM(total_amount) as total_sales,
            COUNT(*) as order_count
          FROM orders
          WHERE stall_id = $1 AND DATE(created_at) = $2
        `,
          [stallId, today],
        ),

        this.orderRepository.query(
          `
          SELECT COUNT(*) as count
          FROM menu_items
          WHERE stall_id = $1
        `,
          [stallId],
        ),
      ]);

      return {
        message: 'Quick stats fetched successfully',
        data: {
          stallName: stall.name,
          todaySales: parseFloat(todaySalesResult[0]?.total_sales) || 0,
          todayOrders: parseInt(todaySalesResult[0]?.order_count) || 0,
          menuItemCount: parseInt(menuItemsResult[0]?.count) || 0,
          lastUpdated: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Error in getQuickStats:', error);
      throw new InternalServerErrorException('Failed to fetch quick stats');
    }
  }

  async getPopularItems(stallId: number, limit: number = 5) {
    try {
      await this.validateStall(stallId);

      if (limit < 1) {
        throw new BadRequestException('Limit must be at least 1');
      }

      const today = new Date().toISOString().split('T')[0];

      const query = `
        SELECT 
          mi.id,
          mi.name,
          SUM(oi.quantity) as total_quantity,
          SUM(oi.quantity * oi.item_price) as total_revenue
        FROM order_items oi
        JOIN menu_items mi ON oi.menu_item_id = mi.id
        JOIN orders o ON oi.order_id = o.id
        WHERE o.stall_id = $1 AND DATE(o.created_at) = $2
        GROUP BY mi.id, mi.name
        ORDER BY total_quantity DESC
        LIMIT $3
      `;

      const result = await this.orderRepository.query(query, [
        stallId,
        today,
        limit,
      ]);

      return {
        message: 'Popular items fetched successfully',
        data: result.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: parseInt(item.total_quantity) || 0,
          revenue: parseFloat(item.total_revenue) || 0,
        })),
      };
    } catch (error) {
      console.error('Error in getPopularItems:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch popular items');
    }
  }
}
