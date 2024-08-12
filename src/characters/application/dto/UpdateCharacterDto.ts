import { IsString, IsArray, IsObject, IsOptional } from 'class-validator';

export class UpdateCharacterDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  species?: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsObject()
  @IsOptional()
  origin?: {
    nameO?: string;
    url?: string;
  };

  @IsObject()
  @IsOptional()
  location?: {
    nameL?: string;
    url?: string;
  };

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @IsOptional()
  episode?: string[];

  @IsString()
  @IsOptional()
  url?: string;
}
