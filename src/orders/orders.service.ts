import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/auth/authorization/role.enum';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>, @InjectRepository(User) private readonly userRepository: Repository<User>){}

async create(createOrderDto: CreateOrderDto) {
  try {
    const user = await this.userRepository.findOne({ where: { id: createOrderDto.cashier_id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.role.includes(Role.Cashier)) {
      throw new BadRequestException('User is not a cashier');
    }

    const query = `
      INSERT INTO orders (stall_id, cashier_id, total_amount)
      VALUES (${createOrderDto.stall_id}, ${createOrderDto.cashier_id}, ${createOrderDto.total_amount})
      RETURNING *`;

    const result = await this.orderRepository.query(query);

    return {
      message: 'Order created successfully.',
      data: result[0],
    };
  } catch (error) {
    console.error('Error in create:', error);
    throw error;
  }
}
 async findAll() {
    try{
      const query = `SELECT * FROM orders`;
      const result= await this.orderRepository.query(query);
      if(result.length===0){
        return { message: 'No orders found' };
      }
      return result;

    }catch(error){
      console.error('Error in findAll:', error);
      throw new Error('Failed to retrieve orders');
    }
  }

 async findOne(id: number) {
    try{
    const query = `SELECT * FROM orders WHERE id = ${id}`;
    const result = await this.orderRepository.query(query);
    if(result.length===0){
      return { message: `Order with id ${id} not found` };
    }
    return result;
   }catch(error){
      console.error('Error in findOne:', error);
      throw new Error(`Failed to retrieve order with id ${id}`);
    }
  }

async update(id: number, updateOrderDto: UpdateOrderDto) {
  try {
    const user = await this.userRepository.findOne({
      where: { id: updateOrderDto.cashier_id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.role.includes(Role.Cashier)) {
      throw new BadRequestException('User is not a cashier');
    }

    const query = `
      UPDATE orders
      SET stall_id = ${updateOrderDto.stall_id},
          cashier_id = ${updateOrderDto.cashier_id},
          total_amount = ${updateOrderDto.total_amount}
      WHERE id = ${id}
      RETURNING *`;

    const result = await this.orderRepository.query(query);

    if (result.length === 0) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return {
      message: 'Order updated successfully.',
      data: result[0],
    };
  } catch (error) {
    console.error('Error in update:', error);

    if (error instanceof NotFoundException || error instanceof BadRequestException) {
      throw error;
    }

    throw new InternalServerErrorException(`Failed to update order with id ${id}`);
  }
}

  async remove(id: number) {
    try{
      const query = `DELETE FROM orders WHERE id = ${id} RETURNING *`;
      const result = await this.orderRepository.query(query);
      if(result.length===0){
        return { message: `Order with id ${id} not found` };
      }
      return {
        message: 'Order deleted successfully.',
        data: result[0],
      };
    }catch(error){
      console.error('Error in remove:', error);
      throw new Error(`Failed to delete order with id ${id}`);
    }
  }
}