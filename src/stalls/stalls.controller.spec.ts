import { Test, TestingModule } from '@nestjs/testing';
import { StallsController } from './stalls.controller';
import { StallsService } from './stalls.service';

describe('StallsController', () => {
  let controller: StallsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StallsController],
      providers: [StallsService],
    }).compile();

    controller = module.get<StallsController>(StallsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
