/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOffreDto } from './dto/create-offre.dto';
import { UpdateOffreDto } from './dto/update-offre.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IOffre } from './interface/offre.interface';
import { IEntreprise } from 'src/entreprise/interface/entreprise.interface';
import { ICondidat } from 'src/condidat/interface/condidat.interface';

@Injectable()
export class OffreService {
    constructor (
      @InjectModel('offre') private offreModel: Model<IOffre>,
      @InjectModel("user") private entrepriseModel:Model<IEntreprise>,
      @InjectModel("user") private condidatModel:Model<ICondidat>

    ){}
  async createOffre(createOffreDto: CreateOffreDto): Promise<IOffre> {

    const newOffre = await new this.offreModel(createOffreDto);
    const savedOffre = await newOffre.save() as IOffre;

    // association avec entreprise 
    const entreprise = await this.entrepriseModel.findById(createOffreDto.entrepriseId);
    if(entreprise){
      entreprise.offreId.push(savedOffre._id as mongoose.Types.ObjectId)
      const savedEntreprise= await entreprise.save()
      console.log(savedEntreprise)
    }else{
      console.log("entreprise not found")
    }

/*     // association avec condidat
         const condidat = await this.condidatModel.findById(createOffreDto.condidatId);
           if(condidat){
      condidat.offreId.push(savedOffre._id as mongoose.Types.ObjectId)
      const savedCondidat= await condidat.save()
      console.log(savedCondidat)
    }else{
      console.log("condidat not found")
    } */


    return savedOffre
  }

  async postuler (offreId:string , condidatId : string):Promise<IOffre>{
       const offre = await this.offreModel.findById(offreId);
    if (!offre) {
      throw new NotFoundException('Offre non trouvée');
    }
      const condidat = await this.condidatModel.findById(condidatId);
    if (!condidat) {
      throw new NotFoundException('Condidat non trouvé');
    }
        if (!offre.condidatId.includes(condidat._id as mongoose.Types.ObjectId)) {
      offre.condidatId.push(condidat._id as mongoose.Types.ObjectId);
      await offre.save();
    }
     if (!condidat.offreId.includes(offre._id as mongoose.Types.ObjectId)) {
      condidat.offreId.push(offre._id as mongoose.Types.ObjectId);
      await condidat.save();
    }

      return  offre;

  }

  

  async findAllOffres(): Promise<IOffre[]> {
    const offreData = await this.offreModel.find().populate("entrepriseId").populate("condidatId");
    if (!offreData || offreData.length == 0){
      throw new NotFoundException("offers data not found")
    }
    return offreData;
  }

  async updateStatus(
    offreId: string,
    ): Promise<IOffre> {
        const existingOffre = await this.offreModel.findOneAndUpdate(
          {_id:offreId} , {$set : {status :"Acceptable"}}, { new: true },);
        if (!existingOffre) {
          throw new NotFoundException(`Offre #${offreId} not found`);
          }
          const updateOffre = await existingOffre.save()
          return updateOffre;
          
          }
  async findOfferById(offreId: string):Promise<IOffre> {
      const existingOffre = await this.offreModel.findById(offreId).populate("entrepriseId").populate("condidatId");
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
          await entreprise.save()

    
}else{
  console.log("entreprise not found")
}
  return deletedOffer

}
}
