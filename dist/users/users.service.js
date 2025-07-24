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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        try {
            const saltOrRounds = 10;
            const password = createUserDto.password_hash ?? '';
            const hash = await bcrypt.hash(password, saltOrRounds);
            const query = `INSERT INTO users (name,email,password_hash,role,stall_id) VALUES ('${createUserDto.name}','${createUserDto.email}','${hash}','${createUserDto.role}',${createUserDto.stall_id || null}) RETURNING *`;
            const result = await this.userRepository.query(query);
            console.log("User created successfully:", result);
            return {
                message: 'User created successfully',
                data: result[0],
            };
        }
        catch (error) {
            console.error("Error in create method:", error);
            throw new Error("Failed to create user");
        }
    }
    async findAll() {
        try {
            const query = `SELECT * FROM users`;
            const result = await this.userRepository.query(query);
            if (!result || result.length === 0) {
                throw new Error("No users found");
            }
            console.log("Users retrieved successfully:", result);
            return result;
        }
        catch (error) {
            console.error("Error in findAll method:", error);
            throw new Error("Failed to retrieve users");
        }
    }
    async findOne(id) {
        try {
            const query = `SELECT * FROM users WHERE id = ${id}`;
            const result = await this.userRepository.query(query);
            if (!result || result.length === 0) {
                throw new Error(`User with id ${id} not found`);
            }
            console.log(`User with id ${id} retrieved successfully:`, result);
            return result[0];
        }
        catch (error) {
            console.error("Error in findOne method:", error);
            throw new Error(`Failed to retrieve user with id ${id}`);
        }
    }
    async update(id, updateUserDto) {
        try {
            const saltOrRounds = 10;
            const password = updateUserDto.password_hash ?? '';
            const hash = await bcrypt.hash(password, saltOrRounds);
            const query = `UPDATE users SET name = '${updateUserDto.name}', email = '${updateUserDto.email}', password_hash = '${hash}', role = '${updateUserDto.role}', stall_id = ${updateUserDto.stall_id || null} WHERE id = ${id} RETURNING *`;
            const result = await this.userRepository.query(query);
            if (!result || result.length === 0) {
                throw new Error(`User with id ${id} not found`);
            }
            console.log(`User with id ${id} updated successfully:`, result);
            return {
                message: 'User updated successfully',
                data: result[0],
            };
        }
        catch (error) {
            console.error("Error in update method:", error);
            throw new Error(`Failed to update user with id ${id}`);
        }
    }
    async updatePassword(email, updateUserDto) {
        try {
            const saltOrRounds = 10;
            const password = updateUserDto.password_hash ?? '';
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
    async remove(id) {
        try {
            const query = `DELETE FROM users WHERE id = ${id} RETURNING *`;
            const result = await this.userRepository.query(query);
            if (!result || result.length === 0) {
                throw new Error(`User with id ${id} not found`);
            }
            console.log(`User with id ${id} deleted successfully:`, result);
            return {
                message: 'User deleted successfully',
                data: result[0],
            };
        }
        catch (error) {
            console.error("Error in remove method:", error);
            throw new Error(`Failed to delete user with id ${id}`);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map