/* eslint-disable prettier/prettier */

import { Types } from "mongoose";
import { IUser } from "src/user/interface/user.interface";
export interface IAdmin extends IUser {
  readonly item: string;
  readonly offreId : Types.ObjectId[];
}
