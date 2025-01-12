/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";


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

   @Prop({ default: false })
  isOnline: boolean;

    @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"commentaire"}]})
    commentaireId : Types.ObjectId[];

}
export const UserSchema = SchemaFactory.createForClass(User);
