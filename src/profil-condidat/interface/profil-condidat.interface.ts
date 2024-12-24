/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
export interface IProfilCondidat extends Document {
  readonly condidat : string ;
  readonly competences : string ;
  readonly experiences : string ;
}