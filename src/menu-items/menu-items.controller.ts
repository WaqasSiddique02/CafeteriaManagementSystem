import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/authorization/roles.guard';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { Role } from 'src/auth/authorization/role.enum';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) { }

  @Post()
  @Roles(Role.Admin,Role.Manager)
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemsService.create(createMenuItemDto);
  }

  @Get()
  @Roles(Role.Admin,Role.Manager,Role.Cashier)
  findAll() {
    return this.menuItemsService.findAll();
  }
  
  @Get('available')
  @Roles(Role.Admin,Role.Manager,Role.Cashier)
  findAllAvailable() {
    return this.menuItemsService.findAllAvailable();
  }
  @Get(':id')
  @Roles(Role.Admin,Role.Manager,Role.Cashier)
  findOne(@Param('id') id: string) {
    return this.menuItemsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin,Role.Manager)
  update(@Param('id') id: string, @Body() updateMenuItemDto: UpdateMenuItemDto) {
    return this.menuItemsService.update(+id, updateMenuItemDto);
  }

  @Delete(':id/softRemove')
  @Roles(Role.Admin,Role.Manager)
  softRemove(@Param('id') id: string) {
    return this.menuItemsService.softRemove(+id);
  }

  @Delete(':id')
  @Roles(Role.Admin,Role.Manager)
  remove(@Param('id') id: string) {
    return this.menuItemsService.remove(+id);
  }
}