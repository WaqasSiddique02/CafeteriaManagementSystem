"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const user_entity_1 = require("../users/entities/user.entity");
const role_enum_1 = require("../auth/authorization/role.enum");
let OrdersService = class OrdersService {
    orderRepository;
    userRepository;
    constructor(orderRepository, userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }
    async create(createOrderDto) {
        try {
            const user = await this.userRepository.findOne({ where: { id: createOrderDto.cashier_id } });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            if (!user.role.includes(role_enum_1.Role.Cashier)) {
                throw new common_1.BadRequestException('User is not a cashier');
            }
            const query = `
      INSERT INTO orders (stall_id, cashier_id, total_amount)
      VALUES (${createOrderDto.stall_id}, ${createOrderDto.cashier_id}, ${createOrderDto.total_amount})
      RETURNING *`;
            const result = await this.orderRepository.query(query);
            return {
                message: 'Order created successfully.',
                data: result[0],
            };
        }
        catch (error) {
            console.error('Error in create:', error);
            throw error;
        }
    }
    async findAll() {
        try {
            const query = `SELECT * FROM orders`;
            const result = await this.orderRepository.query(query);
            if (result.length === 0) {
                return { message: 'No orders found' };
            }
            return result;
        }
        catch (error) {
            console.error('Error in findAll:', error);
            throw new Error('Failed to retrieve orders');
        }
    }
    async findOne(id) {
        try {
            const query = `SELECT * FROM orders WHERE id = ${id}`;
            const result = await this.orderRepository.query(query);
            if (result.length === 0) {
                return { message: `Order with id ${id} not found` };
            }
            return result;
        }
        catch (error) {
            console.error('Error in findOne:', error);
            throw new Error(`Failed to retrieve order with id ${id}`);
        }
    }
    async update(id, updateOrderDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { id: updateOrderDto.cashier_id },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            if (!user.role.includes(role_enum_1.Role.Cashier)) {
                throw new common_1.BadRequestException('User is not a cashier');
            }
            const query = `
      UPDATE orders
      SET stall_id = ${updateOrderDto.stall_id},
          cashier_id = ${updateOrderDto.cashier_id},
          total_amount = ${updateOrderDto.total_amount}
      WHERE id = ${id}
      RETURNING *`;
            const result = await this.orderRepository.query(query);
            if (result.length === 0) {
                throw new common_1.NotFoundException(`Order with id ${id} not found`);
            }
            return {
                message: 'Order updated successfully.',
                data: result[0],
            };
        }
        catch (error) {
            console.error('Error in update:', error);
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(`Failed to update order with id ${id}`);
        }
    }
    async remove(id) {
        try {
            const query = `DELETE FROM orders WHERE id = ${id} RETURNING *`;
            const result = await this.orderRepository.query(query);
            if (result.length === 0) {
                return { message: `Order with id ${id} not found` };
            }
            return {
                message: 'Order deleted successfully.',
                data: result[0],
            };
        }
        catch (error) {
            console.error('Error in remove:', error);
            throw new Error(`Failed to delete order with id ${id}`);
        }
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map