import { Injectable } from '@nestjs/common';
import { CharacterService } from '../../domain/services/character.service';
import { Character } from '../../domain/entities/character.entity';
import { UpdateCharacterDto } from '../dto/UpdateCharacterDto';

@Injectable()
export class UpdateCharacterUseCaseService {
  constructor(private readonly characterService: CharacterService) {}

  async update(
    id: string,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character | null> {
    return this.characterService.updateBy(id, updateCharacterDto);
  }
}
