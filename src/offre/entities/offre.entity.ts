/* eslint-disable prettier/prettier */
import mongoose, { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Offre  extends Document{
  @Prop()
  titre : string ;
  @Prop()
  description : string;
  @Prop()
  typeContrat : string ;
  @Prop()
  localisation: string ;
  @Prop()
  datePublication: string ;
  @Prop()
  statut: string ;
  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"commentaire"}]})
  commentaireId : Types.ObjectId[];
  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}]})
  condidatId : Types.ObjectId[];
  @Prop({type:mongoose.Schema.Types.ObjectId, ref:"user"})
  entrepriseId : Types.ObjectId;
  @Prop({type:mongoose.Schema.Types.ObjectId, ref:"user"})
  adminId : Types.ObjectId;

  @Prop({type:mongoose.Schema.Types.ObjectId, ref:"test"})
  testId : Types.ObjectId;


}
export const OffreSchema = SchemaFactory.createForClass(Offre);
