
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
        const {
            valor,
            valor_abonado,
            fecha_factura,
            fecha_vencimiento,
            estado,
            nro_factura,
            proyecto,
            empresa_id
        } = req.body;

        const empresa = await prisma.empresa.findUnique({
            where: { id: +empresa_id },
        })
        if(!empresa) {
            return next(createError('Empresa not found', 404));
        }

        const cartera = await prisma.cartera.create({
            data: {
                empresa_id: empresa_id,
                valor: valor,
                valor_abonado: valor_abonado || undefined,
                fecha_factura: new Date(fecha_factura),
                fecha_vencimiento: new Date(fecha_vencimiento),
                estado: estado || undefined,
                nro_factura: nro_factura,
                proyecto: proyecto
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
        const {
            valor,
            valor_abonado,
            fecha_factura,
            fecha_vencimiento,
            estado,
            nro_factura,
            proyecto,
            empresa_id
        } = req.body;
        
        if(empresa_id){
            const empresa = await prisma.empresa.findUnique({
                where: { id: +empresa_id},
            })
            if(!empresa) {
                return next(createError('Empresa not found', 404));
            }
        }
        const cartera = await prisma.cartera.update({
            where: {id: +id},
            data: {
                empresa_id: empresa_id || undefined,
                valor: valor || undefined,
                valor_abonado: valor_abonado || undefined,
                fecha_factura: new Date(fecha_factura) || undefined,
                fecha_vencimiento: new Date(fecha_vencimiento) || undefined,
                estado: estado || undefined,
                nro_factura: nro_factura || undefined,
                proyecto: proyecto || undefined
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