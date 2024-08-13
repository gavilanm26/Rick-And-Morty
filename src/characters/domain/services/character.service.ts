import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Character } from '../entities/character.entity';
import { CharacterInterface } from '../interface/character.interface';
import { UpdateCharacterDto } from '../../application/dto/UpdateCharacterDto';

@Injectable()
export class CharacterService {
  private readonly logger = new Logger(CharacterService.name);
  constructor(
    @Inject('CharacterInterface')
    private readonly characterRepository: CharacterInterface,
  ) {}

  async create(characterDto: Character): Promise<Character> {
    this.logger.log(`Received DTO: ${JSON.stringify(characterDto)}`);

    // Verificar si el personaje ya existe
    return this.characterRepository
      .findBy({ name: characterDto.name })
      .then((existingCharacter) => {
        if (existingCharacter) {
          this.logger.warn(
            `Character with name ${characterDto.name} already exists.`,
          );

          throw new BadRequestException(
            `Character with name ${characterDto.name} already exists.`,
          );
        }

        // Si no existe, proceder a guardarlo
        return this.characterRepository
          .save(characterDto)
          .then((characterSaved) => {
            this.logger.log(
              `Character ${characterSaved.name} created successfully.`,
            );
            return characterSaved;
          });
      })
      .catch((error) => {
        if (!(error instanceof BadRequestException)) {
          this.logger.error(
            `Error while creating character ${characterDto.name}`,
            error.stack,
          );
        }
        throw error;
      });
  }

  async findAll(): Promise<Character[]> {
    this.logger.log('Retrieving all characters');
    return this.characterRepository
      .findAll()
      .then((characters) => {
        this.logger.log(
          `Retrieved ${characters.length} characters successfully`,
        );
        return characters;
      })
      .catch((error) => {
        this.logger.error('Failed to retrieve characters', error.stack);
        throw error;
      });
  }

  findBy(
    query: Partial<{ name: string; _id: string }>,
  ): Promise<Character | null> {
    const searchKey = query._id ? '_id' : 'name';
    const searchValue = query._id || query.name;

    this.logger.log(
      `(GET) Retrieving character with ${searchKey}: ${searchValue}`,
    );

    return this.characterRepository
      .findBy(query)
      .then((character) => {
        if (character) {
          this.logger.log(
            `(GET) Found character with ${searchKey}: ${searchValue}`,
          );
          return character;
        } else {
          this.logger.warn(
            `(GET) Character not found with ${searchKey}: ${searchValue}`,
          );
          throw new BadRequestException(
            `Character with ${searchKey} ${searchValue} not found`,
          );
        }
      })
      .catch((error) => {
        this.logger.error(
          `(GET) Error retrieving character with ${searchKey}: ${searchValue}`,
        );
        throw error;
      });
  }

  async updateBy(
    id: string,
    updateCharacterDto: UpdateCharacterDto,
  ): Promise<Character | null> {
    this.logger.log(`(PUT) Updating character with name: ${id}`);

    const existingCharacter = await this.characterRepository.findBy({
      _id: id,
    });
    if (!existingCharacter) {
      this.logger.warn(`(PUT) Character not found: ${id}`);
      throw new BadRequestException(`Character with name ${id} not found`);
    }

    // Aplicar las actualizaciones
    Object.assign(existingCharacter, updateCharacterDto);

    return this.characterRepository
      .update(existingCharacter)
      .then((updatedCharacter) => {
        this.logger.log(`(PUT) Character ${id} updated successfully`);
        return updatedCharacter;
      })
      .catch((error) => {
        this.logger.error(`(PUT) Failed to update character ${id}`);
        throw error;
      });
  }

  deleteById(id: string): Promise<{ deleted: boolean; message?: string }> {
    this.logger.log(`(DELETE) Deleting character with id: ${id}`);

    return this.characterRepository
      .deleteById(id)
      .then((result) => {
        if (result) {
          this.logger.log(
            `(DELETE) Character with id ${id} deleted successfully.`,
          );
          return { deleted: true };
        } else {
          this.logger.warn(`(DELETE) Character with id ${id} not found.`);
          return { deleted: false, message: 'Character not found' };
        }
      })
      .catch((error) => {
        this.logger.error(
          `(DELETE) Error deleting character with id ${id}`,
          error.stack,
        );
        throw error;
      });
  }
  // Otros métodos de negocio relacionados, como update, delete, find, etc.
}
