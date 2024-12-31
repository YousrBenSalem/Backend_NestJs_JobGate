/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITest } from './interface/test.interface';

@Injectable()
export class TestService {
  constructor (
      @InjectModel('test') private testModel: Model<ITest>
    ){}
  async createTest(createTestDto: CreateTestDto):Promise<ITest> {
    const newTest = await new this.testModel(createTestDto)
    return newTest.save()
  }

  async findAllTests() : Promise <ITest[]> {
    const testData = await this.testModel.find();
    if(!testData || testData.length == 0){
            throw new NotFoundException("Tests data not found")
      
    }
    return testData;
  }

  async findTestById(testId: string) : Promise <ITest> {
    
      const existingTest = await this.testModel.findById(testId).exec();
      if(!existingTest){
        throw new NotFoundException("Test not found")
      }
      return existingTest;
      
  
  }

  async updateTest(testId: string, updateTestDto: UpdateTestDto): Promise<ITest> {
    const updatedTest = await this.testModel.findByIdAndUpdate(testId , updateTestDto , {new :true});
    if(!updatedTest){
      throw new  NotFoundException (`Test #${testId} not found`);
    }
    return updatedTest 
  }

  async removeTest (testId: string) : Promise<ITest> {
    const deletedTest = await this.testModel.findByIdAndDelete(testId).exec();
    if(!deletedTest){
      throw new NotFoundException(`Test #${testId} not found`);
      }
      return deletedTest;
    
  }
}
