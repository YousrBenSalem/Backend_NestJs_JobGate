/* eslint-disable prettier/prettier */
import { IUser } from "src/user/interface/user.interface";

export interface ICondidat extends IUser{
    readonly image : string ;
    readonly prenom: string ;
    readonly adresse : string ;
    readonly telephone : number ;
    readonly cin : number ;
    readonly formation : string[];
    readonly offresFavoris : string[];
    readonly compétances:string ;
    readonly cv: string ;
    readonly item : string ;
}