/* eslint-disable prettier/prettier */
import { Document } from "mongoose";

export interface IQuestion extends Document{
  readonly question: string;
  readonly  choix: string[];
  readonly  reponseCorrecte: string;
}