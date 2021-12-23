import { Test, TestingModule } from '@nestjs/testing';
import { SnsController } from './sns.controller';

describe('SnsController', () => {
  let controller: SnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnsController],
    }).compile();

    controller = module.get<SnsController>(SnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
