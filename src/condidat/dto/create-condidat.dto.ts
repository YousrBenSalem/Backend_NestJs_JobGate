/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import {  IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateFormationDto {
  @IsString()
  readonly diplome: string;
  @IsString()
readonly  ecole: string;
    @IsString()
  readonly dateDeDebut: string;
  @IsString()
readonly   dateDeFin: string;

}

export class CreateCompetanceDto {
  @IsString()
    readonly   nom: string;
      @IsString()
    readonly  niveauRequis : string;
  
}

export class CreateLangueDto {
  @IsString()
    readonly   langue: string;
      @IsString()
    readonly  niveauRequis : string;
  
}

export class CreateSociauxDto {
  @IsString()
    readonly   reseauSocial: string;
      @IsString()
    readonly  link : string;
  
}

export class CreateExperienceDto {

  @IsString()
  readonly poste: string ;
  @IsString()

  readonly dateDeDebut : string ;
  @IsString()
  readonly dateDeFin : string ;
  @IsString()
  readonly taches : string ;
  @IsString()

  readonly  company:string ;


}
export class CreateCondidatDto extends CreateUserDto {
       image : string ;
        @IsString()

    readonly prenom: string ;
      @IsString()

    readonly adresse : string ;
    @IsNumber()
    @Type(()=>Number)
    readonly telephone : number ;
    @IsNumber()
    @Type(()=>Number)

    readonly cin : number ;

    readonly formation : CreateFormationDto[];
    postulationStatus:string;



    readonly  job:string ;
        readonly  description :string;
        
        readonly  currentWorkplace:string;
        
        readonly  skills:CreateCompetanceDto[]
        
        readonly  personalSkills:CreateCompetanceDto[]
        
        readonly  languages:CreateLangueDto[]
      
        readonly  sociaux:CreateSociauxDto[]
        readonly  experience : CreateExperienceDto[];

  /*     @IsString() */

    /* readonly offresFavoris : string[];
       */


     cv: string ;
    readonly   dateNaissance: string ;

    readonly  entrepriseId : Types.ObjectId[];
     competanceId : Types.ObjectId[];
    readonly  profilCondiatId : Types.ObjectId;
    readonly offreId : Types.ObjectId[];
    readonly item : string ;
}
