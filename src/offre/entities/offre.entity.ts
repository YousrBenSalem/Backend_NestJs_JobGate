/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
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
  entreprise:string ;
  @Prop()
  statut: string ;
  @Prop()
  testAssocie:string ;


}
export const OffreSchema = SchemaFactory.createForClass(Offre);
