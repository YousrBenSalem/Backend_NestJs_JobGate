/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompetanceDto } from './dto/create-competance.dto';
import { UpdateCompetanceDto } from './dto/update-competance.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose ,{ Model } from 'mongoose';
import { ICompetance } from './interface/competance.interface';
import { ICondidat } from 'src/condidat/interface/condidat.interface';

@Injectable()
export class CompetanceService {
  constructor(
    @InjectModel("competance") private competanceModel:Model<ICompetance>,
        @InjectModel("user") private condidatModel:Model<ICondidat>

  ){}
  async createCompetance(createCompetanceDto: CreateCompetanceDto): Promise<ICompetance> {
    const newCompetance = await new this.competanceModel(createCompetanceDto);
    const savedCompetance = await  newCompetance.save() as ICompetance;

    const condidat = await this.condidatModel.findById(createCompetanceDto.condidatId)
        if(condidat){
          condidat.competanceId.push(savedCompetance._id as mongoose.Types.ObjectId)
          const savedCondidat = await condidat.save()
          console.log(savedCondidat)
        }else {
          console.log("condidat not found")
        }

    return savedCompetance ;
  }

  async getAllSkills():Promise<ICompetance[]> {
    const skillsData= await this.competanceModel.find();
    if(!skillsData || skillsData.length == 0){
       throw new NotFoundException("skills data not found")
      
    }
    return skillsData;
  }

  async getSkillById(skillId: string):Promise<ICompetance> {
    const existingSkill = await this.competanceModel.findById(skillId);
    if(!existingSkill){
      throw new NotFoundException(`skill #${skillId} not found`)
      }
      return existingSkill;
  }

  async updateSkill(skillId: string, updateCompetanceDto: UpdateCompetanceDto): Promise<ICompetance> {
      const existingSkill = await this.competanceModel.findByIdAndUpdate(skillId , updateCompetanceDto , {new : true});
    if(!existingSkill){
      throw new  NotFoundException (`skill #${skillId} not found`);
    }
    return existingSkill
  }

  async removeSkill(skillId : string): Promise<ICompetance> {
    const deletedSkill = await this.competanceModel.findByIdAndDelete(skillId);
    if(!deletedSkill){
      throw new NotFoundException(`skill #${skillId} not found`)
      }

    const condidat = await this.condidatModel.findById(deletedSkill.condidatId)
    if (condidat){
      condidat.competanceId = condidat.competanceId .filter(compId => compId.toString() !==skillId)
      await condidat.save()
    }else {
      console.log("condidat not found")
  
  }
        return deletedSkill;

}
}