import { io } from 'socket.io-client';

const socket = io('/', { transports: ['websocket'], autoConnect: false });

export function connectSocket() {
  socket.connect();
  return socket;
}

export function disconnectSocket() {
  socket.disconnect();
}

export default socket;
