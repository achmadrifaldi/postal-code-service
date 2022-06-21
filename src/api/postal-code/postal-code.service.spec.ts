import { Test, TestingModule } from '@nestjs/testing';
import { PostalCodeService } from './postal-code.service';

describe('PostalCodeService', () => {
  let service: PostalCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostalCodeService],
    }).compile();

    service = module.get<PostalCodeService>(PostalCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
