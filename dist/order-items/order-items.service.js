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
exports.OrderItemsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_item_entity_1 = require("./entities/order-item.entity");
const typeorm_2 = require("typeorm");
let OrderItemsService = class OrderItemsService {
    orderItemRepository;
    constructor(orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }
    async create(createOrderItemDto) {
        try {
            const { order_id, menu_item_id, quantity, item_price } = createOrderItemDto;
            const query = `
        INSERT INTO order_items (order_id, menu_item_id, quantity, item_price)
        VALUES (${order_id}, ${menu_item_id}, ${quantity}, ${item_price})
        RETURNING *
      `;
            const result = await this.orderItemRepository.query(query);
            return {
                message: 'Order item created successfully',
                data: result[0],
            };
        }
        catch (error) {
            console.error('Error creating order item:', error);
            throw new Error('Failed to create order item');
        }
    }
    async findAll() {
        try {
            const query = `
        SELECT order_items.*, menu_items.name AS menu_item_name
        FROM order_items
        INNER JOIN menu_items ON order_items.menu_item_id = menu_items.id
      `;
            const result = await this.orderItemRepository.query(query);
            return result;
        }
        catch (error) {
            console.error('Error fetching order items:', error);
            throw new Error('Failed to fetch order items');
        }
    }
    async findOne(id) {
        try {
            const query = `
        SELECT order_items.*, menu_items.name AS menu_item_name
        FROM order_items
        INNER JOIN menu_items ON order_items.menu_item_id = menu_items.id
        WHERE order_items.id = ${id}
      `;
            const result = await this.orderItemRepository.query(query);
            if (result.length === 0) {
                throw new Error(`Order item with ID ${id} not found`);
            }
            return result[0];
        }
        catch (error) {
            console.error('Error fetching order item:', error);
            throw new Error('Failed to fetch order item');
        }
    }
    async update(id, updateOrderItemDto) {
        try {
            const { order_id, menu_item_id, quantity, item_price } = updateOrderItemDto;
            const query = `
        UPDATE order_items
        SET order_id = ${order_id}, menu_item_id = ${menu_item_id},
            quantity = ${quantity}, item_price = ${item_price}
        WHERE id = ${id}
        RETURNING *
      `;
            const result = await this.orderItemRepository.query(query);
            if (result.length === 0) {
                throw new Error(`Order item with ID ${id} not found`);
            }
            return {
                message: 'Order item updated successfully',
                data: result[0],
            };
        }
        catch (error) {
            console.error('Error updating order item:', error);
            throw new Error('Failed to update order item');
        }
    }
    async remove(id) {
        try {
            const query = `
        DELETE FROM order_items WHERE id = ${id}
        RETURNING *
      `;
            const result = await this.orderItemRepository.query(query);
            if (result.length === 0) {
                throw new Error(`Order item with ID ${id} not found`);
            }
            console.log('Menu item removed successfully:', result[0]);
            return {
                message: 'Order item removed successfully',
                data: result[0],
            };
        }
        catch (error) {
            console.error('Error deleting order item:', error);
            console.error('Failed to delete order item:', error);
            throw new Error('Failed to delete order item');
        }
    }
};
exports.OrderItemsService = OrderItemsService;
exports.OrderItemsService = OrderItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderItemsService);
//# sourceMappingURL=order-items.service.js.map