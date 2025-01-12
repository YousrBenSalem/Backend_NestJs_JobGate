/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireDto } from './dto/update-commentaire.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from "mongoose";
import { ICommentaire } from './interface/commentaire.interface';

import { IUser } from 'src/user/interface/user.interface';

@Injectable()
export class CommentaireService {
  constructor(
    @InjectModel('commentaire') private commentaireModel : Model<ICommentaire>,
    @InjectModel('user') private userModel : Model<IUser>,


    

  ){}

  async createCommentaire(createCommentaireDto: CreateCommentaireDto) : Promise<ICommentaire> {
    const newCommentaire = await new this.commentaireModel(createCommentaireDto)
    const savedCommentaire = await newCommentaire.save() as ICommentaire  ;
    const user = await this.userModel.findById(createCommentaireDto.userId);
    if(user){
      user.commentaireId.push(savedCommentaire._id as mongoose.Types.ObjectId);
      const savedCondidat = await user.save();
            console.log(savedCondidat)

    }else {
      console.log("user not found")
    }

    /*   const entreprise = await this.entrepriseModel.findById(createCommentaireDto.entrepriseId);
    if(entreprise){
      entreprise.commentaireId.push(savedCommentaire._id as mongoose.Types.ObjectId);
      const savedEntreprise = await entreprise.save();
            console.log(savedEntreprise)

    }else {
      console.log("entreprise not found")
    } */
    return savedCommentaire ;
  }

  async getCommentsByOffer(offerId: string): Promise<ICommentaire[]> {
    return this.commentaireModel.find({ offreId: offerId }).populate('userId').exec();
  }

   async addReplyToComment(commentId: string, replyDto: CreateCommentaireDto): Promise<ICommentaire> {
    const comment = await this.commentaireModel.findById(commentId);
    if (comment) {
      const reply = new this.commentaireModel(replyDto);
      await reply.save();
      comment.replies.push(reply._id as mongoose.Types.ObjectId);
      await comment.save();
      return reply;
    }
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
      const user = await this.userModel.findById(deletedCommentaire.userId)
    if (user){
      user.commentaireId = user.commentaireId.filter(comId => comId.toString() !==commentaireId)
      await user.save()
    }else {
      console.log("condidat not found")
    }

  
      return deletedCommentaire;
  }
}
