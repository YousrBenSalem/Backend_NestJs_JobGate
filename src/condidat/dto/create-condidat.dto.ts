/* eslint-disable prettier/prettier */
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
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
  /*     @IsString() */

    /* readonly offresFavoris : string[];
       */


     cv: string ;
    readonly   dateNaissance: string ;

    readonly  entrepriseId : Types.ObjectId[];
     commentaireId : Types.ObjectId[];
     competanceId : Types.ObjectId[];
    readonly  profilCondiatId : Types.ObjectId;
    readonly offreId : Types.ObjectId[];
    readonly item : string ;
}
