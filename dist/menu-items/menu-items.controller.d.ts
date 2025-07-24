import { MenuItemsService } from './menu-items.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
export declare class MenuItemsController {
    private readonly menuItemsService;
    constructor(menuItemsService: MenuItemsService);
    create(createMenuItemDto: CreateMenuItemDto): Promise<{
        message: string;
        data: any;
    }>;
    findAll(): Promise<any>;
    findAllAvailable(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateMenuItemDto: UpdateMenuItemDto): Promise<{
        message: string;
        data: any;
    }>;
    softRemove(id: string): Promise<{
        message: string;
        data: any;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: any;
    }>;
}
