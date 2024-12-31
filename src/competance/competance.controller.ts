/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { CompetanceService } from './competance.service';
import { CreateCompetanceDto } from './dto/create-competance.dto';
import { UpdateCompetanceDto } from './dto/update-competance.dto';

@Controller('competance')
export class CompetanceController {
  constructor(private readonly competanceService: CompetanceService) {}

  @Post()
async  createCompetance(
    @Res() response ,
    @Body() createCompetanceDto: CreateCompetanceDto) {
    try {
      const newAdmin = await this.competanceService.createCompetance(createCompetanceDto);
      return response.status(HttpStatus.CREATED).json({ message: 'Competance created successfully', newAdmin})
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({

          message: 'Error creating skill'+err,

        })
      
    }
  }

  @Get()
  async getAllSkills(@Res() response) {
  try {
      const skills = await this.competanceService.getAllSkills()
        return response.status(HttpStatus.OK).json({
          message: 'Skills retrieved successfully',
          skills
        });
  } catch (err) {
          return response.status(err.status).json(err.response)

    
  }

  }

  @Get(':id')
  async getSkillById(
    @Res() response ,
    @Param('id') skillId: string) {
    try {
      const skill = await this.competanceService.getSkillById(skillId);
      return response.status(HttpStatus.OK).json({
        message: 'Skill retrieved successfully',
        skill
        });
    } catch (err) {
      return response.status(HttpStatus.NOT_FOUND).json(err.Response);
      
    }
  }

  @Put(':id')
  async updateSkill(
    @Res() response ,
    @Param('id') skillId: string, 
    @Body() updateCompetanceDto: UpdateCompetanceDto) {
    try {
      const updatedSkill = await this.competanceService.updateSkill(skillId, updateCompetanceDto);
      return response.status(HttpStatus.OK).json({
        message: 'Skill updated successfully',
        updatedSkill
        });
    } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Error updating admin' + err });
      
    }
  }

  @Delete(':id')
  async removeDelete(
    @Res() response ,
    @Param('id') skillId: string) {
  try {
    const deletedSkill = await this.competanceService.removeSkill(skillId);
      return response.status(HttpStatus.OK).json({ message: 'Skill deleted successfully', deletedSkill });
    
  }  catch (err) {
      return response.status(err.status).json(err.response);
    
  }
  }
}
