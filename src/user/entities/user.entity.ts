/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({ discriminatorKey: "item" })
export class User extends Document{
  @Prop({ required: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
  @Prop()
  refreshToken: string ;
  @Prop()
  code : string ;
  @Prop({default : false })
  verify : boolean ;

}
export const UserSchema = SchemaFactory.createForClass(User);
