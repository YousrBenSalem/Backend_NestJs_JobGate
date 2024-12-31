/* eslint-disable prettier/prettier */
import { Document, Types } from "mongoose";
export interface ICommentaire extends Document {
  readonly auteur :string ;
  readonly contenu :string ;
  readonly date :string ;
  readonly condidatId : Types.ObjectId;
  readonly entrepriseId : Types.ObjectId;
  readonly offreId : Types.ObjectId;


  
}