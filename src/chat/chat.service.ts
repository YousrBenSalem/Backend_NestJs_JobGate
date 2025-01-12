/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IChat } from './interface/chat.interface';
import { Model } from 'mongoose';

@Injectable()
export class ChatService {

    constructor (
      @InjectModel('chat') private chatModel: Model<IChat>
    ){}
  




  async saveMessage(createChatDto: CreateChatDto):Promise<IChat> {
    const newMessage = await new this.chatModel(createChatDto)
    return newMessage.save()
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
