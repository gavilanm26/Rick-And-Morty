import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCharacterUseCaseService } from './delete-character.use-case.service';

describe('DeleteCharacterUseCaseService', () => {
  let service: DeleteCharacterUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteCharacterUseCaseService],
    }).compile();

    service = module.get<DeleteCharacterUseCaseService>(
      DeleteCharacterUseCaseService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
