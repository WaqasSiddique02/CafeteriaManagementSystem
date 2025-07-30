import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stall } from 'src/stalls/entities/stall.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { StallManagerDashboardService } from './manager-dashboard.service';
import { StallManagerDashboardController } from './manager-dashboard.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Stall, Order, MenuItem])],
  providers: [StallManagerDashboardService],
  controllers: [StallManagerDashboardController]
})
export class ManagerDashboardModule {}
