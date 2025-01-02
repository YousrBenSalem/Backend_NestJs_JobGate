/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOffreDto } from './dto/create-offre.dto';
import { UpdateOffreDto } from './dto/update-offre.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IOffre } from './interface/offre.interface';
import { IEntreprise } from 'src/entreprise/interface/entreprise.interface';

@Injectable()
export class OffreService {
    constructor (
      @InjectModel('offre') private offreModel: Model<IOffre>,
      @InjectModel("user") private entrepriseModel:Model<IEntreprise>
    ){}
  async createOffre(createOffreDto: CreateOffreDto): Promise<IOffre> {

    const newOffre = await new this.offreModel(createOffreDto);
    const savedOffre = await newOffre.save() as IOffre;
    const entreprise = await this.entrepriseModel.findById(createOffreDto.entrepriseId);
    if(entreprise){
      entreprise.offreId.push(savedOffre._id as mongoose.Types.ObjectId)
      const savedEntreprise= await entreprise.save()
      console.log(savedEntreprise)
    }else{
      console.log("entreprise not found")
    }
    return savedOffre
  }

  async findAllOffres(): Promise<IOffre[]> {
    const offreData = await this.offreModel.find().populate("entrepriseId");
    if (!offreData || offreData.length == 0){
      throw new NotFoundException("offers data not found")
    }
    return offreData;
  }

  async findOfferById(offreId: string):Promise<IOffre> {
      const existingOffre = await this.offreModel.findById(offreId).populate("entrepriseId");
    if (!existingOffre) {
      throw new NotFoundException(`Offre #${offreId} not found`);
      }
      return existingOffre;
  }

  async updateOffer(offreId: string, updateOffreDto: UpdateOffreDto):Promise<IOffre> {
    const updatedOffer = await this.offreModel.findByIdAndUpdate(offreId , updateOffreDto , {new : true});
    if(!updatedOffer){
      throw new  NotFoundException (`offer #${offreId} not found`);
    }
    return updatedOffer
  }

  async removeOffer(offerId: string):Promise<IOffre> {
    const deletedOffer= await this.offreModel.findByIdAndDelete(offerId)
    if(!deletedOffer){
        throw new NotFoundException(`Offer #${offerId} not found`);  
  }
  const entreprise = await this.entrepriseModel.findById(deletedOffer.entrepriseId)
  if(entreprise){
    entreprise.offreId = entreprise.offreId.filter(offId => offId.toString() !== offerId)
}else{
  console.log("entreprise not found")
}
  return deletedOffer

}
}
