const { Server } = require('socket.io');

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: { origin: true, methods: ['GET', 'POST'], credentials: true },
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('joinQueueRoom', (departmentId) => {
      if (departmentId) {
        socket.join(`queue-${departmentId}`);
      }
    });

    socket.on('leaveQueueRoom', (departmentId) => {
      if (departmentId) {
        socket.leave(`queue-${departmentId}`);
      }
    });

    socket.on('updateQueue', (payload) => {
      socket.to(`queue-${payload.departmentId}`).emit('queueUpdated', payload);
      io.emit('globalQueueUpdated', payload);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

  return io;
}

function getSocket() {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
}

module.exports = { initSocket, getSocket };
