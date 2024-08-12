import { Test, TestingModule } from '@nestjs/testing';
import { CreateCharacterUseCaseService } from './create-character.use-case.service';

describe('CreateCharacterUseCaseService', () => {
  let service: CreateCharacterUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCharacterUseCaseService],
    }).compile();

    service = module.get<CreateCharacterUseCaseService>(
      CreateCharacterUseCaseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
