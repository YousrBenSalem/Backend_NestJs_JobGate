/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from './entities/question.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'question',
        schema: QuestionSchema,
      }
    ])
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
