import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password_hash: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(['admin', 'cashier', 'manager'])
  role: 'admin' | 'cashier' | 'manager';

  @ApiProperty()
  @IsOptional()
  @IsInt()
  stall_id?: number; // Only for managers
}