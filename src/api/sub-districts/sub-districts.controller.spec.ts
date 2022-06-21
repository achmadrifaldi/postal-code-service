import { Test, TestingModule } from '@nestjs/testing';
import { SubDistrictsController } from './sub-districts.controller';

describe('SubDistrictsController', () => {
  let controller: SubDistrictsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubDistrictsController],
    }).compile();

    controller = module.get<SubDistrictsController>(SubDistrictsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
