import { Stall } from "src/stalls/entities/stall.entity";
import { User } from "src/users/entities/user.entity";
export declare class Order {
    id: number;
    stall: Stall;
    cashier: User;
    total_amount: number;
    order_time: Date;
    orderItems: any;
}
