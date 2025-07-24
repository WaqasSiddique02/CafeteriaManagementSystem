import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu-item.entity';
export declare class MenuItemsService {
    private readonly menuItemRepository;
    constructor(menuItemRepository: Repository<MenuItem>);
    create(createMenuItemDto: CreateMenuItemDto): Promise<{
        message: string;
        data: any;
    }>;
    findAllAvailable(): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateMenuItemDto: UpdateMenuItemDto): Promise<{
        message: string;
        data: any;
    }>;
    softRemove(id: number): Promise<{
        message: string;
        data: any;
    }>;
    remove(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
