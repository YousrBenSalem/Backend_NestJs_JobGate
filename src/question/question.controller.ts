/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async createQuestion(
    @Res() response ,
    @Body() createQuestionDto: CreateQuestionDto) {
    try {
      const newQuestion = await this.questionService.createQuestion(createQuestionDto);
      return response.status(HttpStatus.CREATED).json({ message: 'Question created successfully', newQuestion });

    } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({

          message: 'Error creating question'+err,

        })
      
    }
  }

  @Get()
  async findAllQuestions(
    @Res() response,
  ) {
try {
      const questions = await this.questionService.findAllQuestions();
      return response.status(HttpStatus.OK).json({
        message: 'Questions retrieved successfully',
        questions
      });
  
} catch (err) {
      return response.status(err.status).json(err.response)
      
    }
  
}  

  @Get(':id')
  async findQuestionById(
    @Res() response ,
    @Param('id') questionId: string) {
try {
        const question = await this.questionService.findQuestionById(questionId);
        return response.status(HttpStatus.OK).json({ message: 'Question retrieved successfully', question });
        
      } catch (err) {
        return response.status(HttpStatus.NOT_FOUND).json(err.Response);
        
      }  }

  @Put(':id')
  async updateQuestion(
        @Res() response ,
    @Param('id') questionId: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    try {
        const updatedQuestion = await this.questionService.updateQuestion(questionId, updateQuestionDto);
        return response.status(HttpStatus.OK).json({ message: 'Question updated successfully', updatedQuestion });
      } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Error updating question' + err });
        
      }
  }

  @Delete(':id')
  async removeQuestion(
    @Res() response ,
    @Param('id') questionId: string) {
        try {
      const deletedQuestion = await this.questionService.removeQuestion(questionId);
      return response.status(HttpStatus.OK).json({ message: 'Question deleted successfully', deletedQuestion });
      
    } catch (err) {
      return response.status(err.status).json(err.response);
      
    }

    }
}
