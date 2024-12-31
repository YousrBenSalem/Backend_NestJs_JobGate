/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireDto } from './dto/update-commentaire.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from "mongoose";
import { ICommentaire } from './interface/commentaire.interface';
import { ICondidat } from 'src/condidat/interface/condidat.interface';
import { IEntreprise } from 'src/entreprise/interface/entreprise.interface';

@Injectable()
export class CommentaireService {
  constructor(
    @InjectModel('commentaire') private commentaireModel : Model<ICommentaire>,
    @InjectModel('user') private condidatModel : Model<ICondidat>,
    @InjectModel('user') private entrepriseModel : Model<IEntreprise>,

    

  ){}

  async createCommentaire(createCommentaireDto: CreateCommentaireDto) : Promise<ICommentaire> {
    const newCommentaire = await new this.commentaireModel(createCommentaireDto)
    const savedCommentaire = await newCommentaire.save() as ICommentaire  ;
    const condidat = await this.condidatModel.findById(createCommentaireDto.condidatId);
    if(condidat){
      condidat.commentaireId.push(savedCommentaire._id as mongoose.Types.ObjectId);
      const savedCondidat = await condidat.save();
            console.log(savedCondidat)

    }else {
      console.log("condidat not found")
    }

      const entreprise = await this.entrepriseModel.findById(createCommentaireDto.entrepriseId);
    if(entreprise){
      entreprise.commentaireId.push(savedCommentaire._id as mongoose.Types.ObjectId);
      const savedEntreprise = await entreprise.save();
            console.log(savedEntreprise)

    }else {
      console.log("entreprise not found")
    }
    return savedCommentaire ;
  }

  async getAllCommentaires(): Promise<ICommentaire[]> {
  const commentaireData = await this.commentaireModel.find();
    if(!commentaireData || commentaireData.length == 0){
      throw new NotFoundException("commentaires data not found")
    }
    return commentaireData;
  }

  async getCommentaireByID(commentaireId: string):Promise<ICommentaire> {
    const existingCommentaire = await this.commentaireModel.findById(commentaireId);
    if(!existingCommentaire){
      throw new NotFoundException(`commentaire #${commentaireId} not found`)
      }
      return existingCommentaire;
  }

  async updateCommentaire(commentaireId: string, updateCommentaireDto: UpdateCommentaireDto) {
    const updatedCommentaire = await this.commentaireModel.findByIdAndUpdate(commentaireId , updateCommentaireDto , {new:true})
    if(!updatedCommentaire){
      throw new NotFoundException (`Commentaire #${commentaireId} not found`)
    }
    return updatedCommentaire;

  }

  async removeCommentaire(commentaireId: string):Promise<ICommentaire> {
  const deletedCommentaire = await this.commentaireModel.findByIdAndDelete(commentaireId);
  if(!deletedCommentaire){
      throw new NotFoundException(`Commentaire #${commentaireId} not found`);
      }
      const condidat = await this.condidatModel.findById(deletedCommentaire.condidatId)
    if (condidat){
      condidat.commentaireId = condidat.commentaireId.filter(comId => comId.toString() !==commentaireId)
      await condidat.save()
    }else {
      console.log("condidat not found")
    }

      const entreprise = await this.entrepriseModel.findById(deletedCommentaire.entrepriseId)
    if (entreprise){
      entreprise.commentaireId = entreprise.commentaireId.filter(comId => comId.toString() !==commentaireId)
      await entreprise.save()
    }else {
      console.log("entreprise not found")
    }
      return deletedCommentaire;
  }
}
