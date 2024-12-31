/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IExperience } from './interface/experience.interface';

@Injectable()
export class ExperienceService {
  constructor (
    @InjectModel('experience') private experienceModel: Model<IExperience>
  ){}

  async createExperience(createExperienceDto: CreateExperienceDto):Promise<IExperience> {
    const newExperience = await new this.experienceModel(createExperienceDto)
    return newExperience.save()
  }

  async findAllExperiences():Promise<IExperience[]> {
    const experienceData= await this.experienceModel.find()
    if(!experienceData || experienceData.length == 0
    ){
            throw new NotFoundException("Experiences data not found")
      
    }
    return experienceData ;
  }

  async findExperienceById(experienceId: string):Promise<IExperience> {
    const existingExperience = await this.experienceModel.findById(experienceId);
    if (!existingExperience) {
      throw new NotFoundException(`Experience #${experienceId} not found`);
      }
      return existingExperience ;
  }

  async updateExperience(experienceId: string, updateExperienceDto: UpdateExperienceDto):Promise<IExperience> {
    const updatedExperience = await this.experienceModel.findByIdAndUpdate(experienceId, updateExperienceDto, {new : true});
    if (!updatedExperience) {
      throw new NotFoundException(`Experience #${experienceId} not found`);
    }
    return updatedExperience ;
  
  }

  async removeExperience(experienceId: string):Promise<IExperience> {
    const deletedExperience = await this.experienceModel.findByIdAndDelete(experienceId).exec();
    if(!deletedExperience){
      throw new NotFoundException(`Experience #${experienceId} not found`);
      }
      return deletedExperience;
  }
}
