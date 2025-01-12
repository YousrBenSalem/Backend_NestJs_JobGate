/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
export interface IChat extends Document {
  readonly  sender: string;
  
  readonly  receiver: string;
  
  readonly  content: string;
}