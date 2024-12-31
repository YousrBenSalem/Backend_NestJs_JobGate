/* eslint-disable prettier/prettier */
import { Types } from "mongoose";
import { IUser } from "src/user/interface/user.interface";

export interface IEntreprise extends IUser{
    logo:string ;
  readonly  secteur:string ;

  readonly  adresse:string ;

   condidatId : Types.ObjectId[];
   commentaireId : Types.ObjectId[];
  readonly profilCondidatRecherchéId : Types.ObjectId[];
  readonly offreId : Types.ObjectId[];

  
  readonly  item :string
}