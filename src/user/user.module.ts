/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { AdminSchema } from 'src/admin/entities/admin.entity';
import { EntrepriseSchema } from 'src/entreprise/entities/entreprise.entity';
import { CondidatSchema } from 'src/condidat/entities/condidat.entity';
import { CommentaireSchema } from 'src/commentaire/entities/commentaire.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name:"user",
        schema:UserSchema,
          discriminators: [
          { name: "admin", schema: AdminSchema },
          { name: "entreprise", schema: EntrepriseSchema },
          { name: "condidat", schema: CondidatSchema },
        ],
        
      },
      {
        name:"commentaire",
        schema:CommentaireSchema
      }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports :[UserService],

})
export class UserModule {}
