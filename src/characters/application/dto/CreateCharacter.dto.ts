import {
  IsString,
  IsArray,
  IsObject,
  IsDate,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class OriginDto {
  @IsString()
  @IsNotEmpty()
  nameO: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

class LocationDto {
  @IsString()
  @IsNotEmpty()
  nameL: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  species: string;

  @IsString()
  type: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsObject()
  @ValidateNested()
  @Type(() => OriginDto)
  origin: OriginDto;

  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  episode: string[];

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  created: Date;
}
