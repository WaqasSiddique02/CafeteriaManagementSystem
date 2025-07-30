import { Test, TestingModule } from '@nestjs/testing';
import { ManagerDashboardController } from './manager-dashboard.controller';

describe('ManagerDashboardController', () => {
  let controller: ManagerDashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerDashboardController],
    }).compile();

    controller = module.get<ManagerDashboardController>(ManagerDashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
