import { Module } from '@nestjs/common';
import { CashierDashboardService } from './cashier-dashboard.service';
import { CashierDashboardController } from './cashier-dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Stall } from 'src/stalls/entities/stall.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Order, OrderItem, Stall, User])],
  providers: [CashierDashboardService],
  controllers: [CashierDashboardController]
})
export class CashierDashboardModule {}
