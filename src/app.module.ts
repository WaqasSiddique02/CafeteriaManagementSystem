import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CafeteriaModule } from './cafeteria/cafeteria.module';
import { StallsModule } from './stalls/stalls.module';
import { UsersModule } from './users/users.module';
import { MenuItemsModule } from './menu-items/menu-items.module';

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
      }),
    }),
    CafeteriaModule,
    StallsModule,
    UsersModule,
    MenuItemsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}