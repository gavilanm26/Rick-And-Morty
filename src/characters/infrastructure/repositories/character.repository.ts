import { Injectable, Logger } from '@nestjs/common';
import { CharacterInterface } from '../../domain/interface/character.interface';
import { Character as CharacterSchema } from '../schemas/characters.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Character } from '../../domain/entities/character.entity';

@Injectable()
export class CharacterRepository implements CharacterInterface {
  private readonly logger = new Logger(CharacterRepository.name);
  constructor(
    @InjectModel(CharacterSchema.name)
    private readonly characterModel: Model<CharacterSchema>,
  ) {}

  async save(character: Character): Promise<Character> {
    return new this.characterModel(character)
      .save()
      .then((savedCharacter) => {
        this.logger.log(
          `Character saved successfully: ${JSON.stringify(savedCharacter)}`,
        );
        return savedCharacter;
      })
      .catch((error) => {
        this.logger.error(
          `Failed to save character ${character.name}`,
          error.stack,
        );
        throw error;
      });
  }

  async findAll(): Promise<Character[]> {
    this.logger.log('Finding all characters');

    return this.characterModel
      .find()
      .exec()
      .then((characters) => {
        this.logger.log(
          `Found ${characters.length} characters: ${JSON.stringify(characters)}`,
        );
        return characters;
      })
      .catch((error) => {
        this.logger.error('Failed to find characters', error.stack);
        throw error;
      });
  }
  async findBy(
    query: Partial<{ name: string; _id: string }>,
  ): Promise<Character | null> {
    const criteria = query._id ? { _id: query._id } : { name: query.name };

    this.logger.log(
      `(GET) Finding character by ${query._id ? '_id' : 'name'}: ${query._id || query.name}`,
    );

    return this.characterModel
      .findOne(criteria)
      .exec()
      .then((character) => {
        if (character) {
          this.logger.log(
            `(GET) Found character: ${JSON.stringify(character)}`,
          );
        } else {
          this.logger.warn(
            `(GET) Character ${query._id || query.name} not found.`,
          );
        }
        return character;
      })
      .catch((error) => {
        this.logger.error(
          `(GET) Failed to find character ${query._id ? query._id : query.name}`,
        );
        throw error;
      });
  }

  async update(
    character: Character & Document & { _id: string },
  ): Promise<Character | null> {
    this.logger.log(`(PUT) Updating character: ${character.name}`);
    return this.characterModel
      .findByIdAndUpdate(character._id, character, { new: true })
      .exec()
      .then((updatedCharacter) => {
        this.logger.log(
          `(PUT) Character updated successfully: ${JSON.stringify(updatedCharacter)}`,
        );
        return updatedCharacter;
      })
      .catch((error) => {
        this.logger.error(
          `(PUT) Failed to update character ${character.name}`,
          error.stack,
        );
        throw error;
      });
  }

  async deleteById(id: string): Promise<boolean> {
    this.logger.log(`(DELETE) Deleting character with id: ${id}`);

    return this.characterModel
      .deleteOne({ _id: id })
      .exec()
      .then((result: { deletedCount?: number }) => {
        if (result.deletedCount && result.deletedCount > 0) {
          this.logger.log(
            `(DELETE) Character with id ${id} deleted successfully.`,
          );
          return true;
        } else {
          this.logger.warn(`(DELETE) Character with id ${id} not found.`);
          return false;
        }
      })
      .catch((error) => {
        this.logger.error(
          `(DELETE) Failed to delete character with id ${id}`,
          error.stack,
        );
        throw error;
      });
  }
}
