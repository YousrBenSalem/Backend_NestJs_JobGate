/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateExperienceDto {
  @IsString()
  @IsNotEmpty()
  readonly NomDeEntreprise: string ;
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
}
