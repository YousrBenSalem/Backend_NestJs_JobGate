/* eslint-disable prettier/prettier */
import { Document, Types } from "mongoose";
export interface IProfilCondidat extends Document {
  readonly  condidatId : Types.ObjectId[];
  readonly  competanceId : Types.ObjectId[];
  readonly entrepriseId : Types.ObjectId[];
  readonly experienceId : Types.ObjectId[];
}