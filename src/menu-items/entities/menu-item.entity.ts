import { Stall } from "src/stalls/entities/stall.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MenuItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stall_id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;
    
    @Column({ type: 'decimal', precision: 5, scale: 2 })
    price: number;

    @Column({ type: 'boolean', default: true })
    is_available: boolean = true;
    

 @ManyToOne(() => Stall, (stall) => stall.menuItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'stall_id' }) // tells TypeORM which column is the FK
  stall: Stall;

}
