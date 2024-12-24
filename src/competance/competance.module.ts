/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CompetanceService } from './competance.service';
import { CompetanceController } from './competance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompetanceSchema } from './entities/competance.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name:'competance',
        schema: CompetanceSchema,
      }
    ])
  ],
  controllers: [CompetanceController],
  providers: [CompetanceService],
})
export class CompetanceModule {}
