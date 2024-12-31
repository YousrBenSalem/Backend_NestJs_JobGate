/* eslint-disable prettier/prettier */
import { Types } from "mongoose";
import { IUser } from "src/user/interface/user.interface";
export interface IFormation {
    readonly diplome : string ;
    readonly ecole: string ;
    readonly dateDeDebut : string ;
    readonly dateDeFin : string ;
}

export interface ICondidat extends IUser{
     image : string ;
    readonly prenom: string ;
    readonly adresse : string ;
    readonly telephone : number ;
    readonly cin : number ;
    readonly formation : IFormation[];
/*     readonly offresFavoris : string[];
 */     cv: string ;
     readonly   dateNaissance: string ;

    readonly item : string ;
    readonly  entrepriseId : Types.ObjectId[];
    commentaireId : Types.ObjectId[];
    competanceId : Types.ObjectId[];
    readonly profilCondiatId : Types.ObjectId;
    readonly offreId : Types.ObjectId[];

}