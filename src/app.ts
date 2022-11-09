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
import ventasRouter from './routes/ventas';
import authRouter from './routes/auth';

import { verifyAdmin } from './utils/jwt' 

import { handleError } from './utils/errors';
import { verifyToken } from './utils/jwt';

dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.use('/auth',authRouter);

//Token verification for routes
app.use(verifyToken);

app.use('/empresa', verifyAdmin,empresaRouter);
app.use('/cartera',carteraRouter);
app.use('/cuenta_pendiente',cuentaPendienteRouter);
app.use('/cuentas',cuentasRouter);
app.use('/flujocaja',flujoCajaRouter);
app.use('/ventas',ventasRouter);

// Error handler
app.use(handleError);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});