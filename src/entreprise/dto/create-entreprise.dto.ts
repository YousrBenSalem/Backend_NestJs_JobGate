/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { Types } from "mongoose";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateEvaluationDto {
     condidatId : string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
export class CreateEntrepriseDto extends CreateUserDto {
logo:string ;
  @IsString()

  readonly  secteur:string ;
  @IsString()

  readonly   webSite:string ;

  @IsString()

  readonly  description:string ;

  
  
    @IsString()

  readonly  adresse:string ;
  
  readonly  item :string
   readonly status:string ;
   condidatId : Types.ObjectId[];
  
  readonly profilCondidatRecherchéId : Types.ObjectId[];
   offreId : Types.ObjectId[];

    evaluations: CreateEvaluationDto[];
}
