import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCharacterUseCaseService } from './update-character.use-case.service';

describe('UpdateCharacterUseCaseService', () => {
  let service: UpdateCharacterUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCharacterUseCaseService],
    }).compile();

    service = module.get<UpdateCharacterUseCaseService>(
      UpdateCharacterUseCaseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
