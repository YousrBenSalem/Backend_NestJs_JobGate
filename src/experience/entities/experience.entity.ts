/* eslint-disable prettier/prettier */
import {Prop , Schema , SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document, Types} from 'mongoose';
@Schema()
export class Experience extends Document {
  
  @Prop()
  poste: string ;
  @Prop()
  dateDeDebut : string ;
  @Prop()
  dateDeFin : string ;
  @Prop()
  description : string ;
  @Prop({type:mongoose.Schema.Types.ObjectId, ref:"profilCondidat"})
  profilCondidatId : Types.ObjectId;
  @Prop({type:mongoose.Schema.Types.ObjectId, ref:"user"})
  entrepriseId : Types.ObjectId;

  
}
export const ExperienceSchema = SchemaFactory.createForClass(Experience);
