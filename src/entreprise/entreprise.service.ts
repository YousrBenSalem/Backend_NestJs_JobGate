/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IEntreprise } from './interface/entreprise.interface';
import { Model } from 'mongoose';

@Injectable()
export class EntrepriseService {
  constructor(
    @InjectModel('user') private entrepriseModel: Model<IEntreprise>
  ){}
  async createEntreprise(createEntrepriseDto: CreateEntrepriseDto):Promise<IEntreprise> {
    const newEntreprise = await new this.entrepriseModel({...createEntrepriseDto , item :"entreprise"});
    return newEntreprise.save();
  }

  async getAllEntreprises() : Promise <IEntreprise[]> {
    const entrepriseData = await this.entrepriseModel.find({item: "entreprise"});
    if(!entrepriseData || entrepriseData.length == 0){
      throw new NotFoundException("entreprises data not found")
      
    }
    return entrepriseData;
  }

  async getEntrepriseById(entrepriseId: string):Promise<IEntreprise> {
    const existingEntreprise = await this.entrepriseModel.findById(entrepriseId).exec();
    if(!existingEntreprise){
      throw new NotFoundException("entreprise not found");
      }
      return existingEntreprise;
  }

  async updateEntreprise(entrepriseId: string, updateEntrepriseDto: UpdateEntrepriseDto) {
    const updatedEntreprise = await this.entrepriseModel.findByIdAndUpdate(entrepriseId , updateEntrepriseDto ,{new : true});
    if(!updatedEntreprise){
      throw new NotFoundException("entreprise not found");
      }
      return updatedEntreprise;
  }

  async removeEntreprise(entrepriseId: string) {
    const deletedEntreprise = await this.entrepriseModel.findByIdAndDelete(entrepriseId)
    if(!deletedEntreprise){
      throw new NotFoundException("entreprise not found");
      }
      return deletedEntreprise;
  }
}
