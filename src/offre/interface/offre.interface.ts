/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
export interface IOffre extends Document {
    readonly titre : string ;
    readonly description : string;
    readonly typeContrat : string ;
    readonly localisation: string ;
    readonly datePublication: string ;
    readonly entreprise:string ;
    readonly statut: string ;
    readonly testAssocie:string ;
}