/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './entities/chat.entity';

@Module({
  imports: [
      MongooseModule.forFeature([{
        name: 'chat',
        schema: MessageSchema
      }])
    ],
  controllers: [ChatController],
  providers: [ChatService , ChatGateway],
})
export class ChatModule {}
