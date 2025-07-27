export declare class CreateAuthDto {
    email: string;
    password: string;
}
export declare class CreateSignUpDto {
    name: string;
    email: string;
    password_hash: string;
    role: 'admin' | 'cashier' | 'manager';
    stall_id?: number;
}
export declare class ResetPasswordDto {
    email: string;
    password_hash: string;
}
