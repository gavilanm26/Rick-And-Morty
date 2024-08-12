import { Test, TestingModule } from '@nestjs/testing';
import { FindAllCharacterUseCaseService } from './find-all-character.use-case.service';

describe('FindAllCharacterUseCaseService', () => {
  let service: FindAllCharacterUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAllCharacterUseCaseService],
    }).compile();

    service = module.get<FindAllCharacterUseCaseService>(FindAllCharacterUseCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
