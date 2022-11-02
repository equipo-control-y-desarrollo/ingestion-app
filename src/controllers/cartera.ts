
//Cartera
import {Request, Response, NextFunction} from 'express';
import { PrismaClient } from '@prisma/client';
import { createError } from '../utils/errors';

const prisma = new PrismaClient();

export const get_cartera = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const cartera = await prisma.cartera.findUnique({
            where: { id: +id },
        });
        if (!cartera) {
            return next(createError('Cartera not found', 404));
        }
        res.status(200).json(cartera);
    } catch (error) {
        next(error);
    }
}

export const get_carteras = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carteras = await prisma.cartera.findMany();
        res.status(200).json(carteras);
    } catch (error) {
        next(error);
    }
}

export const get_carteras_by_empresa = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { empresa_id } = req.params;
        const empresa = await prisma.empresa.findUnique({
            where: { id: +empresa_id },
        });
        if (!empresa) {
            return next(createError('Empresa not found', 404));
        }

        const carteras = await prisma.cartera.findMany({
            where: { empresa_id: +empresa_id },
        });
        res.status(200).json(carteras);
    } catch (error) {
        next(error);
    }
}

export const create_cartera = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {empresa_id, fecha_vencimiento, valor, estado, facturas_venta} = req.body;

        const empresa = await prisma.empresa.findUnique({
            where: { id: +empresa_id },
        })
        console.log(empresa)
        if(!empresa) {
            return next(createError('Empresa not found', 404));
        }

        const cartera = await prisma.cartera.create({
            data: {
                empresa_id: empresa_id,
                fecha_vencimiento: new Date(fecha_vencimiento),
                valor: valor,
                estado: estado || undefined,
                facturas_venta: facturas_venta,
            },
        });
        res.status(200).json(cartera);
    }catch(error){
        next(error);
    }
}

export const update_cartera = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params;
        const {empresa_id, fecha_vencimiento, valor, estado, facturas_venta} = req.body;
        const cartera = await prisma.cartera.update({
            where: {id: +id},
            data: {
                empresa_id: empresa_id || undefined,
                fecha_vencimiento: new Date(fecha_vencimiento) || undefined,
                valor: valor || undefined,
                estado: estado || undefined,
                facturas_venta: facturas_venta || undefined,
            },
        });
        res.status(200).json(cartera);
    }catch(error){
        next(error);
    }
};

export const delete_cartera = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params;
        const cartera = await prisma.cartera.delete({
            where: {id: +id},
        });
        res.status(200).json(cartera);
    }catch(error){
        next(error);
    }
};