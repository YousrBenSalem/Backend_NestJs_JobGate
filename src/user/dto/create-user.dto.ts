/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateUserDto {
  @IsString()
    @IsNotEmpty()

    readonly name: string;
    @IsEmail()
      @IsNotEmpty()

    readonly email: string;
      @IsString()
  @IsNotEmpty()
   password: string;
   refreshToken: string ;
    code : string ;
    verify : boolean ;
  isOnline: boolean;

        commentaireId : Types.ObjectId[];
    


}
