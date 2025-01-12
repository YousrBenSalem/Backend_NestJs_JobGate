/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";
import { Types } from "mongoose";


export class CreateQuestionDto {
       readonly question: string;
  readonly  choix: string[];
  readonly  reponseCorrecte: string;
}
export class CreateTestDto {
  @IsString()
  readonly  titre: string;
  @IsString()
  readonly  description: string;
  @IsNumber()
  readonly  scoreMinimum : number;
  readonly  offreId : Types.ObjectId;
  readonly   question : CreateQuestionDto[];

}
