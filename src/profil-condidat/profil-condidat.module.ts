/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProfilCondidatService } from './profil-condidat.service';
import { ProfilCondidatController } from './profil-condidat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfilCondidatSchema } from './entities/profil-condidat.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'profilCondidat',
      schema: ProfilCondidatSchema
    }])
  ],
  controllers: [ProfilCondidatController],
  providers: [ProfilCondidatService],
})
export class ProfilCondidatModule {}
