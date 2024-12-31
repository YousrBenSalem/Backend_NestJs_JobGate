/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async createTest(
    @Res() response ,
    @Body() createTestDto: CreateTestDto) {
    try {
      const newTest = await  this.testService.createTest(createTestDto);
      return response.status(HttpStatus.CREATED).json({ message: 'Test created successfully',  newTest})
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating test'+err,})
            
          }
  }

  @Get()
  async findAllTests(@Res() response) {
try {
  const tests = await this.testService.findAllTests();
  return response.status(HttpStatus.OK).json({ message: 'Tests retrieved successfully', tests })
} catch (err) {
      return response.status(err.status).json(err.response)
      
    } }

  @Get(':id')
  async findTestById(
    @Res() response ,
    @Param('id') testId: string) {
      try {
            const test = await  this.testService.findTestById(testId);
            return response.status(HttpStatus.OK).json({ message: 'Test retrieved successfully', test })
        
      } catch (err) {
        return response.status(HttpStatus.NOT_FOUND).json(err.Response);
        
      }  }

  @Put(':id')
  async updateTest(
    @Res() response , 
    @Param('id') testId: string, @Body() updateTestDto: UpdateTestDto) {
    try {
      const updatedTest = await this.testService.updateTest(testId , updateTestDto )
      return response.status(HttpStatus.OK).json({ message: 'Test updated successfully', updatedTest })
      
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Error updating test' + err });
      
    }
  }

  @Delete(':id')
  async removeTest(
    @Res() response ,
    @Param('id') testId: string) {
try {
      const deletedTest = await this.testService.removeTest(testId);
      return response.status(HttpStatus.OK).json({ message: 'Test deleted successfully', deletedTest })
  
} catch (err) {
    return response.status(err.status).json(err.response);
  
}  }
}
