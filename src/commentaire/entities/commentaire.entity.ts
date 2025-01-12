/* eslint-disable prettier/prettier */
import {Prop , Schema , SchemaFactory} from "@nestjs/mongoose";
import mongoose, {Document, Types} from "mongoose";
@Schema({timestamps:true})
export class Commentaire  extends Document{
  

  @Prop()
  content : string ;


  @Prop({type : mongoose.Schema.Types.ObjectId , ref:'user'})
  userId : Types.ObjectId;
  @Prop({type:[{type : mongoose.Schema.Types.ObjectId , ref:'commentaire'}], default:null})
  parentCommentId : Types.ObjectId;

  @Prop({type:[{type : mongoose.Schema.Types.ObjectId , ref:'commentaire'}]})
  replies : Types.ObjectId[];

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:"offre"})
    offreId : Types.ObjectId;
}

export const CommentaireSchema = SchemaFactory.createForClass(Commentaire)
