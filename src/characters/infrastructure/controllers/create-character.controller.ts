import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCharacterDto } from '../../application/dto/CreateCharacter.dto';
import { Character } from '../../domain/entities/character.entity';
import { CreateCharacterUseCaseService } from '../../application/use-cases/create-character.use-case.service';
import { FindAllCharacterUseCaseService } from '../../application/use-cases/find-all-character.use-case.service';
import { FindOneCharacterUseCaseService } from '../../application/use-cases/find-one-character.use-case.service';
import { UpdateCharacterUseCaseService } from '../../application/use-cases/update-character.use-case.service';
import { DeleteCharacterUseCaseService } from '../../application/use-cases/delete-character.use-case.service';
import { UpdateCharacterDto } from '../../application/dto/UpdateCharacterDto';
import { isValidObjectId } from 'mongoose';

@Controller('create-character')
export class CreateCharacterController {
  constructor(
    private readonly createCharacterUseCase: CreateCharacterUseCaseService,
    private readonly findAllCharacterUseCaseService: FindAllCharacterUseCaseService,
    private readonly findOneCharacterUseCaseService: FindOneCharacterUseCaseService,
    private readonly updateCharacterUseCaseService: UpdateCharacterUseCaseService,
    private readonly deleteCharacterUseCaseService: DeleteCharacterUseCaseService,
  ) {}

  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto): Promise<any> {
    //return this.createCharacterUseCase.execute(createCharacterDto);
    await this.createCharacterUseCase.execute(createCharacterDto);
    return { message: 'Character saved successfully' };
  }

  @Get()
  async findAll(): Promise<Character[]> {
    return this.findAllCharacterUseCaseService.findAll();
  }

  @Get(':identifier')
  async findOne(@Param('identifier') identifier: string): Promise<Character> {
    const query = isValidObjectId(identifier)
      ? { _id: identifier }
      : { name: identifier };

    return this.findOneCharacterUseCaseService.findOne(query);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ): Promise<any> {
    return this.updateCharacterUseCaseService.update(id, updateCharacterDto);
    //await this.createCharacterUseCase.execute(updateCharacterDto);
    //return { message: 'Character updated successfully' };
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<{ deleted: boolean; message?: string }> {
    const result = await this.deleteCharacterUseCaseService.execute(id);

    if (!result.deleted) {
      throw new BadRequestException(result.message);
    }

    return result;
  }
}
