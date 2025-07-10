import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/auth/authorization/role.enum';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { RolesGuard } from 'src/auth/authorization/roles.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) { }

  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemsService.create(createMenuItemDto);
  }

  @UseGuards(RolesGuard)
  @Get()
  @Roles(Role.Cashier,Role.Admin)
  findAll() {
    return this.menuItemsService.findAll();
  }
  @Get('available')
  findAllAvailable() {
    return this.menuItemsService.findAllAvailable();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuItemDto: UpdateMenuItemDto) {
    return this.menuItemsService.update(+id, updateMenuItemDto);
  }
  @Delete(':id/softRemove')
  softRemove(@Param('id') id: string) {
    return this.menuItemsService.softRemove(+id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuItemsService.remove(+id);
  }
}
