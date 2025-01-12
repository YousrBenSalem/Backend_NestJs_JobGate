/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "src/user/entities/user.entity";


@Schema()
export class Entreprise extends User {
    item :string

  @Prop()
  logo:string ;
  
  @Prop()
  description:string ;
  @Prop()
  webSite:string ;
  @Prop()
  secteur:string ;
  @Prop()
  adresse:string ;
  @Prop({default:"Pending"})
  status:string ;

  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}]})
  condidatId : Types.ObjectId[];

  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"profilCondidat"}]})
  profilCondidatRecherchéId : Types.ObjectId[];
  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"offre"}]})
  offreId : Types.ObjectId[];
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:"experience"})
  experienceId : Types.ObjectId;


}
export const EntrepriseSchema = SchemaFactory.createForClass(Entreprise)


