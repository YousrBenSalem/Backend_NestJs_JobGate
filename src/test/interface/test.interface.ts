/* eslint-disable prettier/prettier */
import { Document, Types } from "mongoose";

export interface IQuestion {
  readonly question: string;
  readonly  choix: string[];
  readonly  reponseCorrecte: string;
}
export interface ITest extends Document {
  readonly  titre: string;
  readonly  description: string;
  readonly  scoreMinimum : number;
  readonly  offreId : Types.ObjectId;
  readonly   questions : IQuestion[];

  
}