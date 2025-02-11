/* eslint-disable prettier/prettier */
import { Types } from "mongoose";
import { IUser } from "src/user/interface/user.interface";

export interface IEvaluation {
     condidatId : string;

  rating: number;
  comment: string;
}

export interface IEntreprise extends IUser{
    logo:string ;
    readonly   description:string ;

    readonly   webSite:string ;

  readonly  secteur:string ;

  readonly  adresse:string ;
     readonly status:string ;
     evaluations :IEvaluation[];

   condidatId : Types.ObjectId[];

  readonly profilCondidatRecherchéId : Types.ObjectId[];
   offreId : Types.ObjectId[];

  
  readonly  item :string
}