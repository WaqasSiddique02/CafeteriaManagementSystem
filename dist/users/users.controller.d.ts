import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: any;
    }>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    updatePassword(email: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        data: any;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        data: any;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: any;
    }>;
}
