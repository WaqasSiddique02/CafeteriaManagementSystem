import { Test, TestingModule } from '@nestjs/testing';
import { CashierDashboardService } from './cashier-dashboard.service';

describe('CashierDashboardService', () => {
  let service: CashierDashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashierDashboardService],
    }).compile();

    service = module.get<CashierDashboardService>(CashierDashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
