/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateEntrepriseDto extends CreateUserDto {
  @IsString()
    readonly  logo:string ;
      @IsString()

  readonly  secteur:string ;
    @IsString()

  readonly  offres:string ;
    @IsString()

  readonly  profilsRecherchés :string[];
    @IsString()

  readonly  adresse:string ;
    @IsString()

  
  readonly  item :string
}
