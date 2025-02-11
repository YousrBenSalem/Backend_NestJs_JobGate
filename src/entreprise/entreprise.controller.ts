/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EntrepriseService } from './entreprise.service';
import { CreateEntrepriseDto, CreateEvaluationDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from "path";
import { diskStorage } from "multer";


@Controller('entreprise')
export class EntrepriseController {
  constructor(private readonly entrepriseService: EntrepriseService) {}

  @Post()
  // add file
  @UseInterceptors(FileInterceptor("file", {
    storage:diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null , `${new Date().getTime()}${extname(file.originalname)}`)}
    })
  }))
  async createEntreprise(
    @Res() response ,
    @Body() createEntrepriseDto: CreateEntrepriseDto,
    @UploadedFile() file) {
    try {
      createEntrepriseDto.logo = file ? file.filename : null;

      const newEntreprise = await this.entrepriseService.createEntreprise(createEntrepriseDto);
      return response.status(HttpStatus.CREATED).json({ message: 'entreprise created successfully', newEntreprise });
    } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({

          message: 'Error creating entreprise'+err,

        })
      
    }
  }

  @Get()
  async getallEntreprises( @Res() response) {
    try {
      const entreprises = await this.entrepriseService.getAllEntreprises();
      return response.status(HttpStatus.OK).json({ message: 'entreprises retrieved successfully', entreprises });
      
    } catch (err) {
      return response.status(err.status).json(err.response)

      
    }
  }

    @Put("/updateStatus/:id")
  async UpdateStatus(
    @Res() response,
    @Param("id") entrepriseId: string,
  ){
    try {
      const existingEntreprise = await this.entrepriseService.updateStatus(
        entrepriseId,
      );
      return response.status(HttpStatus.OK).json({
        message: "Entreprise status has been successfully updated",
        existingEntreprise,
      });
      
    } catch (err) {
            return response.status(err.status).json({
              message: err.message,
              status :HttpStatus.BAD_REQUEST
            });

    }
  }

  @Get(':id')
  async getEntrepriseById(
    @Res() response,
    @Param('id') entrepriseId: string) {
    try {
      const entreprise = await this.entrepriseService.getEntrepriseById(entrepriseId);
      return response.status(HttpStatus.OK).json({ message: 'entreprise retrieved successfully', entreprise });

      
    } catch (err) {
        return response.status(HttpStatus.NOT_FOUND).json(err.Response);
      
    }
  }

  @Put(':id')
    @UseInterceptors(
    FileInterceptor(
      "file",{
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            cb(null , `${new Date().getTime()}${extname(file.originalname)}`);
          }
        })
      }
    )
  )
  async updateEntreprise(
    @Res() response ,
    @Param('id') entrepriseId: string, 
    @Body() updateEntrepriseDto: UpdateEntrepriseDto,
    @UploadedFile() file) {
    try {
      const newLogo = file ? file.filename : null  ;
        if(!newLogo){
      updateEntrepriseDto.logo = updateEntrepriseDto.logo ;
      }else {
        updateEntrepriseDto.logo = newLogo ;
      }

      const updatedEntreprise = await this.entrepriseService.updateEntreprise(entrepriseId ,updateEntrepriseDto );
      return response.status(HttpStatus.OK).json({ message: 'entreprise updated successfully', updatedEntreprise });
      
    } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Error updating entreprise' + err });
      
    }
  }

  @Delete(':id')
  async removeEntreprise(
    @Res() response ,
    @Param('id') entrepriseId: string) {
  try {
    const deletedEntreprise = await this.entrepriseService.removeEntreprise(entrepriseId);
    return response.status(HttpStatus.OK).json({ message: 'entreprise deleted successfully', deletedEntreprise });
    
  } catch (err) {
      return response.status(err.status).json(err.response);
    
  }
  }



  @Get(':id/evaluations')
  async getEvaluations(@Param('id') id: string,
  @Res() response ,) {


      try {
    const evaluations = await this.entrepriseService.getEvaluations(id);
    return response.status(HttpStatus.OK).json({ message: 'evaluations get successfully', evaluations });
    
  } catch (err) {
      return response.status(err.status).json(err.response);
    
  }
  
  }

  @Post(':id/evaluations')
  async addEvaluation(
    @Param('id') idCompany: string,
    @Body() createEvaluationDto: CreateEvaluationDto,
  ) {
    return this.entrepriseService.addEvaluation(
      idCompany,
      createEvaluationDto.condidatId,
      createEvaluationDto.rating,
      createEvaluationDto.comment,
    );
  }
}
