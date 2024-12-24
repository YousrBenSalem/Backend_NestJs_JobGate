/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CondidatService } from './condidat.service';
import { CondidatController } from './condidat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'user',
        schema:UserSchema

      }
    ])
  ],
  controllers: [CondidatController],
  providers: [CondidatService],
})
export class CondidatModule {}
