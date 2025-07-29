import { Module } from '@nestjs/common';
import { AdminDashboardService } from './admin-dashboard.service';
import { AdminDashboardController } from './admin-dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Stall } from 'src/stalls/entities/stall.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Stall, MenuItem])],
  controllers: [AdminDashboardController],
  providers: [AdminDashboardService],
})
export class AdminDashboardModule {}
