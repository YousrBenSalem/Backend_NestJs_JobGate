/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentaireModule } from './commentaire/commentaire.module';
import { CompetanceModule } from './competance/competance.module';
import { ExperienceModule } from './experience/experience.module';
import { ProfilCondidatModule } from './profil-condidat/profil-condidat.module';
import { OffreModule } from './offre/offre.module';
import { TestModule } from './test/test.module';

import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { EntrepriseModule } from './entreprise/entreprise.module';
import { CondidatModule } from './condidat/condidat.module';
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017',{dbName:"JobGate"}),
    CommentaireModule,
    CompetanceModule,
    ExperienceModule,
    ProfilCondidatModule,
    OffreModule,
    TestModule,
    UserModule,
    AdminModule,
    EntrepriseModule,
    CondidatModule,
    ConfigModule.forRoot({isGlobal:true}),
    AuthModule,
    ChatModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
