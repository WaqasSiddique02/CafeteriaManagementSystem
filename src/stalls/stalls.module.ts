import { Module } from '@nestjs/common';
import { StallsService } from './stalls.service';
import { StallsController } from './stalls.controller';
import { Stall } from './entities/stall.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stall])],
  controllers: [StallsController],
  providers: [StallsService],
})
export class StallsModule {}
