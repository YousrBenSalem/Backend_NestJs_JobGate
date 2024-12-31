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
    @Prop({types:[{type:mongoose.Schema.Types.ObjectId, ref:"test"}]})
    testId : Types.ObjectId[];

}
export const QuestionSchema = SchemaFactory.createForClass(Question)
