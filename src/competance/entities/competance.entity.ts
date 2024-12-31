/* eslint-disable prettier/prettier */
import {Prop , Schema , SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document, Types} from "mongoose";
@Schema()
export class Competance extends Document {
  @Prop()
  nom: string;

  @Prop()
  niveauRequis : string;

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"condidat"}]})
    condidatId : Types.ObjectId[];
    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"profilCondidat"}]})
    profilCondidatId : Types.ObjectId[];
}
export const CompetanceSchema = SchemaFactory.createForClass(Competance)
