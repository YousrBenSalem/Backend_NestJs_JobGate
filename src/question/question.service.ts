/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuestion } from './interface/question.interface';

@Injectable()
export class QuestionService {
    constructor (
      @InjectModel('question') private questionModel: Model<IQuestion>
    ){}
  async createQuestion(createQuestionDto: CreateQuestionDto):Promise<IQuestion> {
    const newQuestion = await new this.questionModel(createQuestionDto);
        return newQuestion.save()  }

  async findAllQuestions() :Promise<IQuestion[]> {
    const questionData = await this.questionModel.find();
        if(!questionData || questionData.length == 0){
          throw new NotFoundException("Questions data not found")
        }
        return questionData;
  }

  async findQuestionById(questionId: string) {
    const existingQuestion = await this.questionModel.findById(questionId).exec();
    if (!existingQuestion) {
      throw new NotFoundException(`Question #${questionId} not found`);
      }
      return existingQuestion;
  }

  async updateQuestion(questionId: string, updateQuestionDto: UpdateQuestionDto): Promise <IQuestion> {
    const updateQuestion = await this.questionModel.findByIdAndUpdate(questionId , updateQuestionDto , {new : true});
    if(!updateQuestion){
      throw new  NotFoundException (`question #${questionId} not found`);
    }
    return updateQuestion
    
  }

  async removeQuestion(questionId: string):Promise<IQuestion> {
    const deletedQuestion = await this.questionModel.findByIdAndDelete(questionId).exec();
    if(!deletedQuestion){
      throw new NotFoundException(`Question #${questionId} not found`);
      }
      return deletedQuestion;
  }
}
