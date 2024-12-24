/* eslint-disable prettier/prettier */
import { IsString , IsNotEmpty } from "class-validator";
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
}
