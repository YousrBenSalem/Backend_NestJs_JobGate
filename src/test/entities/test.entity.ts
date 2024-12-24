/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Test extends Document {
  @Prop()
  titre: string;
  @Prop()
  description: string;
  @Prop()
  scoreMinimum : number;
  @Prop()
  questions:string ;
}
export const TestSchema = SchemaFactory.createForClass(Test);
