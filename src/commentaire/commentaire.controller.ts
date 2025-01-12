/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireDto } from './dto/update-commentaire.dto';
import { CommentsGateway } from './commentaire.gateway';

@Controller('commentaire')
export class CommentaireController {
  constructor(private readonly commentaireService: CommentaireService ,
  private readonly CommentaireGateway: CommentsGateway,

  ) {}

  @Post()
  async createCommentaire(
    @Res() response , 
    @Body() createCommentaireDto: CreateCommentaireDto) {
    try {
      const newCommentaire= await this.commentaireService.createCommentaire(createCommentaireDto);
          this.CommentaireGateway.notifyNewComment(newCommentaire);

      

      return response.status(201).json({ message: 'Commentaire created successfully', newCommentaire})
    } catch (err) {
        return response.status(err.status).json(err.response);
      
    }
  }

  @Post(":id/reply")
    async replyToComment(@Param('id') id: string, @Body() createCommentaireDto: CreateCommentaireDto,     @Res() response , 
) {
      try {
          const replyCommentaire = await this.commentaireService.addReplyToComment(id, createCommentaireDto);

              return response.status(201).json({ message: 'reply created successfully', replyCommentaire})
        
      } catch (error) {
              return response.status(error.status).json(error.response);
        
      }
  
  }


  @Get('offer/:offerId')
    async getCommentsByOffer(@Param('offerId') offerId: string, @Res() response , 
) {
      try {
          const commentByoffer = await this.commentaireService.getCommentsByOffer(offerId);;

              return response.status(201).json({ message: 'commentByoffer récupéré successfully', commentByoffer})
        
      } catch (error) {
              return response.status(error.status).json(error.response);
        
      }
  
  }



  @Get()
  async getAllCommentaires(@Res() response) {
try {
      const commentaires = await this.commentaireService.getAllCommentaires();
      return response.status(HttpStatus.OK).json({ message: 'Commentaires retrieved successfully', commentaires });

  
} catch (err) {
        return response.status(err.status).json(err.response)

  
}  }

  @Get(':id')
  async getCommentaireById(
    @Res() response ,
    @Param('id') commentaireId: string) {
try {
      const commentaire = await this.commentaireService.getCommentaireByID(commentaireId) ;
      return response.status(HttpStatus.OK).json({ message: 'Commentaire retrieved successfully', commentaire });
  
} catch (err) {
    return response.status(HttpStatus.NOT_FOUND).json(err.Response);
  
}  }

  @Put(':id')
  async updateCommentaire(
    @Res() response ,
    @Param('id') commentaireId: string,
     @Body() updateCommentaireDto: UpdateCommentaireDto) {
    try {
      const updatedCommentaire = await this.commentaireService.updateCommentaire(commentaireId, updateCommentaireDto);
      return response.status(HttpStatus.OK).json({ message: 'Commentaire updated successfully', updatedCommentaire})

    } catch (err) {
        return response.status(HttpStatus.BAD_REQUEST).json({ message: 'Error updating commentaire' + err });
      
    }
  }

  @Delete(':id')
  async removeCommentaire(
    @Res() response ,
    @Param('id') commentaireId: string) {
    try {
      const deletedCommentaire = await this.commentaireService.removeCommentaire(commentaireId);
      return response.status(HttpStatus.OK).json({ message: 'Commentaire deleted successfully', deletedCommentaire})

    } catch (err) {
        return response.status(err.status).json(err.response);
      
    }
  }
}
