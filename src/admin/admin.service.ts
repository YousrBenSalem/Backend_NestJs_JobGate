/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IAdmin } from './interface/admin.interface';
import { Model } from 'mongoose';
import * as argon2 from "argon2";
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';



@Injectable()
export class AdminService {
  constructor (
    @InjectModel('user') private adminModel: Model<IAdmin>,
      private mailerService : MailerService ,
  ){}
        hashData(data: string) {
    return argon2.hash(data);
  }

    async generateCode() : Promise <string> {
      return crypto.randomBytes(3).toString('hex').toUpperCase();
  
      }
  async createAdmin(createAdminDto: CreateAdminDto): Promise<IAdmin> {
    const hashedPassword = await this.hashData(createAdminDto.password);
    const code = await this.generateCode();
    const newAdmin = await new this.adminModel({...createAdminDto, item :"admin" , password:hashedPassword, code :code});

        const mailOptions = {
      from: '"Recrutement - Support" yousrbensalem@gmail.com',
      to: createAdminDto.email,
      subject: 'Vérification de votre adresse email - Admin',
     text: `Bonjour,

Nous sommes ravis de vous compter parmi les administrateurs de notre plateforme de recrutement. Pour finaliser votre inscription, veuillez vérifier votre adresse email.

Votre code de vérification est : ${code}

Ou cliquez sur le lien suivant pour vérifier votre email :
http://localhost:3000/user/verify/${code}

Merci,
L'équipe Recrutement`,
        html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #0aacc3;">Bienvenue sur notre plateforme, Admin !</h2>
      <p>Bonjour,</p>
       <p>Nous sommes ravis de vous compter parmi les administrateurs de notre plateforme. Pour finaliser votre inscription, veuillez vérifier votre adresse email en utilisant le code ci-dessous :</p>
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
    return newAdmin.save()
  }

  async getAllAdmins() : Promise<IAdmin[]> {
    const adminData = await this.adminModel.find({item:"admin"});
    if(!adminData || adminData.length == 0){
      throw new NotFoundException("admins data not found")
    }
    return adminData;
    
  }

  async getAdminById(adminId: string): Promise <IAdmin> {
    const existingAdmin = await this.adminModel.findById(adminId).exec();
    if (!existingAdmin) {
      throw new NotFoundException(`Admin #${adminId} not found`);
      }
      return existingAdmin;
    
  }

  async updateAdmin(adminId: string, updateAdminDto: UpdateAdminDto): Promise <IAdmin> {
    const existingAdmin = await this.adminModel.findByIdAndUpdate(adminId , updateAdminDto , {new : true});
    if(!existingAdmin){
      throw new  NotFoundException (`admin #${adminId} not found`);
    }
    return existingAdmin
  }

  async removeAdmin (adminId: string) : Promise<IAdmin> {
    const deletedAdmin = await this.adminModel.findByIdAndDelete(adminId).exec();
    if(!deletedAdmin){
      throw new NotFoundException(`Admin #${adminId} not found`);
      }
      return deletedAdmin;
    
  }
}
