import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

async create(createOrderItemDto: CreateOrderItemDto) {
    try {
      const { order_id, menu_item_id, quantity, item_price } = createOrderItemDto;

      const query = `
        INSERT INTO order_items (order_id, menu_item_id, quantity, item_price)
        VALUES (${order_id}, ${menu_item_id}, ${quantity}, ${item_price})
        RETURNING *
      `;

      const result = await this.orderItemRepository.query(query);

      return {
        message: 'Order item created successfully',
        data: result[0],
      };
    } catch (error) {
      console.error('Error creating order item:', error);
      throw new Error('Failed to create order item');
    }
  }

 async findAll() {
    try {
      const query = `
        SELECT order_items.*, menu_items.name AS menu_item_name
        FROM order_items
        INNER JOIN menu_items ON order_items.menu_item_id = menu_items.id
      `;

      const result = await this.orderItemRepository.query(query);

      return result;
    } catch (error) {
      console.error('Error fetching order items:', error);
      throw new Error('Failed to fetch order items');
    }
  }

  async findOne(id: number) {
  try {
      const query = `
        SELECT order_items.*, menu_items.name AS menu_item_name
        FROM order_items
        INNER JOIN menu_items ON order_items.menu_item_id = menu_items.id
        WHERE order_items.id = ${id}
      `;

      const result = await this.orderItemRepository.query(query);

      if (result.length === 0) {
        throw new Error(`Order item with ID ${id} not found`);
      }

      return result[0];
    } catch (error) {
      console.error('Error fetching order item:', error);
      throw new Error('Failed to fetch order item');
    }
    
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    try {
      const { order_id, menu_item_id, quantity, item_price } = updateOrderItemDto;

      const query = `
        UPDATE order_items
        SET order_id = ${order_id}, menu_item_id = ${menu_item_id},
            quantity = ${quantity}, item_price = ${item_price}
        WHERE id = ${id}
        RETURNING *
      `;

      const result = await this.orderItemRepository.query(query);

      if (result.length === 0) {
        throw new Error(`Order item with ID ${id} not found`);
      }

      return {
        message: 'Order item updated successfully',
        data: result[0],
      };
    } catch (error) {
      console.error('Error updating order item:', error);
      throw new Error('Failed to update order item');
    }
  }

  async remove(id: number) {
    try {
      const query = `
        DELETE FROM order_items WHERE id = ${id}
        RETURNING *
      `;

      const result = await this.orderItemRepository.query(query);

      if (result.length === 0) {
        throw new Error(`Order item with ID ${id} not found`);
      }
console.log('Menu item removed successfully:', result[0]);
      return {
        message: 'Order item removed successfully',
        data: result[0],
      };
    } catch (error) {
      console.error('Error deleting order item:', error);
      throw new Error('Failed to delete order item');
    }
  }
}