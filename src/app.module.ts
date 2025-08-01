import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CafeteriaModule } from './cafeteria/cafeteria.module';
import { StallsModule } from './stalls/stalls.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { ManagerDashboardModule } from './manager-dashboard/manager-dashboard.module';
import { CashierDashboardModule } from './cashier-dashboard/cashier-dashboard.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        trustServerCertificate: true,
        timezone: 'UTC',
      }),
    }),
    CafeteriaModule,
    StallsModule,
    UsersModule,
    OrdersModule,
    MenuItemsModule,
    OrderItemsModule,
    AuthModule,
    OtpModule,
    AdminDashboardModule,
    ManagerDashboardModule,
    CashierDashboardModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}