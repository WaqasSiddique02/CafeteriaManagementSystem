import {Injectable,NotFoundException,InternalServerErrorException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cafeteria } from './entities/cafeteria.entity';
import { CreateCafeteriaDto } from './dto/create-cafeteria.dto';
import { UpdateCafeteriaDto } from './dto/update-cafeteria.dto';

@Injectable()
export class CafeteriaService {
  constructor( @InjectRepository(Cafeteria) private cafeteriaRepository: Repository<Cafeteria>,) {}

  async create(createCafeteriaDto: CreateCafeteriaDto) {
    try {
      const query = `INSERT INTO cafeterias (name, location) VALUES ('${createCafeteriaDto.name}', '${createCafeteriaDto.location}') RETURNING * `;

      const result = await this.cafeteriaRepository.query(query);

      return {
        message: 'Cafeteria created successfully.',
        data: result[0],
      };
    } catch (error) {
      console.error('Error creating cafeteria:', error);
      throw new InternalServerErrorException('Failed to create cafeteria');
    }
  }

  async findAll() {
    try {
      const query = `SELECT * FROM cafeterias`;
      const result = await this.cafeteriaRepository.query(query);

      if (!result || result.length === 0) {
        throw new NotFoundException('No cafeterias found');
      }

      return result;
    } catch (error) {
      console.error('Error fetching cafeterias:', error);
      throw new InternalServerErrorException('Failed to fetch cafeterias');
    }
  }

  async findOne(id: number) {
    try {
      const query = `SELECT * FROM cafeterias WHERE id = ${id}`;
      const result = await this.cafeteriaRepository.query(query);

      if (!result || result.length === 0) {
        throw new NotFoundException(`Cafeteria with ID ${id} not found`);
      }

      return result[0];
    } catch (error) {
      console.error('Error fetching cafeteria:', error);
      throw new InternalServerErrorException('Failed to fetch cafeteria');
    }
  }

  async update(id: number, updateCafeteriaDto: UpdateCafeteriaDto) {
    try {
      const query = `
        UPDATE cafeterias SET name = '${updateCafeteriaDto.name}', location = '${updateCafeteriaDto.location}' WHERE id = ${id} RETURNING * `;

      const result = await this.cafeteriaRepository.query(query);

      if (!result || result.length === 0) {
        throw new NotFoundException(`Cafeteria with ID ${id} not found`);
      }

      return {
        message: `Cafeteria with ID ${id} updated successfully.`,
        data: result[0],
      };
    } catch (error) {
      console.error('Error updating cafeteria:', error);
      throw new InternalServerErrorException('Failed to update cafeteria');
    }
  }

  async remove(id: number) {
    try {
      const query = `DELETE FROM cafeterias WHERE id = ${id} RETURNING *`;

      const result = await this.cafeteriaRepository.query(query);

      if (!result || result.length === 0) {
        throw new NotFoundException(`Cafeteria with ID ${id} not found`);
      }

      return {
        message: `Cafeteria with ID ${id} removed successfully.`,
        data: result[0],
      };
    } catch (error) {
      console.error('Error deleting cafeteria:', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to delete cafeteria');
    }
  }
}
