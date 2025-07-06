import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StallsService } from './stalls.service';
import { CreateStallDto } from './dto/create-stall.dto';
import { UpdateStallDto } from './dto/update-stall.dto';

@Controller('stalls')
export class StallsController {
  constructor(private readonly stallsService: StallsService) {}

  @Post()
  create(@Body() createStallDto: CreateStallDto) {
    return this.stallsService.create(createStallDto);
  }

  @Get()
  findAll() {
    return this.stallsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stallsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStallDto: UpdateStallDto) {
    return this.stallsService.update(+id, updateStallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stallsService.remove(+id);
  }
}
