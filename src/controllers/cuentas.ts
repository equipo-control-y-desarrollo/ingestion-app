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

        if(req.user.isAdmin || req.user.empresas.includes(+cuenta.empresa_id)){
            res.status(200).json(cuenta);
        }else{
            next(createError('Unauthorized', 401));
        }
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
        if(!req.user.isAdmin && !req.user.empresas.includes(+empresa_id)){
            return next(createError('Unauthorized', 401));
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

        const cuenta = await prisma.cuenta.findUnique({
            where: { id: +id },
        });
        if (!req.user.isAdmin && !req.user.empresas.includes(+cuenta.empresa_id)) {
            return next(createError('Unauthorized', 401));
        }

        if(empresa_id){
            const empresa = await prisma.empresa.findUnique({
                where: { id: +empresa_id },
            });
            if (!empresa) {
                return next(createError('Empresa not found', 404));
            }

            if(!req.user.isAdmin && !req.user.empresas.includes(+empresa_id)){
                return next(createError('Unauthorized', 401));
            }
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

        const cuenta = await prisma.cuenta.findUnique({
            where: { id: +id },
        });
        if (!req.user.isAdmin && !req.user.empresas.includes(+cuenta.empresa_id)) {
            return next(createError('Unauthorized', 401));
        }

        const cuenta_deleted = await prisma.cuenta.delete({
            where: { id: +id },
        });
        res.status(200).json(cuenta_deleted);
    } catch (error) {
        next(error);
    }
};

//Registro de movimiento
export const get_movimiento = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const movimiento = await prisma.movimiento.findUnique({
            where: { id: +id },
        });
        if (!movimiento) {
            return next(createError('Movimiento not found', 404));
        }

        //validate authorization
        const cuenta = await prisma.cuenta.findUnique({
            where: { id: +movimiento.cuenta_id },
        });
        if (!req.user.isAdmin && !req.user.empresas.includes(+cuenta.empresa_id)) {
            return next(createError('Unauthorized', 401));
        }

        res.status(200).json(movimiento);
    } catch (error) {
        next(error);
    }
};

export const get_movimientos_by_cuenta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { cuenta_id } = req.params;
        const cuenta = await prisma.cuenta.findUnique({
            where: { id: +cuenta_id },
        });
        if (!cuenta) {
            return next(createError('Cuenta not found', 404));
        }

        //validate authorization
        if (!req.user.isAdmin && !req.user.empresas.includes(+cuenta.empresa_id)) {
            return next(createError('Unauthorized', 401));
        }

        const movimientos = await prisma.movimiento.findMany({
            where: { cuenta_id: +cuenta_id },
        });
        res.status(200).json(movimientos);
    } catch (error) {
        next(error);
    }
};

export const create_movimiento = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            fecha,
            saldo_inicial,
            ingreso,
            pago,
            pago_impuesto,
            gasto_bancario,
            cuenta_id,
        } = req.body;

        const cuenta = await prisma.cuenta.findUnique({
            where: { id: +cuenta_id },
        });
        if (!cuenta) {
            return next(createError('Cuenta not found', 404));
        }

        //validate authorization
        if (!req.user.isAdmin && !req.user.empresas.includes(+cuenta.empresa_id)) {
            return next(createError('Unauthorized', 401));
        }

        const movimiento = await prisma.movimiento.create({
            data: {
                fecha: new Date(fecha),
                saldo_inicial: saldo_inicial,
                ingreso: ingreso || undefined,
                pago: pago || undefined,
                pago_impuesto: pago_impuesto || undefined,
                gasto_bancario: gasto_bancario || undefined,
                cuenta_id: cuenta_id,
            },
        });
        res.status(201).json(movimiento);
    } catch (error) {
        next(error);
    }
};

export const update_movimiento = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const {
            fecha,
            saldo_inicial,
            ingreso,
            pago,
            pago_impuesto,
            gasto_bancario,
            cuenta_id,
        } = req.body;

        //validate authorization
        const movimiento = await prisma.movimiento.findUnique({
            where: { id: +id },
        });
        const cuenta = await prisma.cuenta.findUnique({
            where: { id: +movimiento.cuenta_id },
        });
        if (!req.user.isAdmin && !req.user.empresas.includes(+cuenta.empresa_id)) {
            return next(createError('Unauthorized', 401));
        }

        if(cuenta_id){
            const cuenta = await prisma.cuenta.findUnique({
                where: { id: +cuenta_id },
            });
            if (!cuenta) {
                return next(createError('Cuenta not found', 404));
            }
            //validate authorization
            if (!req.user.isAdmin && !req.user.empresas.includes(+cuenta.empresa_id)) {
                return next(createError('Unauthorized', 401));
            }
        }

        let new_fecha = undefined
        if(fecha){
            new_fecha = new Date(fecha);
        }

        const movimiento_updated = await prisma.movimiento.update({
            where: { id: +id },
            data: {
                fecha: new_fecha || undefined,
                saldo_inicial: saldo_inicial || undefined,
                ingreso: ingreso || undefined,
                pago: pago || undefined,
                pago_impuesto: pago_impuesto || undefined,
                gasto_bancario: gasto_bancario || undefined,
                cuenta_id: cuenta_id || undefined,
            },
        });

        res.status(200).json(movimiento_updated);
    } catch (error) {
        next(error);
    }
};

export const delete_movimiento = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        //validate authorization
        const movimiento = await prisma.movimiento.findUnique({
            where: { id: +id },
        });
        const cuenta = await prisma.cuenta.findUnique({
            where: { id: +movimiento.cuenta_id },
        });
        if (!req.user.isAdmin && !req.user.empresas.includes(+cuenta.empresa_id)) {
            return next(createError('Unauthorized', 401));
        }

        const movimiento_deleted = await prisma.movimiento.delete({
            where: { id: +id },
        });
        res.status(200).json({movimiento_deleted});
    } catch (error) {
        next(error);
    }
};