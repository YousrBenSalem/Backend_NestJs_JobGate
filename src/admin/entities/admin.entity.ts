/* eslint-disable prettier/prettier */
import {   Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "src/user/entities/user.entity";

@Schema()
export class Admin extends User {

  item : string 
  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"offre"}]})
  offreId : Types.ObjectId[];
}
export const AdminSchema = SchemaFactory.createForClass(Admin);
