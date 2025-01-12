/* eslint-disable prettier/prettier */
import { Document, Types } from "mongoose";
export interface ICommentaire extends Document {
  readonly content :string ;
readonly userId : Types.ObjectId;

   readonly replies : Types.ObjectId [];
  readonly offreId : Types.ObjectId;
    parentCommentId? : Types.ObjectId;



  
}