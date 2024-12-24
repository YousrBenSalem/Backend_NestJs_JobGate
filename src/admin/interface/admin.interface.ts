/* eslint-disable prettier/prettier */

import { IUser } from "src/user/interface/user.interface";
export interface IAdmin extends IUser {
  readonly item: string;
}
