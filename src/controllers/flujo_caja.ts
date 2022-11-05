//Flujo caja

import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/errors";

const prisma = new PrismaClient();

export const get_flujo_caja = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = req.params;
        const flujo_caja = await prisma.flujo_caja.findUnique({
            where: { id: +id },
        });
        if ( !flujo_caja ) {
            return next( createError( 'Flujo caja not found', 404 ) );
        }
        res.status( 200 ).json( flujo_caja );
    }catch(error){
        next(error)
    }
};

export const get_flujo_caja_by_empresa = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { empresa_id } = req.params;
        const empresa = await prisma.empresa.findUnique({
            where: { id: +empresa_id },
        });
        if ( !empresa ) {
            return next( createError( 'Empresa not found', 404 ) );
        }

        const flujo_caja = await prisma.flujo_caja.findMany({
            where: { empresa_id: +empresa_id },
        });
        res.status( 200 ).json( flujo_caja );
    }catch(error){
        next(error)
    }
};

export const create_flujo_caja = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const {
            fecha,
            empresa_id
        } = req.body;

        const empresa = await prisma.empresa.findUnique({
            where: { id: +empresa_id },
        });

        if(!empresa){
            return next( createError( 'Empresa not found', 404 ) );
        }

        const flujo_caja = await prisma.flujo_caja.create({
            data: {
                fecha: fecha,
                empresa_id: empresa_id
            },
        });
        res.status( 200 ).json( flujo_caja );
    }catch(error){
        next(error);
    }
};

export const update_flujo_caja = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = req.params;
        const {
            fecha,
            empresa_id
        } = req.body;

        if(empresa_id){
            const empresa = await prisma.empresa.findUnique({
                where: { id: +empresa_id },
            });
    
            if(!empresa){
                return next( createError( 'Empresa not found', 404 ) );
            }
        }

        let new_fecha = undefined
        if(fecha){
            new_fecha = new Date(fecha);
        }

        const flujo_caja = await prisma.flujo_caja.update({
            where: { id: +id },
            data: {
                fecha: new_fecha,
                empresa_id: empresa_id || undefined
            },
        });
        res.status( 200 ).json( flujo_caja );
    }catch(error){
        next(error);
    }
};

export const delete_flujo_caja = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = req.params;
        const flujo_caja = await prisma.flujo_caja.delete({
            where: { id: +id },
        });
        res.status( 200 ).json( flujo_caja );
    }catch(error){
        next(error);
    }
};