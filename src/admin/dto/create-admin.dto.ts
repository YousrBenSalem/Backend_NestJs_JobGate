/* eslint-disable prettier/prettier */

import { Types } from "mongoose";
import { CreateUserDto } from "src/user/dto/create-user.dto";
export class CreateAdminDto extends CreateUserDto {
  readonly item: string;
  readonly offreId : Types.ObjectId[];
}
