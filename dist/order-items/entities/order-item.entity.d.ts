import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { Order } from 'src/orders/entities/order.entity';
export declare class OrderItem {
    id: number;
    order_id: number;
    menu_item_id: number;
    quantity: number;
    item_price: number;
    order: Order;
    menuItem: MenuItem;
}
