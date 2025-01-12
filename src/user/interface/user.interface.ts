/* eslint-disable prettier/prettier */
import { Document, Types } from "mongoose";

export interface IUser extends Document{
    readonly name: string;
    readonly email: string;
    password: string;
    refreshToken: string ;
    code : string ;
    verify : boolean ;

    commentaireId : Types.ObjectId[];
      isOnline: boolean;

        




}