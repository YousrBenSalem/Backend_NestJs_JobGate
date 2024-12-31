/* eslint-disable prettier/prettier */
import { Document, Types } from "mongoose";
export interface ITest extends Document {
  readonly  titre: string;
  readonly  description: string;
  readonly  scoreMinimum : number;
  readonly  offreId : Types.ObjectId[];
  readonly   questionId : Types.ObjectId[];

  
}