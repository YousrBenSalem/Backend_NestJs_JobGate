/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateCompetanceDto {
  @IsString()
  @IsNotEmpty()
    readonly   nom: string;
      @IsString()
    readonly  niveauRequis : string;
    readonly condidatId : Types.ObjectId[];
    readonly profilCondidatId : Types.ObjectId[];
}
