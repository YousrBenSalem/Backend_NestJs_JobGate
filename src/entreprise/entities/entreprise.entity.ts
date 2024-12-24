/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";


@Schema()
export class Entreprise extends User {
  @Prop()
  logo:string ;
  @Prop()
  secteur:string ;
  @Prop()
  offres:string ;
  @Prop()
  profilsRecherchés :string[];
  @Prop()
  adresse:string ;

  item :string

}
export const EntrepriseSchema = SchemaFactory.createForClass(Entreprise)


