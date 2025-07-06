import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CafeteriaService } from './cafeteria.service';
import { CreateCafeteriaDto } from './dto/create-cafeteria.dto';
import { UpdateCafeteriaDto } from './dto/update-cafeteria.dto';

@Controller('cafeteria')
export class CafeteriaController {
  constructor(private readonly cafeteriaService: CafeteriaService) {}

  @Post()
  create(@Body() createCafeteriaDto: CreateCafeteriaDto) {
    return this.cafeteriaService.create(createCafeteriaDto);
  }

  @Get()
  findAll() {
    return this.cafeteriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cafeteriaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCafeteriaDto: UpdateCafeteriaDto) {
    return this.cafeteriaService.update(+id, updateCafeteriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cafeteriaService.remove(+id);
  }
}
