import { AuthService } from './auth.service';
import { CreateAuthDto, CreateSignUpDto, ResetPasswordDto } from './dto/create-auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(body: CreateAuthDto): Promise<{
        access_token: string;
    }>;
    signUp(body: CreateSignUpDto): Promise<{
        message: string;
        data: any;
    }>;
    updatePassword(email: string, resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
        data: any;
    }>;
}
