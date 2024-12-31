/* eslint-disable prettier/prettier */
import {Prop , Schema , SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document, Types} from "mongoose";
@Schema()
export class Commentaire  extends Document{
  @Prop()
  auteur : string ;

  @Prop()
  contenu : string ;

  @Prop()
  date : string ;
  @Prop({type : mongoose.Schema.Types.ObjectId , ref:'user'})
  condidatId : Types.ObjectId;
    @Prop({type : mongoose.Schema.Types.ObjectId , ref:'user'})
  entrepriseId : Types.ObjectId;
    @Prop({type:mongoose.Schema.Types.ObjectId, ref:"offre"})
    offreId : Types.ObjectId;
}

export const CommentaireSchema = SchemaFactory.createForClass(Commentaire)
