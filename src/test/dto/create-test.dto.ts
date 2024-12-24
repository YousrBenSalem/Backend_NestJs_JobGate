/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";

export class CreateTestDto {
  @IsString()
  readonly  titre: string;
  @IsString()
  readonly  description: string;
  @IsNumber()
  readonly  scoreMinimum : number;
  @IsString()
  readonly  questions:string ;
}
