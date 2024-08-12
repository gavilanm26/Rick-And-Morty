import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Origin {
  @Prop({ required: true })
  nameO: string;

  @Prop({ required: true })
  url: string;
}

@Schema()
class Location {
  @Prop({ required: true })
  nameL: string;

  @Prop({ required: true })
  url: string;
}

@Schema()
export class Character extends Document {
  @Prop({
    unique: true,
    index: true,
    required: true,
  })
  name: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  species: string;

  @Prop({ required: false })
  type: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ type: Origin, required: true })
  origin: Origin;

  @Prop({ type: Location, required: true })
  location: Location;

  @Prop({ required: true })
  image: string;

  @Prop({ type: [String], required: true })
  episode: string[];

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  created: Date;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
