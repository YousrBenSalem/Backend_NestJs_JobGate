/* eslint-disable prettier/prettier */
import {Document } from "mongoose";
export interface ICompetance extends Document {
  readonly   nom: string;
    readonly  niveauRequis : string;
}