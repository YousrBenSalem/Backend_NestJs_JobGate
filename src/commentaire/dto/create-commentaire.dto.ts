/* eslint-disable prettier/prettier */
import { IsString , IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
export class CreateCommentaireDto  {
  @IsString()
  @IsNotEmpty()
  readonly auteur :string ;
    @IsString()
      @IsNotEmpty()
  readonly contenu :string ;
    @IsString()
      @IsNotEmpty()
  readonly date :string ;
  readonly condidatId : Types.ObjectId;
  readonly entrepriseId : Types.ObjectId;
  readonly offreId : Types.ObjectId;

}
