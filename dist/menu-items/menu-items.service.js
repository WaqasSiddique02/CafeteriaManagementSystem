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
exports.MenuItemsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_item_entity_1 = require("./entities/menu-item.entity");
let MenuItemsService = class MenuItemsService {
    menuItemRepository;
    constructor(menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }
    async create(createMenuItemDto) {
        try {
            const isAvailable = createMenuItemDto.is_available ?? true;
            const query = `INSERT INTO menu_items(stall_id,name,price,is_available)
        VALUES (${createMenuItemDto.stall_id},'${createMenuItemDto.name}',${createMenuItemDto.price},${isAvailable})
        Returning *`;
            const result = await this.menuItemRepository.query(query);
            console.log('Menu item created successfully:', result[0]);
            return {
                message: 'Menu item created successfully',
                data: result[0],
            };
        }
        catch (error) {
            console.error('Error creating menu item:', error);
            throw new Error('Failed to create menu item');
        }
    }
    async findAllAvailable() {
        try {
            const query = `
      SELECT menu_items.*, stalls.name AS stall_name
      FROM menu_items
      INNER JOIN stalls ON menu_items.stall_id = stalls.id
      WHERE menu_items.is_available = true
    `;
            const result = await this.menuItemRepository.query(query);
            if (result.length === 0) {
                throw new Error('No menu items found');
            }
            return result;
        }
        catch (error) {
            console.error('Error fetching menu items:', error);
            throw new Error('Failed to fetch menu items');
        }
    }
    async findAll() {
        try {
            const query = `
      SELECT menu_items.*, stalls.name AS stall_name
      FROM menu_items
      INNER JOIN stalls ON menu_items.stall_id = stalls.id
    `;
            return await this.menuItemRepository.query(query);
        }
        catch (error) {
            console.error('Error fetching all menu items:', error);
            throw new Error('Failed to fetch all menu items');
        }
    }
    async findOne(id) {
        try {
            const query = `
        SELECT menu_items.*, stalls.name AS stall_name
        FROM menu_items
        INNER JOIN stalls ON menu_items.stall_id = stalls.id
        WHERE menu_items.id = ${id}
      `;
            const result = await this.menuItemRepository.query(query);
            if (result.length === 0) {
                throw new Error(`Menu item with ID ${id} not found`);
            }
            return result[0];
        }
        catch (error) {
            console.error('Error fetching menu item:', error);
            throw new Error('Failed to fetch menu item');
        }
    }
    async update(id, updateMenuItemDto) {
        try {
            const isAvailable = updateMenuItemDto.is_available ?? true;
            const query = `
        UPDATE menu_items
        SET name = '${updateMenuItemDto.name}', 
            price = ${updateMenuItemDto.price}, 
            is_available = ${isAvailable}
        WHERE id = ${id}
        RETURNING *
      `;
            const result = await this.menuItemRepository.query(query);
            if (result.length === 0) {
                throw new Error(`Menu item with ID ${id} not found`);
            }
            return {
                message: 'Menu item updated successfully',
                data: result[0],
            };
        }
        catch (error) {
            console.error('Error updating menu item:', error);
            throw new Error('Failed to update menu item');
        }
    }
    async softRemove(id) {
        try {
            const query = `
      UPDATE menu_items
      SET is_available = false
      WHERE id = ${id}
      RETURNING *
    `;
            const result = await this.menuItemRepository.query(query);
            if (result.length === 0) {
                throw new Error(`Menu item with ID ${id} not found`);
            }
            console.log('Menu item soft-deleted (marked unavailable):', result[0]);
            return {
                message: 'Menu item marked as unavailable',
                data: result[0],
            };
        }
        catch (error) {
            console.error('Error soft-deleting menu item:', error);
            throw new Error('Failed to mark menu item as unavailable');
        }
    }
    async remove(id) {
        try {
            const query = `
        DELETE FROM menu_items WHERE id = ${id} RETURNING *
      `;
            const result = await this.menuItemRepository.query(query);
            if (result.length === 0) {
                throw new Error(`Menu item with ID ${id} not found`);
            }
            console.log('Menu item removed successfully:', result[0]);
            return {
                message: 'Menu item removed successfully',
                data: result[0],
            };
        }
        catch (error) {
            console.error('Error deleting menu item:', error);
            throw new Error('Failed to delete menu item');
        }
    }
};
exports.MenuItemsService = MenuItemsService;
exports.MenuItemsService = MenuItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_item_entity_1.MenuItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MenuItemsService);
//# sourceMappingURL=menu-items.service.js.map