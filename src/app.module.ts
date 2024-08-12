import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersModule } from './characters/characters.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CharactersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODBURI),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
