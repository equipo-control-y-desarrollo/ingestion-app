import express from 'express';
import dotenv from 'dotenv';
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

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth',authRouter);

//Token verification for routes
app.use(verifyToken);

app.use('/empresas', verifyAdmin,empresaRouter);
app.use('/carteras',carteraRouter);
app.use('/cuentas_pendientes',cuentaPendienteRouter);
app.use('/cuentas',cuentasRouter);
app.use('/flujoscaja',flujoCajaRouter);
app.use('/ventas',ventasRouter);

// Error handler
app.use(handleError);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});