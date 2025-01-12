/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";

@Schema()
export class Question extends Document {
  @Prop()
  question: string;
  @Prop()
  choix: string[];
  @Prop()
  reponseCorrecte: string;


}
export const QuestionSchema = SchemaFactory.createForClass(Question)
@Schema()
export class Test extends Document {
  @Prop()
  titre: string;
  @Prop()
  description: string;
  @Prop()
  scoreMinimum : number;
  @Prop({type:mongoose.Schema.Types.ObjectId, ref:"offre"})
  offreId : Types.ObjectId;
    @Prop({type:[QuestionSchema], default:[]})
    questions : Question[];
}
export const TestSchema = SchemaFactory.createForClass(Test);
