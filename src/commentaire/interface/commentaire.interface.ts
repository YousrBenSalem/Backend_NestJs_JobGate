/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
export interface ICommentaire extends Document {
  readonly auteur :string ;
  readonly contenu :string ;
  readonly date :string ;
}