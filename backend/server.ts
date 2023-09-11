import express from 'express';
import dotenv from 'dotenv';
import morgran from 'morgan';
import cors from 'cors';
import router from './src/routes/index';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgran('dev'));
app.use(cors());
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
