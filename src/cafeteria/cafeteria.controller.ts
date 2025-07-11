import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CafeteriaService } from './cafeteria.service';
import { CreateCafeteriaDto } from './dto/create-cafeteria.dto';
import { UpdateCafeteriaDto } from './dto/update-cafeteria.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/authorization/roles.guard';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { Role } from 'src/auth/authorization/role.enum';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('cafeteria')
export class CafeteriaController {
  constructor(private readonly cafeteriaService: CafeteriaService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createCafeteriaDto: CreateCafeteriaDto) {
    return this.cafeteriaService.create(createCafeteriaDto);
  }

  @Get()
  @Roles(Role.Admin,Role.Cashier,Role.Manager)
  findAll() {
    return this.cafeteriaService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin,Role.Cashier,Role.Manager)
  findOne(@Param('id') id: string) {
    return this.cafeteriaService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateCafeteriaDto: UpdateCafeteriaDto) {
    return this.cafeteriaService.update(+id, updateCafeteriaDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.cafeteriaService.remove(+id);
  }
}