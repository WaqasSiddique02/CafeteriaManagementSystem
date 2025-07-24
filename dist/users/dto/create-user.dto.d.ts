export declare class CreateUserDto {
    name: string;
    email: string;
    password_hash: string;
    role: 'admin' | 'cashier' | 'manager';
    stall_id?: number;
}
