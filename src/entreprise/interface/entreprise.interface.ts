/* eslint-disable prettier/prettier */
import { IUser } from "src/user/interface/user.interface";

export interface IEntreprise extends IUser{
  readonly  logo:string ;
  readonly  secteur:string ;
  readonly  offres:string ;
  readonly  profilsRecherchés :string[];
  readonly  adresse:string ;
  
  readonly  item :string
}