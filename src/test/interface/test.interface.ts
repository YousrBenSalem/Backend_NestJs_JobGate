/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
export interface ITest extends Document {
  readonly  titre: string;
  readonly  description: string;
  readonly  scoreMinimum : number;
  readonly  questions:string ;
}