/* eslint-disable prettier/prettier */
import { Document, Types } from "mongoose";
export interface IExperience extends Document{
  readonly poste: string ;
  readonly dateDeDebut : string ;
  readonly dateDeFin : string ;
  readonly description : string ;
  readonly profilCondidatId : Types.ObjectId;
  readonly   entrepriseId : Types.ObjectId;

}