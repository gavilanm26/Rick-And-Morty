import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Character,
  CharacterSchema,
} from './infrastructure/schemas/characters.schema';
import { CreateCharacterController } from './infrastructure/controllers/create-character.controller';
import { CharacterService } from './domain/services/character.service';
import { CreateCharacterUseCaseService } from './application/use-cases/create-character.use-case.service';
import { CharacterRepository } from './infrastructure/repositories/character.repository';
import { FindAllCharacterUseCaseService } from './application/use-cases/find-all-character.use-case.service';
import { FindOneCharacterUseCaseService } from './application/use-cases/find-one-character.use-case.service';
import { UpdateCharacterUseCaseService } from './application/use-cases/update-character.use-case.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Character.name, schema: CharacterSchema },
    ]),
  ],
  controllers: [CreateCharacterController],
  providers: [
    CharacterService,
    CreateCharacterUseCaseService,
    {
      provide: 'CharacterInterface',
      useClass: CharacterRepository,
    },
    FindAllCharacterUseCaseService,
    FindOneCharacterUseCaseService,
    UpdateCharacterUseCaseService,
  ],
  exports: [CharacterService],
})
export class CharactersModule {}
