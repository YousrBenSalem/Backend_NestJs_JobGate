/* eslint-disable prettier/prettier */
import { Types } from "mongoose";
import { IUser } from "src/user/interface/user.interface";

export interface IEntreprise extends IUser{
    logo:string ;
    readonly   description:string ;

    readonly   webSite:string ;

  readonly  secteur:string ;

  readonly  adresse:string ;
     readonly status:string ;

   condidatId : Types.ObjectId[];

  readonly profilCondidatRecherchéId : Types.ObjectId[];
   offreId : Types.ObjectId[];

  
  readonly  item :string
}