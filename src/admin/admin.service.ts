/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IAdmin } from './interface/admin.interface';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor (
    @InjectModel('user') private adminModel: Model<IAdmin>
  ){}

  async createAdmin(createAdminDto: CreateAdminDto): Promise<IAdmin> {

    const newAdmin = await new this.adminModel({...createAdminDto, item :"admin"});
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
