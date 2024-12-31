/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";

@Schema()
export class Test extends Document {
  @Prop()
  titre: string;
  @Prop()
  description: string;
  @Prop()
  scoreMinimum : number;
  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"offre"}]})
  offreId : Types.ObjectId[];
  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"question"}]})
  questionId : Types.ObjectId[];
}
export const TestSchema = SchemaFactory.createForClass(Test);
