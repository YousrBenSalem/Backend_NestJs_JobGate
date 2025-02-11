/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})
export class Chat extends Document {
  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  recipientId: string;

  @Prop({ required: true })
  content: string;


}

export const MessageSchema = SchemaFactory.createForClass(Chat);
