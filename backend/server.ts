import express from 'express';
import dotenv from 'dotenv';
import morgran from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import router from './src/routes/index';
import { instrument } from '@socket.io/admin-ui';
import { addRequest } from './src/controllers/RequestController';

dotenv.config();

async function connect() {
  if (process.env.MONGODB_CONNECTION_STRING) {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log('Successfully connected to database');
  } else {
    console.error(
      'Connection string not specified. Please specify connection string in an environment variable MONGODB_CONNECTION_STRING in .env file in root folder'
    );
  }
}
connect();

const app = express();

const fallbackCookieSigningSecret =
  '4f5b8f67d973a914c695b47800fb22b887eda1a290829110e3aebc6383d65c6b';
// middlewares
app.use(
  cors({
    origin: ['http://localhost:3001', 'http://localhost:5173'],
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgran('dev'));
app.use(
  cookieParser(process.env.COOKIE_SIGNING_SECRET || fallbackCookieSigningSecret)
);
app.use(router);

// creating socket server
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:3001',
      'http://localhost:5173',
      'https://admin.socket.io',
    ],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join-room', (room) => {
    console.log(console.log('joined room' + room));
    socket.join(room);
  });

  socket.on('send-request', async (room, req_data) => {
    const request_data = await addRequest(req_data);
    socket.to(room).emit('receive-request', request_data);
  });

  socket.on('send-message', (room, message) => {
    socket.to(room).emit('receive-message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

instrument(io, {
  auth: false,
  mode: 'development',
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
