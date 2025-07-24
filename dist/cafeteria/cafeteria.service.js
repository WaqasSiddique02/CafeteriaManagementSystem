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
exports.CafeteriaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cafeteria_entity_1 = require("./entities/cafeteria.entity");
let CafeteriaService = class CafeteriaService {
    cafeteriaRepository;
    constructor(cafeteriaRepository) {
        this.cafeteriaRepository = cafeteriaRepository;
    }
    async create(createCafeteriaDto) {
        try {
            const query = `INSERT INTO cafeterias (name, location) VALUES ('${createCafeteriaDto.name}', '${createCafeteriaDto.location}') RETURNING * `;
            const result = await this.cafeteriaRepository.query(query);
            return {
                message: 'Cafeteria created successfully.',
                data: result[0],
            };
        }
        catch (error) {
            console.error('Error creating cafeteria:', error);
            throw new common_1.InternalServerErrorException('Failed to create cafeteria');
        }
    }
    async findAll() {
        try {
            const query = `SELECT * FROM cafeterias`;
            const result = await this.cafeteriaRepository.query(query);
            if (!result || result.length === 0) {
                throw new common_1.NotFoundException('No cafeterias found');
            }
            return result;
        }
        catch (error) {
            console.error('Error fetching cafeterias:', error);
            throw new common_1.InternalServerErrorException('Failed to fetch cafeterias');
        }
    }
    async findOne(id) {
        try {
            const query = `SELECT * FROM cafeterias WHERE id = ${id}`;
            const result = await this.cafeteriaRepository.query(query);
            if (!result || result.length === 0) {
                throw new common_1.NotFoundException(`Cafeteria with ID ${id} not found`);
            }
            return result[0];
        }
        catch (error) {
            console.error('Error fetching cafeteria:', error);
            throw new common_1.InternalServerErrorException('Failed to fetch cafeteria');
        }
    }
    async update(id, updateCafeteriaDto) {
        try {
            const query = `
        UPDATE cafeterias SET name = '${updateCafeteriaDto.name}', location = '${updateCafeteriaDto.location}' WHERE id = ${id} RETURNING * `;
            const result = await this.cafeteriaRepository.query(query);
            if (!result || result.length === 0) {
                throw new common_1.NotFoundException(`Cafeteria with ID ${id} not found`);
            }
            return {
                message: `Cafeteria with ID ${id} updated successfully.`,
                data: result[0],
            };
        }
        catch (error) {
            console.error('Error updating cafeteria:', error);
            throw new common_1.InternalServerErrorException('Failed to update cafeteria');
        }
    }
    async remove(id) {
        try {
            const query = `DELETE FROM cafeterias WHERE id = ${id} RETURNING *`;
            const result = await this.cafeteriaRepository.query(query);
            if (!result || result.length === 0) {
                throw new common_1.NotFoundException(`Cafeteria with ID ${id} not found`);
            }
            return {
                message: `Cafeteria with ID ${id} removed successfully.`,
                data: result[0],
            };
        }
        catch (error) {
            console.error('Error deleting cafeteria:', error);
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.InternalServerErrorException('Failed to delete cafeteria');
        }
    }
};
exports.CafeteriaService = CafeteriaService;
exports.CafeteriaService = CafeteriaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cafeteria_entity_1.Cafeteria)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CafeteriaService);
//# sourceMappingURL=cafeteria.service.js.map