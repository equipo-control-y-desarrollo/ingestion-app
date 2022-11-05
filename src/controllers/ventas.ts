//Cuadro de ventas y Registro de ventas
import { Response, Request, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { createError } from '../utils/errors';

const prisma = new PrismaClient();

export const get_ventas = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ventas = await prisma.registro_ventas.findMany();
        res.status(200).json(ventas);
    } catch (error) {
        next(error);
    }
};

export const get_venta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const venta = await prisma.registro_ventas.findUnique({
            where: { id: +id },
        });
        if (!venta) {
            return next(createError('Venta not found', 404));
        }
        res.status(200).json(venta);
    } catch (error) {
        next(error);
    }
};

export const get_ventas_by_empresa = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { empresa_id } = req.params;
        const empresa = await prisma.empresa.findUnique({
            where: { id: +empresa_id },
        });
        if (!empresa) {
            return next(createError('Empresa not found', 404));
        }

        const ventas = await prisma.registro_ventas.findMany({
            where: { empresa_id: +empresa_id },
        });
        res.status(200).json(ventas);
    } catch (error) {
        next(error);
    }
};

export const create_venta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            fecha,
            empresa_id,
            cantidad,
            producto,
            valor_total
        } = req.body;

        const empresa = await prisma.empresa.findUnique({
            where: { id: +empresa_id },
        });
        
        if (!empresa) {
            return next(createError('Empresa not found', 404));
        }

        const venta = await prisma.registro_ventas.create({
            data: {
                fecha: new Date(fecha),
                empresa_id: empresa_id,
                cantidad: cantidad,
                producto: producto,
                valor_total: valor_total
            },
        });
        res.status(201).json(venta);
    }catch(error){
        next(error);
    }
};

export const update_venta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const {
            fecha,
            empresa_id,
            cantidad,
            producto,
            valor_total
        } = req.body;

        const venta = await prisma.registro_ventas.findUnique({
            where: { id: +id },
        });
        if (!venta) {
            return next(createError('Venta not found', 404));
        }

        const new_fecha = fecha ? new Date(fecha) : undefined;

        const updated_venta = await prisma.registro_ventas.update({
            where: { id: +id },
            data: {
                fecha: new_fecha,
                empresa_id: empresa_id || undefined,
                cantidad: cantidad ||  undefined,
                producto: producto || undefined,
                valor_total: valor_total || undefined
            },
        });
        res.status(200).json(updated_venta);
    }catch(error){
        next(error);
    }
};

export const delete_venta = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const venta = await prisma.registro_ventas.findUnique({
            where: { id: +id },
        });
        if (!venta) {
            return next(createError('Venta not found', 404));
        }
        await prisma.registro_ventas.delete({
            where: { id: +id },
        });
        res.status(200).json(venta);
    } catch (error) {
        next(error);
    }
};