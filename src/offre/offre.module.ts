/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OffreService } from './offre.service';
import { OffreController } from './offre.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OffreSchema } from './entities/offre.entity';
import { UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name:'offre',
        schema:OffreSchema
      },  {
              name:'user',
              schema: UserSchema,
            }
    ])
  ],
  controllers: [OffreController],
  providers: [OffreService],
})
export class OffreModule {}
