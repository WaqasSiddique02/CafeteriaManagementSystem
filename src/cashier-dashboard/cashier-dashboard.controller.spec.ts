import { Test, TestingModule } from '@nestjs/testing';
import { CashierDashboardController } from './cashier-dashboard.controller';

describe('CashierDashboardController', () => {
  let controller: CashierDashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashierDashboardController],
    }).compile();

    controller = module.get<CashierDashboardController>(CashierDashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
