import { Test, TestingModule } from '@nestjs/testing';
import { CharacterRepository } from './character.repository';

describe('CharacterRepository', () => {
  let service: CharacterRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterRepository],
    }).compile();

    service = module.get<CharacterRepository>(CharacterRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
