/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateOffreDto {
  @IsString()
  @IsNotEmpty()
  readonly titre : string ;
  @IsString()
  @IsNotEmpty()
  readonly description : string;
  @IsString()
  @IsNotEmpty()
  readonly typeContrat : string ;
  @IsString()
  @IsNotEmpty()
  readonly localisation: string ;
  @IsString()
  @IsNotEmpty()
  readonly datePublication: string ;
  @IsString()
  readonly statut: string ;
    @IsString()
  readonly type: string ;
  readonly commentaireId : Types.ObjectId[];
  readonly condidatId : Types.ObjectId[];
  readonly entrepriseId : Types.ObjectId;
  readonly adminId : Types.ObjectId;
    readonly   testId : Types.ObjectId;

     readonly responsibilities: string ;
    readonly  education: string ;
    readonly  experience: string ;
    readonly  otherBenifits: string ;
    readonly  salary: string ;
    readonly  gender: string ;
    readonly  applicationDeadline: string ;
}
