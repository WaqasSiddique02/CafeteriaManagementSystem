import { Cafeteria } from "src/cafeteria/entities/cafeteria.entity";
import { MenuItem } from "src/menu-items/entities/menu-item.entity";
import { Order } from "src/orders/entities/order.entity";
import { User } from "src/users/entities/user.entity";
export declare class Stall {
    id: number;
    cafeteria_id: number;
    name: string;
    university_share_percent: number;
    cafeteria: Cafeteria;
    users: User[];
    menuItems: MenuItem[];
    orders: Order[];
}
