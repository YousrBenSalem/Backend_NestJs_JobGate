/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { CondidatService } from './condidat.service';
import { CreateCondidatDto } from './dto/create-condidat.dto';
import { UpdateCondidatDto } from './dto/update-condidat.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from "multer";

@Controller('condidat')
export class CondidatController {
  constructor(private readonly condidatService: CondidatService) {}

  @Post()
    @UseInterceptors(
      FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 }, 
        { name: 'cv', maxCount: 1 }, 
      ],{
          storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
              cb(null , `${new Date().getTime()}${extname(file.originalname)}`);
            }
          })
        }
      )
    )
  async createCondidat(
    @Res() response,
    @Body() createCondidatDto: CreateCondidatDto,
    @UploadedFiles() files:{image , cv}) {
try {
      console.log('Uploaded files:', files);

   createCondidatDto.image = files.image && files.image[0] ? files.image[0].filename : null;
    createCondidatDto.cv = files.cv && files.cv[0] ? files.cv[0].filename : null;
  const newCondidat = await this.condidatService.createCondidat(createCondidatDto);
  return response.status(HttpStatus.CREATED).json({ message: 'Condidat created successfully', newCondidat})
} catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({

          message: 'Error creating condidat'+err,

        })
  
}
  }

  @Get()
  async getCondidats(@Res() response) {
    try {
          const Condidats = await this.condidatService.getAllCondidats();
          return response.status(HttpStatus.OK).json({
            message: 'Condidats retrieved successfully', 
            Condidats });
    } catch (err) {
      return response.status(err.status).json(err.response)
      
      }
}

  @Get(':id')
  async getCondidatById(
    @Res() response ,
    @Param('id') condidatId: string) {
      try {
        const condidat = await this.condidatService.getCondidatById(condidatId);
        return response.status(HttpStatus.OK).json({ message: 'Condidat retrieved successfully', condidat})

        
      } catch (err) {
        return response.status(HttpStatus.NOT_FOUND).json(err.Response);
        
      }
      }

  @Put(':id')
    @UseInterceptors(
      FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 }, 
        { name: 'cv', maxCount: 1 }, 
      ],{
          storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
              cb(null , `${new Date().getTime()}${extname(file.originalname)}`);
            }
          })
        }
      )
    )
  async updateCondidat(
    @Res() response ,
    @Param('id') condidatId: string, @Body() updateCondidatDto: UpdateCondidatDto,
    @UploadedFiles() files:{image , cv}) {
  try {
    const newImage = files.image && files.image[0] ? files.image[0].filename : null ;
        if(!newImage){
      updateCondidatDto.image = updateCondidatDto.image;
      }else {
        updateCondidatDto.image = newImage ;
      } 

      const newCV =  files.cv && files.cv[0] ? files.cv[0].filename : null ;
        if(!newCV){
      updateCondidatDto.cv = updateCondidatDto.cv;
      }else {
        updateCondidatDto.cv = newCV ;
      } 
    const updatedCondidat = await this.condidatService.updateCondidat(condidatId, updateCondidatDto);
    return response.status(HttpStatus.OK).json({ message: 'Condidat updated successfully', updatedCondidat });

    
  } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Error updating condidat' + err });
    
  }
  }

  @Delete(':id')
  async remove(
    @Res() response ,
    @Param('id') condidatId: string) {
      try {
        const deletedCondidat = await this.condidatService.removeCondidat(condidatId);
        return response.status(HttpStatus.OK).json({ message: 'Condidat deleted successfully', deletedCondidat });
        
      } catch (err) {
        return response.status(err.status).json(err.response);
        
      }
  }
}
