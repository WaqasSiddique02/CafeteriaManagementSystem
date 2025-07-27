import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateSignUpDto, ResetPasswordDto } from './dto/create-auth.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    signIn(email: string, pass: string): Promise<{
        access_token: string;
    }>;
    signUp(signUpDTO: CreateSignUpDto): Promise<{
        message: string;
        data: any;
    }>;
    updatePassword(email: string, resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
        data: any;
    }>;
}
