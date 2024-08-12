import { Test, TestingModule } from '@nestjs/testing';
import { FindOneCharacterUseCaseService } from './find-one-character.use-case.service';

describe('FindOneCharacterUseCaseService', () => {
  let service: FindOneCharacterUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindOneCharacterUseCaseService],
    }).compile();

    service = module.get<FindOneCharacterUseCaseService>(
      FindOneCharacterUseCaseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
