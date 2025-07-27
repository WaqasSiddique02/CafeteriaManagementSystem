"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const bcrypt = require("bcrypt");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async signIn(email, pass) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isMatch = await bcrypt.compare(pass, user.password_hash);
        if (isMatch === false) {
            throw new common_1.UnauthorizedException();
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
    async signUp(signUpDTO) {
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
        }
        catch (error) {
            console.error('Error in create method:', error);
            throw new Error('Failed to create user');
        }
    }
    async updatePassword(email, resetPasswordDto) {
        try {
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
        catch (error) {
            console.error("Error in update method:", error);
            throw new Error(`Failed to update user with email ${email}`);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map