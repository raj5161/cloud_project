const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the React app (production build)
app.use(express.static(path.join(__dirname, 'build')));

io.on('connection', (socket) => {
  console.log('A user connected.');

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
    socket.to(roomId).emit('user-joined', `Another user has joined the room: ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

// Catch-all route for React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
