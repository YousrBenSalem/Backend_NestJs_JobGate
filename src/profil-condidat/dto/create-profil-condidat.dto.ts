/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateProfilCondidatDto {
  @IsString()
  readonly condidatId : Types.ObjectId[];
  readonly competanceId : Types.ObjectId[];
  readonly entrepriseId : Types.ObjectId[];
  readonly experienceId : Types.ObjectId[];
}
