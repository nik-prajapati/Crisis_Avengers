import express from 'express';
import dotenv from 'dotenv';
import morgran from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router from './src/routes/index';

dotenv.config();
const app = express();

// connect to database
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

const fallbackCookieSigningSecret =
  '4f5b8f67d973a914c695b47800fb22b887eda1a290829110e3aebc6383d65c6b';

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgran('dev'));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SIGNING_SECRET || fallbackCookieSigningSecret));
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
