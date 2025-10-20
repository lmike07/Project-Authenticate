import Express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes';

dotenv.config();

const server = Express();
server.use(cors());
server.use(Express.urlencoded({ extended: true}));
server.use(router); 




const PORT = process.env.PORT || 3000;
server.listen(PORT);