import { Test, TestingModule } from '@nestjs/testing';
import { SubDistrictsService } from './sub-districts.service';

describe('SubDistrictsService', () => {
  let service: SubDistrictsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubDistrictsService],
    }).compile();

    service = module.get<SubDistrictsService>(SubDistrictsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
