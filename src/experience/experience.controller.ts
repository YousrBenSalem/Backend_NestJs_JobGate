/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  async createExperience(
    @Res() response ,
    @Body() createExperienceDto: CreateExperienceDto) {
    try {
      const newExperience = await this.experienceService.createExperience(createExperienceDto);
      return response.status(HttpStatus.CREATED).json({ message: 'Experience created successfully', newExperience });
      
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error creating experience'+err,})
    }
  }

  @Get()
  async findAllExperience(@Res() response) {
try {
      const experiences = await this.experienceService.findAllExperiences();
      return response.status(HttpStatus.OK).json({
        message: 'Experiences retrieved successfully',
        experiences
      });
  
} catch (err) {
    return response.status(err.status).json(err.response)

  
}  }

  @Get(':id')
  async findExperienceById(
    @Res() response ,
    @Param('id') experienceId: string) {
  try {
      const experience = await this.experienceService.findExperienceById(experienceId);
        return response.status(HttpStatus.OK).json({ message: 'Experience retrieved successfully', experience });
  } catch (err) {
    return response.status(HttpStatus.NOT_FOUND).json(err.Response);
    
  }
  }

  @Put(':id')
  async updateExperience(
    @Res() response ,
    @Param('id') experienceId: string, 
    @Body() updateExperienceDto: UpdateExperienceDto) {
    try {
      const updatedExperience = await this.experienceService.updateExperience(experienceId, updateExperienceDto);
      return response.status(HttpStatus.OK).json({ message: 'Experience updated successfully', updatedExperience });
    } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Error updating experience' + err });
      
    }
  }

  @Delete(':id')
  async removeExperience(
    @Res() response,
    @Param('id') experienceId: string) {
    try {
      const deletedExperience = await this.experienceService.removeExperience(experienceId);
      return response.status(HttpStatus.OK).json({ message: 'Experience deleted successfully', deletedExperience });
      
    } catch (err) {
      return response.status(err.status).json(err.response);
      
    }
  }
}
