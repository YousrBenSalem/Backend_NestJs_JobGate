/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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
