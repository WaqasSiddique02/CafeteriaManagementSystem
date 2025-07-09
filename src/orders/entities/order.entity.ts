import { Stall } from "src/stalls/entities/stall.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Stall, (stall) => stall.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'stall_id' })
    stall: Stall;

    @ManyToOne(() => User, (user) => user.orders, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cashier_id' })
    cashier: User;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.0 })
    total_amount: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    order_time: Date;
    orderItems: any;
}
