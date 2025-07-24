import { OtpService } from './otp.service';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    requestOtp(email: string): Promise<{
        message: string;
    }>;
    verifyOtp(email: string, otp: string): Promise<{
        message: string;
    }>;
}
