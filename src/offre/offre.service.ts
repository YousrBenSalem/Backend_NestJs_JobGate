/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOffreDto } from './dto/create-offre.dto';
import { UpdateOffreDto } from './dto/update-offre.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IOffre } from './interface/offre.interface';

@Injectable()
export class OffreService {
    constructor (
      @InjectModel('offre') private offreModel: Model<IOffre>
    ){}
  async createOffre(createOffreDto: CreateOffreDto): Promise<IOffre> {

    const newOffre = await new this.offreModel(createOffreDto);
    return newOffre.save()
  }

  async findAllOffres(): Promise<IOffre[]> {
    const offreData = await this.offreModel.find();
    if (!offreData || offreData.length == 0){
      throw new NotFoundException("offers data not found")
    }
    return offreData;
  }

  async findOfferById(offreId: string):Promise<IOffre> {
      const existingOffre = await this.offreModel.findById(offreId).exec();
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
  return deletedOffer
}
}
