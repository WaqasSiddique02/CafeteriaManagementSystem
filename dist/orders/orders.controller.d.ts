import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
        data: any;
    }>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        message: string;
        data: any;
    }>;
    remove(id: string): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: any;
    }>;
}
