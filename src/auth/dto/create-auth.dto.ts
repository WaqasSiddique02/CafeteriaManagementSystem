import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'theawais777@gmail.com' })
  email: string;

  @ApiProperty({ example: 'awais@1234' })
  password: string;
}

export class CreateSignUpDto {
  @ApiProperty({ example: 'Awais' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'theawais777@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'awais@1234' })
  @IsStrongPassword()
  @IsNotEmpty()
  password_hash: string;

  @ApiProperty({ example: 'Manager' })
  @IsString()
  @IsEnum(['admin', 'cashier', 'manager'])
  role: 'admin' | 'cashier' | 'manager';

  @ApiProperty()
  @IsOptional()
  @IsInt()
  stall_id?: number; // Only for managers
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password_hash: string;
}
