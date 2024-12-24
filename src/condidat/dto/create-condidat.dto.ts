/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateCondidatDto extends CreateUserDto {
  @IsString()
      readonly image : string ;
        @IsString()

    readonly prenom: string ;
      @IsString()

    readonly adresse : string ;
    @IsNumber()
    readonly telephone : number ;
        @IsNumber()

    readonly cin : number ;
      @IsString()

    readonly formation : string[];
      @IsString()

    readonly offresFavoris : string[];
      @IsString()

    readonly compétances:string ;
      @IsString()

    readonly cv: string ;
    readonly item : string ;
}
