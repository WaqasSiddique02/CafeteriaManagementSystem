import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
export declare class OtpService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    private transporter;
    sendOtp(email: string, otp: string): Promise<void>;
    requestOtp(email: string): Promise<{
        message: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        message: string;
    }>;
}
