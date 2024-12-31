/* eslint-disable prettier/prettier */
import {Prop , Schema , SchemaFactory} from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
@Schema()
export class ProfilCondidat extends Document {


  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}]})
  condidatId : Types.ObjectId[];
  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"competance"}]})
  competanceId : Types.ObjectId[];
  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"user"}]})
  entrepriseId : Types.ObjectId[];
  @Prop({type:[{type:mongoose.Schema.Types.ObjectId, ref:"experience"}]})
  experienceId : Types.ObjectId[];
}
export const ProfilCondidatSchema = SchemaFactory.createForClass(ProfilCondidat)
