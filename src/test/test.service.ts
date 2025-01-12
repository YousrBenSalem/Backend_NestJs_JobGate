/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ITest } from './interface/test.interface';
import { IOffre } from 'src/offre/interface/offre.interface';

@Injectable()
export class TestService {
  constructor (
      @InjectModel('test') private testModel: Model<ITest>,
        @InjectModel('offre') private offerModel: Model<IOffre>
    ){}
  async createTest(createTestDto: CreateTestDto):Promise<ITest> {
    const newTest = await new this.testModel(createTestDto)
    const savedTest = await newTest.save() as ITest ;
    const offer = await this.offerModel.findById(createTestDto.offreId);
    if(offer){
      offer.testId =savedTest._id as mongoose.Types.ObjectId ;
       const savedOffer = await offer.save()
       console.log(savedOffer)
    }else {
          console.log("offer not found")
        }

    return savedTest
  }

  async findAllTests() : Promise <ITest[]> {
    const testData = await this.testModel.find().populate("offreId");
    if(!testData || testData.length == 0){
            throw new NotFoundException("Tests data not found")
      
    }
    return testData;
  }

  async findTestById(testId: string) : Promise <ITest> {
    
      const existingTest = await this.testModel.findById(testId).populate("offreId");
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

      const offer = await this.offerModel.findById(deletedTest.offreId)
      if(offer){
        offer.testId = null
         await offer.save()
        }else{
          console.log("offer not found")
        }

      return deletedTest;
    
  }
}
