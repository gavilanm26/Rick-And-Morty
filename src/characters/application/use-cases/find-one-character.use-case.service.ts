import { Injectable } from '@nestjs/common';
import { CharacterService } from '../../domain/services/character.service';
import { Character } from '../../domain/entities/character.entity';

@Injectable()
export class FindOneCharacterUseCaseService {
  constructor(private readonly characterService: CharacterService) {}

  async findOne(
    query: Partial<{ name: string; _id: string }>,
  ): Promise<Character | null> {
    return this.characterService.findBy(query);
  }
}
