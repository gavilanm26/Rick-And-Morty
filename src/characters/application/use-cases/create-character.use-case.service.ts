import { Injectable } from '@nestjs/common';
import { CreateCharacterDto } from '../dto/CreateCharacter.dto';
import { Character } from '../../domain/entities/character.entity';
import { CharacterService } from '../../domain/services/character.service';

@Injectable()
export class CreateCharacterUseCaseService {
  constructor(private readonly characterService: CharacterService) {}

  async execute(createCharacterDto: CreateCharacterDto): Promise<Character> {
    // convertir el DTO en una entidad de dominio
    const character = new Character(
      createCharacterDto.name,
      createCharacterDto.status,
      createCharacterDto.species,
      createCharacterDto.type,
      createCharacterDto.gender,
      {
        nameO: createCharacterDto.origin.nameO,
        url: createCharacterDto.origin.url,
      },
      {
        nameL: createCharacterDto.location.nameL,
        url: createCharacterDto.location.url,
      },
      createCharacterDto.image,
      createCharacterDto.episode,
      createCharacterDto.url,
      createCharacterDto.created,
    );

    return this.characterService.create(character);
  }
}
