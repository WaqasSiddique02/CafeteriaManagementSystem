import { Repository } from 'typeorm';
import { Cafeteria } from './entities/cafeteria.entity';
import { CreateCafeteriaDto } from './dto/create-cafeteria.dto';
import { UpdateCafeteriaDto } from './dto/update-cafeteria.dto';
export declare class CafeteriaService {
    private cafeteriaRepository;
    constructor(cafeteriaRepository: Repository<Cafeteria>);
    create(createCafeteriaDto: CreateCafeteriaDto): Promise<{
        message: string;
        data: any;
    }>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateCafeteriaDto: UpdateCafeteriaDto): Promise<{
        message: string;
        data: any;
    }>;
    remove(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
