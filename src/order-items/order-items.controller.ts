import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/authorization/roles.guard';
import { Role } from 'src/auth/authorization/role.enum';
import { Roles } from 'src/auth/authorization/roles.decorator';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  @Roles(Role.Admin,Role.Cashier)
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Get()
  @Roles(Role.Admin,Role.Cashier,Role.Manager)
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin,Role.Cashier,Role.Manager)
  findOne(@Param('id') id: string) {
    return this.orderItemsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Admin,Role.Cashier)
  update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemsService.update(+id, updateOrderItemDto);
  }

  @Delete(':id')
  @Roles(Role.Admin,Role.Cashier)
  remove(@Param('id') id: string) {
    return this.orderItemsService.remove(+id);
  }
}