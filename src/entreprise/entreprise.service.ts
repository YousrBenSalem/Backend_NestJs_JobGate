/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IEntreprise , IEvaluation } from './interface/entreprise.interface';

import { Model } from 'mongoose';
import * as argon2 from "argon2";
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer'; 



@Injectable()
export class EntrepriseService {
  constructor(
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
  async createEntreprise(createEntrepriseDto: CreateEntrepriseDto):Promise<IEntreprise> {
    const hashedPassword = await this.hashData(createEntrepriseDto.password);
      const code = await this.generateCode();
    const newEntreprise = await new this.entrepriseModel({...createEntrepriseDto , item :"entreprise", password:hashedPassword, code :code});
     // envoi du code de verification par email
const mailOptions = {
  from: '"Recrutement - Support" <yousrbensalem@gmail.com>',
  to: createEntrepriseDto.email,
  subject: 'Vérification de votre adresse email - Entreprise',
  text: `Bonjour,

Merci de vous être inscrit sur notre plateforme de recrutement. Pour activer votre compte entreprise, veuillez vérifier votre adresse email.

Votre code de vérification est : ${code}

Ou cliquez sur le lien suivant pour vérifier votre email :
http://localhost:3000/enterprise/verify/${code}

Nous sommes impatients de vous aider à trouver les talents idéaux pour votre entreprise.

Merci,
L'équipe Recrutement`,

  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #0aacc3;">Bienvenue sur notre plateforme, Entreprise !</h2>
      <p>Bonjour,</p>
      <p>Merci de vous être inscrit sur notre plateforme. Pour activer votre compte entreprise, veuillez vérifier votre adresse email en utilisant le code ci-dessous :</p>
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
      <p>Nous sommes impatients de vous aider à trouver les talents idéaux pour votre entreprise.</p>
      <p>Merci,<br>L'équipe Recrutement</p>
    </div>
  `,
};

      await this.mailerService.sendMail(mailOptions);
    return newEntreprise.save();
  }

  async getAllEntreprises() : Promise <IEntreprise[]> {
    const entrepriseData = await this.entrepriseModel.find({item: "entreprise"}).populate("offreId");
    if(!entrepriseData || entrepriseData.length == 0){
      throw new NotFoundException("entreprises data not found")
      
    }
    return entrepriseData;
  }

  async getEntrepriseById(entrepriseId: string):Promise<IEntreprise> {
    const existingEntreprise = await this.entrepriseModel.findById(entrepriseId).populate("offreId");
    if(!existingEntreprise){
      throw new NotFoundException("entreprise not found");
      }
      return existingEntreprise;
  }

  async updateEntreprise(entrepriseId: string, updateEntrepriseDto: UpdateEntrepriseDto): Promise<IEntreprise> {
    const updatedEntreprise = await this.entrepriseModel.findOneAndUpdate(  {_id:entrepriseId,item:'entreprise'} , updateEntrepriseDto ,{new : true});
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

    // function to update status of entreprise 
  async updateStatus(
    entrepriseId: string,
    ): Promise<IEntreprise> {
    /*   const existingEntreprise = await this.EntrepriseModel.findById(
        {_id:entrepriseId,item:'entreprise'},
        {status},
        { new: true },
        ); */
        /*   const existingEntreprise = await this.EntrepriseModel.findById(
        entrepriseId); */
        const existingEntreprise = await this.entrepriseModel.findOneAndUpdate(
          {_id:entrepriseId,item:'entreprise'} , {$set : {status :"Acceptable"}}, { new: true },);
        if (!existingEntreprise) {
          throw new NotFoundException(`Entreprise #${entrepriseId} not found`);
          }
          const updateEntreprise = await existingEntreprise.save()
          return updateEntreprise;
          
          }

async addEvaluation(
    companyId: string,
    condidatId:string,
    rating: number,
    comment: string,
  ): Promise<IEntreprise> {
    const company = await this.entrepriseModel.findById(companyId);
    company.evaluations.push({
      condidatId,
      rating,
      comment,
    });
    return company.save();
  }

    async getEvaluations(companyId: string): Promise<IEvaluation[]> {
    const company = await this.entrepriseModel.findById(companyId);
    return company.evaluations;
  }
}
