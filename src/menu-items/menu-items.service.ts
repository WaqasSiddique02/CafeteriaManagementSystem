import { Injectable } from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu-item.entity';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
  ) { }
  async create(createMenuItemDto: CreateMenuItemDto) {
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
    } catch (error) {
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
    } catch (error) {
      console.error('Error fetching all menu items:', error);
      throw new Error('Failed to fetch all menu items');
    }
  }


  async findOne(id: number) {
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
    } catch (error) {
      console.error('Error fetching menu item:', error);
      throw new Error('Failed to fetch menu item');
    }
  }


  async update(id: number, updateMenuItemDto: UpdateMenuItemDto) {
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
    } catch (error) {
      console.error('Error updating menu item:', error);
      throw new Error('Failed to update menu item');
    }
  }

  async softRemove(id: number) {
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
  async remove(id: number) {
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
    } catch (error) {
      console.error('Error deleting menu item:', error);
      throw new Error('Failed to delete menu item');
    }
  }
}

