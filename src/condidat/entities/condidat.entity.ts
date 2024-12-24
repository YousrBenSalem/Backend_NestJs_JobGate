/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";
@Schema()
export class Condidat extends User {
  @Prop()
  image : string ;
  @Prop()
  prenom: string ;
  @Prop()
  adresse : string ;
  @Prop()
  telephone : number ;
  @Prop()
  cin : number ;
  @Prop()
  formation : string[];
  @Prop()
  offresFavoris : string[];
  @Prop()
  compétances:string ;
  @Prop()
  cv: string ;

  item : string ;
}
export const CondidatSchema = SchemaFactory.createForClass(Condidat);
