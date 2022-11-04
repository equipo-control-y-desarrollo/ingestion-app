//Cuentas bancarias

import { Response, Request, NextFunction } from 'express';
import { createError } from '../utils/errors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


//Cuentas bancarias
export const get_cuentas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cuentas = await prisma.cuenta.findMany();
        res.status(200).json(cuentas);
    }catch(error){
        next(error);
    }
};

export const get_cuenta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const cuenta = await prisma.cuenta.findUnique({
            where: { id: +id },
        });
        if (!cuenta) {
            return next(createError('Cuenta not found', 404));
        }
        res.status(200).json(cuenta);
    } catch (error) {
        next(error);
    }
};

export const get_cuentas_by_empresa = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { empresa_id } = req.params;
        const empresa = await prisma.empresa.findUnique({
            where: { id: +empresa_id },
        });
        if (!empresa) {
            return next(createError('Empresa not found', 404));
        }

        const cuentas = await prisma.cuenta.findMany({
            where: { empresa_id: +empresa_id },
        });
        res.status(200).json(cuentas);
    } catch (error) {
        next(error);
    }
};

export const create_cuenta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            banco,
            tipo,
            numero,
            empresa_id,
        } = req.body;

        const empresa = await prisma.empresa.findUnique({
            where: { id: +empresa_id },
        });
        if (!empresa) {
            return next(createError('Empresa not found', 404));
        }

        const cuenta = await prisma.cuenta.create({
            data: {
                banco: banco,
                tipo: tipo,
                numero: numero,
                empresa_id: empresa_id,
            },
        });
        res.status(201).json(cuenta);
    } catch (error) {
        next(error);
    }
};

export const update_cuenta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const {
            banco,
            tipo,
            numero,
            empresa_id,
        } = req.body;

        const empresa = await prisma.empresa.findUnique({
            where: { id: +empresa_id },
        });
        if (!empresa) {
            return next(createError('Empresa not found', 404));
        }

        const cuenta_updated = await prisma.cuenta.update({
            where: { id: +id },
            data: {
                banco: banco || undefined,
                tipo: tipo || undefined,
                numero: numero || undefined,
                empresa_id: empresa_id || undefined,
            },
        });

        res.status(200).json(cuenta_updated);
    } catch (error) {
        next(error);
    }
};

export const delete_cuenta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const cuenta = await prisma.cuenta.delete({
            where: { id: +id },
        });
        res.status(204).json(cuenta);
    } catch (error) {
        next(error);
    }
};

//Registro de movimiento
