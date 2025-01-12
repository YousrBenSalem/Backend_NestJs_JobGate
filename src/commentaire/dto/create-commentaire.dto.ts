/* eslint-disable prettier/prettier */
import { IsString , IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
export class CreateCommentaireDto  {

    @IsString()
      @IsNotEmpty()
  readonly content :string ;
  readonly userId : Types.ObjectId;

  readonly replies : Types.ObjectId[];
  readonly offreId : Types.ObjectId;

    parentCommentId? : Types.ObjectId;


}
