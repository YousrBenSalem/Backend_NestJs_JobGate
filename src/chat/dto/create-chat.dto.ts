/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";


export class CreateChatDto {
  @IsString()
    @IsNotEmpty()
    readonly senderId: string ;
    @IsString()
    @IsNotEmpty()
    readonly recipientId : string ;
    @IsString()
    @IsNotEmpty()
    readonly content : string ;
    
}
