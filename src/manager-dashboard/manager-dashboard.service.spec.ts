import { Test, TestingModule } from '@nestjs/testing';
import { ManagerDashboardService } from './manager-dashboard.service';

describe('ManagerDashboardService', () => {
  let service: ManagerDashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagerDashboardService],
    }).compile();

    service = module.get<ManagerDashboardService>(ManagerDashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
