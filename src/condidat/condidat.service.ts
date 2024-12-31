/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCondidatDto } from './dto/create-condidat.dto';
import { UpdateCondidatDto } from './dto/update-condidat.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from "mongoose";
import { ICondidat } from './interface/condidat.interface';
import { IEntreprise } from 'src/entreprise/interface/entreprise.interface';
import * as argon2 from "argon2";


@Injectable()
export class CondidatService {
    constructor (
      @InjectModel('user') private condidatModel: Model<ICondidat>,
      @InjectModel('user') private entrepriseModel: Model<IEntreprise>

    ){}

        hashData(data: string) {
    return argon2.hash(data);
  }
  async createCondidat(createCondidatDto: CreateCondidatDto):Promise<ICondidat> {
     const hashedPassword = await this.hashData(createCondidatDto.password);
    const newCondidat = new this.condidatModel({...createCondidatDto , item :"condidat", password:hashedPassword, });
    const savedCondidat =  await newCondidat.save() as ICondidat;
    const entreprise = await this.entrepriseModel.findById(createCondidatDto.entrepriseId)
    if(entreprise){
      entreprise.condidatId.push(savedCondidat._id as mongoose.Types.ObjectId)
      const savedEntreprise = await entreprise.save()
      console.log(savedEntreprise)
    }else {
      console.log("entreprise not found")
    }
    return savedCondidat ;
  }

  async getAllCondidats() : Promise<ICondidat[]> {
    const condidatData = await  this.condidatModel.find({item:"condidat"});
    if(!condidatData || condidatData.length ==0){
      throw new NotFoundException("condidats data not found")
    }
    return condidatData;
  }

  async getCondidatById(condidatId: string):Promise<ICondidat> {
    const existingCondidat = await this.condidatModel.findById(condidatId).exec();
    if(!existingCondidat){
      throw new NotFoundException("condidat not found");
    }
    return existingCondidat;
    
  }

  async updateCondidat(condidatId: string, updateCondidatDto: UpdateCondidatDto):Promise <ICondidat> {
    const existingCondidat = await this.condidatModel.findByIdAndUpdate(condidatId , updateCondidatDto , {new : true})
      if(!existingCondidat){
      throw new  NotFoundException (`condidat #${condidatId} not found`);
    }
    return existingCondidat
  }

  async removeCondidat(condidatId: string) {
    const deletedCondidat = await this.condidatModel.findByIdAndDelete(condidatId).exec();
    if(!deletedCondidat){
      throw new NotFoundException(`condidat #${condidatId} not found`);
    }
    const entreprise = await this.entrepriseModel.findById(deletedCondidat.entrepriseId)
    if (entreprise){
      entreprise.condidatId = entreprise.condidatId.filter(condId => condId.toString() !==condidatId)
      await entreprise.save()
    }else {
      console.log("entreprise not found")
    }
    return deletedCondidat ;
  }
}
