/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateExperienceDto {

  @IsString()
  @IsNotEmpty()
  readonly poste: string ;
  @IsString()
  @IsNotEmpty()
  readonly dateDeDebut : string ;
  @IsString()
  @IsNotEmpty()
  readonly dateDeFin : string ;
  @IsString()
  @IsNotEmpty()
  readonly description : string ;
  readonly profilCondidatId : Types.ObjectId;
  readonly   entrepriseId : Types.ObjectId;
}
