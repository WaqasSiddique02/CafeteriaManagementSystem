import { CafeteriaService } from './cafeteria.service';
import { CreateCafeteriaDto } from './dto/create-cafeteria.dto';
import { UpdateCafeteriaDto } from './dto/update-cafeteria.dto';
export declare class CafeteriaController {
    private readonly cafeteriaService;
    constructor(cafeteriaService: CafeteriaService);
    create(createCafeteriaDto: CreateCafeteriaDto): Promise<{
        message: string;
        data: any;
    }>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateCafeteriaDto: UpdateCafeteriaDto): Promise<{
        message: string;
        data: any;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: any;
    }>;
}
