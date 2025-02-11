/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private onlineUsers = new Map<string, string>(); // Map userId -> socketId

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    for (const [userId, socketId] of this.onlineUsers.entries()) {
      if (socketId === client.id) this.onlineUsers.delete(userId);
    }
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, userId: string) {
    this.onlineUsers.set(userId, client.id);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { senderId: string; recipientId: string; content: string }) {
    const savedMessage = await this.chatService.createMessage(payload);
    const recipientSocket = this.onlineUsers.get(payload.recipientId);

    if (recipientSocket) {
      this.server.to(recipientSocket).emit('receiveMessage', savedMessage);
    }
  }

  @SubscribeMessage('isTyping')
  handleIsTyping(client: Socket, payload: { recipientId: string }) {
    const recipientSocket = this.onlineUsers.get(payload.recipientId);

    if (recipientSocket) {
      this.server.to(recipientSocket).emit('typing', { from: client.id });
    }
  }
}
