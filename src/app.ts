import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
//Routers
import empresaRouter from './routes/empresa';
import carteraRouter from './routes/cartera';
import cuentaPendienteRouter from './routes/cuenta_pendiente';
import cuentasRouter from './routes/cuentas';
import flujoCajaRouter from './routes/flujo_caja';

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
app.use('/cuenta_pendiente',cuentaPendienteRouter);
app.use('/cuentas',cuentasRouter);
app.use('/flujocaja',flujoCajaRouter);

// Error handler
app.use(handleError);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});