import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';
export declare class OrderItemsService {
    private readonly orderItemRepository;
    constructor(orderItemRepository: Repository<OrderItem>);
    create(createOrderItemDto: CreateOrderItemDto): Promise<{
        message: string;
        data: any;
    }>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateOrderItemDto: UpdateOrderItemDto): Promise<{
        message: string;
        data: any;
    }>;
    remove(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
