/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";

export class CreateOffreDto {
  @IsString()
  @IsNotEmpty()
      readonly titre : string ;
        @IsString()
  @IsNotEmpty()
    readonly description : string;
      @IsString()
  @IsNotEmpty()
    readonly typeContrat : string ;
      @IsString()
  @IsNotEmpty()
    readonly localisation: string ;
      @IsString()
  @IsNotEmpty()
    readonly datePublication: string ;
      @IsString()
  @IsNotEmpty()
    readonly entreprise:string ;
      @IsString()
  @IsNotEmpty()
    readonly statut: string ;
      @IsString()
  @IsNotEmpty()
    readonly testAssocie:string ;
}
