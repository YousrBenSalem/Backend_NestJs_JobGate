/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
export interface IExperience extends Document{
  readonly NomDeEntreprise: string ;
  readonly poste: string ;
  readonly dateDeDebut : string ;
  readonly dateDeFin : string ;
  readonly description : string ;
}