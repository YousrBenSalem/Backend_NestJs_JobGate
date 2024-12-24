/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class CreateProfilCondidatDto {
  @IsString()
  readonly condidat : string ;
  readonly competences : string ;
  readonly experiences : string ;
}
