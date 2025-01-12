/* eslint-disable prettier/prettier */
import { Types } from "mongoose";
import { IUser } from "src/user/interface/user.interface";
export interface IFormation {
    readonly diplome : string ;
    readonly ecole: string ;
    readonly dateDeDebut : string ;
    readonly dateDeFin : string ;
}

export interface ICompetance  {
  readonly   nom: string;
    readonly  niveauRequis : string;
  
}

export interface IExperience {
  readonly poste: string ;
  readonly dateDeDebut : string ;
  readonly dateDeFin : string ;
  readonly taches : string ;
  readonly   company:string ;

}

export interface ILanguages {
  readonly langue: string ;
  readonly niveauRequis : string ;

}
export interface ISociaux {
  readonly reseauSocial: string ;
  readonly link : string ;

}
export interface ICondidat extends IUser{
     image : string ;
    readonly prenom: string ;
    readonly adresse : string ;
    readonly telephone : number ;
    readonly cin : number ;
    readonly formation : IFormation[];

    readonly  job:string ;
    readonly  description :string;
    
    readonly  currentWorkplace:string;
    
    readonly  skills:ICompetance[]
    
    readonly  personalSkills:ICompetance[]
    
    readonly  languages:ILanguages[]
  
    readonly  sociaux:ISociaux[]
    readonly  experience : IExperience[];
/*     readonly offresFavoris : string[];
 */     cv: string ;
     readonly   dateNaissance: string ;
readonly postulationStatus:string;
    readonly item : string ;
    readonly  entrepriseId : Types.ObjectId[];
    competanceId : Types.ObjectId[];
    readonly profilCondiatId : Types.ObjectId;
    readonly offreId : Types.ObjectId[];

}