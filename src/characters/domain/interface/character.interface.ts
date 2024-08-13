import { Character } from '../entities/character.entity';

export interface CharacterInterface {
  save(character: Character): Promise<Character>;
  findAll(): Promise<Character[]>;
  findBy(
    query: Partial<{ name: string; _id: string }>,
  ): Promise<Character | null>;
  update(character: Character): Promise<Character | null>;
  deleteById(id: string): Promise<boolean>;
}
