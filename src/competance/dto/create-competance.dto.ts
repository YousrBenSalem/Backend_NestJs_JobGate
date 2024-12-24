/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";

export class CreateCompetanceDto {
  @IsString()
  @IsNotEmpty()
    readonly   nom: string;
      @IsString()
    readonly  niveauRequis : string;
}
