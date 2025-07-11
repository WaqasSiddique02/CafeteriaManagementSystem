import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StallsService } from './stalls.service';
import { CreateStallDto } from './dto/create-stall.dto';
import { UpdateStallDto } from './dto/update-stall.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/authorization/roles.guard';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { Role } from 'src/auth/authorization/role.enum';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('stalls')
export class StallsController {
  constructor(private readonly stallsService: StallsService) {}

  @Post()
  @Roles(Role.Admin)
  create(@Body() createStallDto: CreateStallDto) {
    return this.stallsService.create(createStallDto);
  }

  @Get()
  @Roles(Role.Admin,Role.Manager,Role.Cashier)
  findAll() {
    return this.stallsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin,Role.Manager,Role.Cashier)
  findOne(@Param('id') id: string) {
    return this.stallsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateStallDto: UpdateStallDto) {
    return this.stallsService.update(+id, updateStallDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.stallsService.remove(+id);
  }
}
