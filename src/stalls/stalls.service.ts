import { Injectable } from '@nestjs/common';
import { CreateStallDto } from './dto/create-stall.dto';
import { UpdateStallDto } from './dto/update-stall.dto';
import { Stall } from './entities/stall.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StallsService {
  constructor(@InjectRepository(Stall) private stallRepository: Repository<Stall>,) {}

async create(createStallDto: CreateStallDto) {
  try {
    const percent = createStallDto.university_share_percent ?? 10.00;

    const query = `
      INSERT INTO stalls (name, cafeteria_id, university_share_percent) 
      VALUES ('${createStallDto.name}', ${createStallDto.cafeteria_id}, ${percent})
      RETURNING *
    `;

    const result = await this.stallRepository.query(query);

    console.log('Stall created successfully:', result[0]);

    return {
      message: 'Stall created successfully',
      data: result[0],
    };
  } catch (error) {
    console.error('Error creating stall:', error);
    throw new Error('Failed to create stall');
  }
}

async findAll() {
  try {
    const query = `SELECT stalls.*, cafeterias.name AS cafeteria_name, cafeterias.location AS cafeteria_location
      FROM stalls
      INNER JOIN cafeterias ON cafeterias.id = stalls.cafeteria_id`;

    const result = await this.stallRepository.query(query);

    if (result.length === 0) {
      throw new Error('No stalls found');
    }

    return result;
  } catch (error) {
    console.error('Error fetching stalls:', error);
    throw new Error('Failed to fetch stalls');
  }
}


  async findOne(id: number) {
    try{
     const query = `SELECT stalls.*, cafeterias.name AS cafeteria_name, cafeterias.location AS cafeteria_location
      FROM stalls
      INNER JOIN cafeterias ON cafeterias.id = stalls.cafeteria_id WHERE stalls.id = ${id}`;
      const result = await this.stallRepository.query(query);
      if (result.length === 0) {
        throw new Error(`Stall with ID ${id} not found`);
      }
      return result[0];
    }catch(error){
      console.error('Error fetching stall:', error);
      throw new Error('Failed to fetch stall');
    }
  }

  async update(id: number, updateStallDto: UpdateStallDto) {
    try {
    const percent = updateStallDto.university_share_percent ?? 10.00;

    const query = `
      UPDATE stalls SET name = '${updateStallDto.name}', cafeteria_id = ${updateStallDto.cafeteria_id}, university_share_percent = ${percent}
      WHERE id = ${id}
      RETURNING *
    `;

    const result = await this.stallRepository.query(query);

    console.log('Stall updated successfully:', result[0]);

    return {
      message: 'Stall updated successfully',
      data: result[0],
    };
  } catch (error) {
    console.error('Error updating stall:', error);
    throw new Error('Failed to update stall');
  }
  }

  async remove(id: number) {
    try{
      const query = `DELETE FROM stalls WHERE id = ${id} RETURNING *`;
      const result = await this.stallRepository.query(query);

      if (result.length === 0) {
        throw new Error(`Stall with ID ${id} not found`);
      }

      console.log('Stall removed successfully:', result[0]);

      return {
        message: 'Stall removed successfully',
        data: result[0],
      };
    }catch(error){
      console.error('Error removing stall:', error);
      throw new Error('Failed to remove stall');
    }
  }
}
