import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(body: CreateAuthDto): Promise<{
        access_token: string;
    }>;
}
