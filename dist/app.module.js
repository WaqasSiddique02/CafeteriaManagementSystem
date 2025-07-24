"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const cafeteria_module_1 = require("./cafeteria/cafeteria.module");
const stalls_module_1 = require("./stalls/stalls.module");
const users_module_1 = require("./users/users.module");
const orders_module_1 = require("./orders/orders.module");
const menu_items_module_1 = require("./menu-items/menu-items.module");
const order_items_module_1 = require("./order-items/order-items.module");
const auth_module_1 = require("./auth/auth.module");
const otp_module_1 = require("./otp/otp.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    host: config.get('DB_HOST'),
                    port: config.get('DB_PORT'),
                    username: config.get('DB_USERNAME'),
                    password: config.get('DB_PASSWORD'),
                    database: config.get('DB_NAME'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: false,
                    trustServerCertificate: true,
                    timezone: 'UTC',
                }),
            }),
            cafeteria_module_1.CafeteriaModule,
            stalls_module_1.StallsModule,
            users_module_1.UsersModule,
            orders_module_1.OrdersModule,
            menu_items_module_1.MenuItemsModule,
            order_items_module_1.OrderItemsModule,
            auth_module_1.AuthModule,
            otp_module_1.OtpModule,],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map