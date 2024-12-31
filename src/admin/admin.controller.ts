/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async createAdmin(
    @Res() response ,
    @Body() createAdminDto: CreateAdminDto) {
      try {
        const newAdmin = await this.adminService.createAdmin(createAdminDto); 
        return response.status(HttpStatus.CREATED).json({ message: 'Admin created successfully', newAdmin });
        
      } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({

          message: 'Error creating admin'+err,

        })
        
      }
    
  }

  @Get()
  async getAdmins(@Res() response) {
    try {
      const admins = await this.adminService.getAllAdmins();
      return response.status(HttpStatus.OK).json({
        message: 'Admins retrieved successfully',
        admins
      });
      
    } catch (err) {
      return response.status(err.status).json(err.response)
      
    }
  }

  @Get(':id')
  async getAdminById(
  @Res() response ,
    @Param('id') adminId: string) {
      try {
        const admin = await this.adminService.getAdminById(adminId);
        return response.status(HttpStatus.OK).json({ message: 'Admin retrieved successfully', admin });
        
      } catch (err) {
        return response.status(HttpStatus.NOT_FOUND).json(err.Response);
        
      }
  }

  @Put(':id')
  async updateAdmin (
    @Res() response ,
    @Param('id') adminId: string, @Body() updateAdminDto: UpdateAdminDto) {
      try {
        const updatedAdmin = await this.adminService.updateAdmin(adminId, updateAdminDto);
        return response.status(HttpStatus.OK).json({ message: 'Admin updated successfully', updatedAdmin });
      } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Error updating admin' + err });
        
      }
  
  }

  @Delete(':id')
  async removeAdmin(@Res() response ,
    @Param('id') adminId: string) {
    try {
      const deletedAdmin = await this.adminService.removeAdmin(adminId);
      return response.status(HttpStatus.OK).json({ message: 'Admin deleted successfully', deletedAdmin });
      
    } catch (err) {
      return response.status(err.status).json(err.response);
      
    }
  }
}
