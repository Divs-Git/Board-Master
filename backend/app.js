import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// serves static file
const __dirname = path.resolve();

const app = express();
app.use(express.static(path.join(__dirname, '../public')));
const PORT = process.env.PORT || 5000;
let server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

let io = new Server(server);
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
