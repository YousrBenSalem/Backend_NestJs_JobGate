/* eslint-disable prettier/prettier */
import { Document } from "mongoose";
export interface IChat extends Document {
  readonly  senderId: string;
  
  readonly  recipientId: string;
  
  readonly  content: string;
}