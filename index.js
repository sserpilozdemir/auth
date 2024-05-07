import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { router } from './routes/usersRoutes.js';
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT
const corsOptions = { credentials: true, origin: process.env.URL || '*' };

app.use(cors(corsOptions));
app.use(json());
app.use(cookieParser());

app.use('/', express.static(join(__dirname, 'public')))
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server is listening ${PORT}`);
});