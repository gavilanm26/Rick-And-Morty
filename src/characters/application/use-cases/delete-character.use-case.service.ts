import { Injectable } from '@nestjs/common';
import { CharacterService } from '../../domain/services/character.service';

@Injectable()
export class DeleteCharacterUseCaseService {
  constructor(private readonly characterService: CharacterService) {}

  async execute(id: string): Promise<{ deleted: boolean; message?: string }> {
    return this.characterService.deleteById(id);
  }
}
