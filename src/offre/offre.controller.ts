/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { OffreService } from './offre.service';
import { CreateOffreDto } from './dto/create-offre.dto';
import { UpdateOffreDto } from './dto/update-offre.dto';

@Controller('offre')
export class OffreController {
  constructor(private readonly offreService: OffreService) {}

  @Post()
  async createAdmin(
      @Res() response ,
      @Body() createOffreDto: CreateOffreDto) {
        try {
          const newOffre = await this.offreService.createOffre(createOffreDto); 
          return response.status(HttpStatus.CREATED).json({ message: 'Offre created successfully', newOffre });
          
        } catch (err) {
          return response.status(HttpStatus.BAD_REQUEST).json({
  
            message: 'Error creating offre'+err,
  
          })
          
        }
      
    }

  @Get()
  async findAllOffres(@Res() response) {
try {
  const offres = await this.offreService.findAllOffres();
  return response.status(HttpStatus.OK).json({
        message: 'Offers retrieved successfully',
        offres
      });

  
}  catch (err) {
      return response.status(err.status).json(err.response)
  
}  }

  @Get(':id')
  async findOfferById(
    @Res() response ,
    @Param('id') offreId: string) {
      try {
        const offre = await this.offreService.findOfferById(offreId);
        return response.status(HttpStatus.OK).json({ message: 'Offer retrieved successfully', offre });
        
      } catch (err) {
        return response.status(HttpStatus.NOT_FOUND).json(err.Response);
        
      }
  }

  @Put(':id')
  async updateOffer(
    @Res() response ,
    @Param('id') offerId: string, @Body() updateOffreDto: UpdateOffreDto) {
    try {
      const updatedOffer= await  this.offreService.updateOffer(offerId, updateOffreDto);
        return response.status(HttpStatus.OK).json({ message: 'Offer updated successfully', updatedOffer });

    } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Error updating offer' + err });
      
    }
  }

  @Delete(':id')
  async removeOffer(
    @Res() response ,
    @Param('id') offerId: string) {
    try {
      const deletedOffer = await this.offreService.removeOffer(offerId);
      return response.status(HttpStatus.OK).json({ message: 'Offer deleted successfully', deletedOffer });
      
    } catch (err) {
      return response.status(err.status).json(err.response);
      
    }
  }
}
