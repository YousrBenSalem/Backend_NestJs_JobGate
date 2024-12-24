/* eslint-disable prettier/prettier */
import {Prop , Schema , SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
@Schema()
export class Competance extends Document {
  @Prop()
  nom: string;

  @Prop()
  niveauRequis : string;
}
export const CompetanceSchema = SchemaFactory.createForClass(Competance)
