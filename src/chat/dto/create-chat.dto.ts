/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";


export class CreateChatDto {
  @IsString()
    @IsNotEmpty()
    readonly sender: string ;
    @IsString()
    @IsNotEmpty()
    readonly receiver : string ;
    @IsString()
    @IsNotEmpty()
    readonly content : string ;
    
}
