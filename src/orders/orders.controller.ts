import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { Role } from 'src/auth/authorization/role.enum';
import { RolesGuard } from 'src/auth/authorization/roles.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard,RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(Role.Admin,Role.Cashier)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Roles(Role.Admin,Role.Manager,Role.Cashier,Role.Manager)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin,Role.Manager,Role.Cashier)
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin,Role.Cashier)
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @Roles(Role.Admin,Role.Cashier)
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
