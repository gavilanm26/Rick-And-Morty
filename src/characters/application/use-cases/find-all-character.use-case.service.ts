import { Injectable } from '@nestjs/common';
import { CharacterService } from '../../domain/services/character.service';
import { Character } from '../../domain/entities/character.entity';

@Injectable()
export class FindAllCharacterUseCaseService {
  constructor(private readonly characterService: CharacterService) {}

  async findAll(): Promise<Character[]> {
    return this.characterService.findAll();
  }
}
