import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();

// Enable CORS
app.use(
  cors({
    origin: 'https://board-master.onrender.com',
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

// Serve static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
let server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

// Initialize Socket.IO
let io = new Server(server, {
  cors: {
    origin: 'https://board-master.onrender.com',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('socket connection successfully');

  // Recieved Data
  socket.on('beginPath', (data) => {
    // Data from frontend
    // Transfer data to all computers
    io.sockets.emit('beginPath', data);
  });

  socket.on('drawStroke', (data) => {
    io.sockets.emit('drawStroke', data);
  });

  socket.on('undoRedo', (data) => {
    io.sockets.emit('undoRedo', data);
  });
});
