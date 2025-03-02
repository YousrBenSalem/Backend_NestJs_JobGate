/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CommentaireController } from './commentaire.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentaireSchema } from './entities/commentaire.entity';
import { UserSchema } from 'src/user/entities/user.entity';
import { CommentsGateway } from './commentaire.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name : 'commentaire',
        schema:CommentaireSchema
      },
      {
        name : 'user',
        schema:UserSchema
      }
    ])
  ],
  controllers: [CommentaireController],
  providers: [CommentaireService , CommentsGateway],
})
export class CommentaireModule {}
