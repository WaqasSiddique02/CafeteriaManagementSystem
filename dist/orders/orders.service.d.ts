import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
export declare class OrdersService {
    private orderRepository;
    private readonly userRepository;
    constructor(orderRepository: Repository<Order>, userRepository: Repository<User>);
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
        data: any;
    }>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<{
        message: string;
        data: any;
    }>;
    remove(id: number): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: any;
    }>;
}
