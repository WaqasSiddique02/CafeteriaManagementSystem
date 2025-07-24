import { OrderItem } from "src/order-items/entities/order-item.entity";
import { Stall } from "src/stalls/entities/stall.entity";
export declare class MenuItem {
    id: number;
    stall_id: number;
    name: string;
    price: number;
    is_available: boolean;
    stall: Stall;
    orderItems: OrderItem[];
}
