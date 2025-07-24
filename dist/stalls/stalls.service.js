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
exports.StallsService = void 0;
const common_1 = require("@nestjs/common");
const stall_entity_1 = require("./entities/stall.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let StallsService = class StallsService {
    stallRepository;
    constructor(stallRepository) {
        this.stallRepository = stallRepository;
    }
    async create(createStallDto) {
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
        }
        catch (error) {
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
        }
        catch (error) {
            console.error('Error fetching stalls:', error);
            throw new Error('Failed to fetch stalls');
        }
    }
    async findOne(id) {
        try {
            const query = `SELECT stalls.*, cafeterias.name AS cafeteria_name, cafeterias.location AS cafeteria_location
      FROM stalls
      INNER JOIN cafeterias ON cafeterias.id = stalls.cafeteria_id WHERE stalls.id = ${id}`;
            const result = await this.stallRepository.query(query);
            if (result.length === 0) {
                throw new Error(`Stall with ID ${id} not found`);
            }
            return result[0];
        }
        catch (error) {
            console.error('Error fetching stall:', error);
            throw new Error('Failed to fetch stall');
        }
    }
    async update(id, updateStallDto) {
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
        }
        catch (error) {
            console.error('Error updating stall:', error);
            throw new Error('Failed to update stall');
        }
    }
    async remove(id) {
        try {
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
        }
        catch (error) {
            console.error('Error removing stall:', error);
            throw new Error('Failed to remove stall');
        }
    }
};
exports.StallsService = StallsService;
exports.StallsService = StallsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stall_entity_1.Stall)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StallsService);
//# sourceMappingURL=stalls.service.js.map