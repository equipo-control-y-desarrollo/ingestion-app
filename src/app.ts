import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import empresaRouter from './routes/empresa';
import carteraRouter from './routes/cartera';
import { handleError } from './utils/errors';

dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.use('/empresa',empresaRouter);
app.use('/cartera',carteraRouter);

// Error handler
app.use(handleError);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});