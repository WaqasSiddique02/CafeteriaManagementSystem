import { Role } from "src/auth/authorization/role.enum";
import { Order } from "src/orders/entities/order.entity";
import { Stall } from "src/stalls/entities/stall.entity";
export declare class User {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: Role[];
    stall: Stall;
    orders: Order[];
    otp_code: string;
    otp_expires_at: Date;
}
