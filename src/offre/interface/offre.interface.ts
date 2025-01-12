/* eslint-disable prettier/prettier */
import { Document, Types } from "mongoose";
export interface IOffre extends Document {
    readonly titre : string ;
    readonly description : string;
    readonly typeContrat : string ;
    readonly localisation: string ;
    readonly datePublication: string ;
    readonly statut: string ;
        readonly type: string ;
  readonly  category: string ;

    readonly commentaireId : Types.ObjectId[];
    readonly condidatId : Types.ObjectId[];
    readonly entrepriseId : Types.ObjectId;
    readonly adminId : Types.ObjectId;
       testId : Types.ObjectId;

    readonly responsibilities: string ;
    readonly  education: string ;
    readonly  experience: string ;
    readonly  otherBenifits: string ;
    readonly  salary: string ;
    readonly  gender: string ;
    readonly  applicationDeadline: string ;




}