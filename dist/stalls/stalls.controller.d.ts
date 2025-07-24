import { StallsService } from './stalls.service';
import { CreateStallDto } from './dto/create-stall.dto';
import { UpdateStallDto } from './dto/update-stall.dto';
export declare class StallsController {
    private readonly stallsService;
    constructor(stallsService: StallsService);
    create(createStallDto: CreateStallDto): Promise<{
        message: string;
        data: any;
    }>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateStallDto: UpdateStallDto): Promise<{
        message: string;
        data: any;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: any;
    }>;
}
