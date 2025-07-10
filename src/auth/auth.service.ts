import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService) { }

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isMatch = await bcrypt.compare(pass, user.password_hash);

        if (isMatch === false) {
            throw new UnauthorizedException();
        }
        const payload = { email: user.email, role: user.role, id: user.id, name: user.name, stall_id: user.stall };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }    
}
