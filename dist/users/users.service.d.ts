import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: any;
    }>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        data: any;
    }>;
    updatePassword(email: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        data: any;
    }>;
    remove(id: number): Promise<{
        message: string;
        data: any;
    }>;
}
