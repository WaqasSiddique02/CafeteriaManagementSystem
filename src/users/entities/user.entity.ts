import { Stall } from "src/stalls/entities/stall.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
}
