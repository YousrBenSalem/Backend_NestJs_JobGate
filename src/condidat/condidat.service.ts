/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCondidatDto } from './dto/create-condidat.dto';
import { UpdateCondidatDto } from './dto/update-condidat.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from "mongoose";
import { ICondidat } from './interface/condidat.interface';
import { IEntreprise } from 'src/entreprise/interface/entreprise.interface';
import * as argon2 from "argon2";
import * as crypto from 'crypto';

import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class CondidatService {
    constructor (
      @InjectModel('user') private condidatModel: Model<ICondidat>,
      @InjectModel('user') private entrepriseModel: Model<IEntreprise>,
    private mailerService : MailerService ,

    ){}

        hashData(data: string) {
    return argon2.hash(data);
  }
    // fonction pour generate un code de verification d'email avec crypto
  async generateCode() : Promise <string> {
    return crypto.randomBytes(3).toString('hex').toUpperCase();

    }
  async createCondidat(createCondidatDto: CreateCondidatDto):Promise<ICondidat> {
     const hashedPassword = await this.hashData(createCondidatDto.password);
       const code = await this.generateCode();
    const newCondidat = new this.condidatModel({...createCondidatDto , item :"condidat", password:hashedPassword, code :code});
     // envoi du code de verification par email
    const mailOptions = {
      from: '"Recrutement - Support" yousrbensalem@gmail.com',
      to: createCondidatDto.email,
      subject: 'Vérification de votre adresse email - Candidat',
     text: `Bonjour,

Nous sommes ravis que vous ayez rejoint notre plateforme de recrutement. Pour finaliser votre inscription, veuillez vérifier votre adresse email.

Votre code de vérification est : ${code}

Ou cliquez sur le lien suivant pour vérifier votre email :
http://localhost:3000/user/verify/${code}

Merci,
L'équipe Recrutement`,
        html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #0aacc3;">Bienvenue sur notre plateforme, Candidat !</h2>
      <p>Bonjour,</p>
      <p>Nous sommes ravis que vous ayez rejoint notre plateforme. Pour finaliser votre inscription, veuillez vérifier votre adresse email en utilisant le code ci-dessous :</p>
      <p style="font-size: 1.2em; font-weight: bold; color: #0aacc3;">${code}</p>
      <p>Ou cliquez directement sur ce lien :</p>
      <p>
        <a 
          href="http://localhost:3000/user/verify/${code}" 
          style="text-decoration: none; color: #fff; background-color: #0aacc3; padding: 10px 20px; border-radius: 5px; display: inline-block;">
          Vérifier mon email
        </a>
      </p>
      <p>Si vous n'avez pas initié cette inscription, veuillez ignorer cet email.</p>
      <p>Merci,<br>L'équipe Recrutement</p>
    </div>
  `,
    };
    await this.mailerService.sendMail(mailOptions);

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
  async updateStatusAcceptable(
    condidatId: string
    ): Promise<ICondidat> {
  
        const existingCondidat = await this.condidatModel.findOneAndUpdate(
          {_id:condidatId,item:'condidat'} , {$set : {postulationStatus :"Acceptable"}}, { new: true },);
        if (!existingCondidat) {
          throw new NotFoundException(`condidat #${condidatId} not found`);
          }
          /* const updateCondidat = await existingCondidat.save() */
          return existingCondidat;
          
          }

    async updateStatusAcceptableReject(
    condidatId: string
    ): Promise<ICondidat> {
  
        const existingCondidat = await this.condidatModel.findOneAndUpdate(
          {_id:condidatId,item:'condidat'} , {$set : {postulationStatus :"Rejected"}}, { new: true },);
        if (!existingCondidat) {
          throw new NotFoundException(`condidat #${condidatId} not found`);
          }
          /* const updateCondidat = await existingCondidat.save() */
          return existingCondidat;
          
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
