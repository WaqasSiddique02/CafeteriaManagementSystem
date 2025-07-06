import { Module } from '@nestjs/common';
import { CafeteriaService } from './cafeteria.service';
import { CafeteriaController } from './cafeteria.controller';
import { Cafeteria } from './entities/cafeteria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cafeteria])],
  controllers: [CafeteriaController],
  providers: [CafeteriaService],
})
export class CafeteriaModule {}