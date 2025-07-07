import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
 constructor(@InjectRepository(User) private userRepository: Repository<User>,) {}
 
 async create(createUserDto: CreateUserDto) {
    try{
      const saltOrRounds = 10;
      const password = createUserDto.password_hash ?? '';
      const hash = await bcrypt.hash(password, saltOrRounds);
      const query=`INSERT INTO users (name,email,password_hash,role,stall_id) VALUES ('${createUserDto.name}','${createUserDto.email}','${hash}','${createUserDto.role}',${createUserDto.stall_id || null}) RETURNING *`;
      const result = await this.userRepository.query(query);
      console.log("User created successfully:",result);
      return {
      message: 'User created successfully',
      data: result[0],
    };
    }catch(error){
      console.error("Error in create method:", error);
      throw new Error("Failed to create user");
    }
  }

  async findAll() {
    try{
      const query= `SELECT * FROM users`;
      const result = await this.userRepository.query(query);
      if (!result || result.length === 0) {
        throw new Error("No users found");
      }

      console.log("Users retrieved successfully:", result);
      return result;

    }catch(error){
      console.error("Error in findAll method:", error);
      throw new Error("Failed to retrieve users");
    }
  }

  async findOne(id: number) {
    try{
      const query = `SELECT * FROM users WHERE id = ${id}`;
      const result = await this.userRepository.query(query);
      if (!result || result.length === 0) {
        throw new Error(`User with id ${id} not found`);
      }
      console.log(`User with id ${id} retrieved successfully:`, result);
      return result[0];
    }catch(error){
      console.error("Error in findOne method:", error);
      throw new Error(`Failed to retrieve user with id ${id}`);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{
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
    catch(error){
      console.error("Error in update method:", error);
      throw new Error(`Failed to update user with id ${id}`);
    }
  }

 async remove(id: number) {
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
    } catch (error) {
      console.error("Error in remove method:", error);
      throw new Error(`Failed to delete user with id ${id}`);
    }
  }
}