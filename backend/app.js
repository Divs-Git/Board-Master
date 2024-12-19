import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.static('../public'));
app.use('/UI', express.static('../UI'));

const PORT = process.env.PORT || 8080;
let server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

let io = new Server(server);
io.on('connection', (socket) => {
  console.log('socket connection successfully');
});
