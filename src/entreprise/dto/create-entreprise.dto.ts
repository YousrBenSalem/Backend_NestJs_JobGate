/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
import { Types } from "mongoose";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateEntrepriseDto extends CreateUserDto {
logo:string ;
  @IsString()

  readonly  secteur:string ;
  
  
    @IsString()

  readonly  adresse:string ;
  
  readonly  item :string
   condidatId : Types.ObjectId[];
    commentaireId : Types.ObjectId[];
  readonly profilCondidatRecherchéId : Types.ObjectId[];
  readonly offreId : Types.ObjectId[];
}
