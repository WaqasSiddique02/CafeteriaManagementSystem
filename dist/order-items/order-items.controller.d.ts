import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
export declare class OrderItemsController {
    private readonly orderItemsService;
    constructor(orderItemsService: OrderItemsService);
    create(createOrderItemDto: CreateOrderItemDto): Promise<{
        message: string;
        data: any;
    }>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateOrderItemDto: UpdateOrderItemDto): Promise<{
        message: string;
        data: any;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: any;
    }>;
}
