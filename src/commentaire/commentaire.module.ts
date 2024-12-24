/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CommentaireController } from './commentaire.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentaireSchema } from './entities/commentaire.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name : 'commentaire',
        schema:CommentaireSchema
      }
    ])
  ],
  controllers: [CommentaireController],
  providers: [CommentaireService],
})
export class CommentaireModule {}
