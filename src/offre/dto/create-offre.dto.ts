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
  @IsNotEmpty()
  readonly statut: string ;
  readonly commentaireId : Types.ObjectId[];
  readonly condidatId : Types.ObjectId[];
  readonly entrepriseId : Types.ObjectId;
  readonly adminId : Types.ObjectId;
    readonly   testId : Types.ObjectId;
}
