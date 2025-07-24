import { CreateStallDto } from './dto/create-stall.dto';
import { UpdateStallDto } from './dto/update-stall.dto';
import { Stall } from './entities/stall.entity';
import { Repository } from 'typeorm';
export declare class StallsService {
    private stallRepository;
    constructor(stallRepository: Repository<Stall>);
    create(createStallDto: CreateStallDto): Promise<{
        message: string;
        data: any;
    }>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateStallDto: UpdateStallDto): Promise<{
        message: string;
        data: any;
    }>;
    remove(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
