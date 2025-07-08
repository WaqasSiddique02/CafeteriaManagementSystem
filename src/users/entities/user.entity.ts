import { Order } from "src/orders/entities/order.entity";
import { Stall } from "src/stalls/entities/stall.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ nullable: false })
    name:string;

    
    @Column({ nullable: false, unique: true })
    email:string;

    @Column({ nullable: false })
    password_hash:string;

    @Column({type: 'varchar', length: 20,})
    role: 'admin' | 'cashier' | 'manager';

    @ManyToOne(() => Stall, (stall) => stall.users, {
    nullable: true,
    onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'stall_id' })
    stall: Stall;

    @OneToMany(() => Order, (order) => order.cashier)
    orders: Order[];
}
