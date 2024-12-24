/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperienceSchema } from './entities/experience.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'experience',
      schema: ExperienceSchema
    }])
  ],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}
