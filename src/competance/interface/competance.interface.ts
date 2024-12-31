/* eslint-disable prettier/prettier */
import {Document, Types } from "mongoose";
export interface ICompetance extends Document {
  readonly   nom: string;
    readonly  niveauRequis : string;
    readonly condidatId : Types.ObjectId[];
    readonly profilCondidatId : Types.ObjectId[];
}