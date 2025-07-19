import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/authorization/roles.guard';
import { Role } from 'src/auth/authorization/role.enum';
import { Roles } from 'src/auth/authorization/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  @Roles(Role.Admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  @Roles(Role.Admin, Role.Manager, Role.Cashier)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':id')
  @Roles(Role.Admin, Role.Manager, Role.Cashier)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch('reset-password/:email')
  updatePassword(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    console.log(`Received password reset request for email: ${email}`);
    return this.usersService.updatePassword(email, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
