/* eslint-disable prettier/prettier */
import {   OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import {Socket , Server} from "socket.io"



@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection , OnGatewayDisconnect {
  @WebSocketServer() server: Server ;

    private connectedUsers = new Map<string, string>(); // userId -> socketId


  handleConnection(client:Socket) {
    console.log('new client connected ...', client.id);
    this.server.emit('user-joined',{
      message: `New User Joined the chat:${client.id}` ,
    })
      
  }

  handleDisconnect(client:Socket) {
    console.log(' client disconnected ...', client.id);
      this.server.emit('user-left',{
      message: `User Left the chat:${client.id}` ,
    })
      
  }


  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, payload: { sender: string, receiver: string, message: string }) {
    const receiverSocketId = this.connectedUsers.get(payload.receiver);
    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('receiveMessage', payload);
    }
  }
}