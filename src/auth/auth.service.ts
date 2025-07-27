import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateSignUpDto, ResetPasswordDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(pass, user.password_hash);

    if (isMatch === false) {
      throw new UnauthorizedException();
    }
    const payload = {
      email: user.email,
      role: user.role,
      id: user.id,
      name: user.name,
      stall_id: user.stall,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpDTO: CreateSignUpDto) {
    try {
      const saltOrRounds = 10;
      const password = signUpDTO.password_hash ?? '';
      const hash = await bcrypt.hash(password, saltOrRounds);
      const query = `INSERT INTO users (name,email,password_hash,role,stall_id) VALUES ('${signUpDTO.name}','${signUpDTO.email}','${hash}','${signUpDTO.role}',${signUpDTO.stall_id || null}) RETURNING *`;
      const result = await this.userRepository.query(query);
      console.log('User created successfully:', result);
      return {
        message: 'User created successfully',
        data: result[0],
      };
    } catch (error) {
      console.error('Error in create method:', error);
      throw new Error('Failed to create user');
    }
  }

      async updatePassword(email: string, resetPasswordDto: ResetPasswordDto) {
    try{
      const saltOrRounds = 10;
      const password = resetPasswordDto.password_hash ?? '';
      const hash = await bcrypt.hash(password, saltOrRounds);

      const query = `UPDATE users SET password_hash = '${hash}' WHERE email = '${email}' RETURNING *`;

      const result = await this.userRepository.query(query);
      if (!result || result.length === 0) {
        throw new Error(`User with email ${email} not found`);
      }
      console.log(`User with email ${email} updated successfully:`, result);
      return {
        message: 'User updated successfully',
        data: result[0],
      };
    }
    catch(error){
      console.error("Error in update method:", error);
      throw new Error(`Failed to update user with email ${email}`);
    }
  }
}
