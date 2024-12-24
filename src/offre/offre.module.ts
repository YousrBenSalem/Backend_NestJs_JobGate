/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OffreService } from './offre.service';
import { OffreController } from './offre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OffreSchema } from './entities/offre.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name:'offre',
        schema:OffreSchema
      }
    ])
  ],
  controllers: [OffreController],
  providers: [OffreService],
})
export class OffreModule {}
