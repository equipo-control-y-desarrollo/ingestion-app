//Cuentas pendientes
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/errors";

const prisma = new PrismaClient();

export const get_cuentas_pendientes = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const cuentas_pendientes = await prisma.cuenta_pendiente.findMany();
        res.json( cuentas_pendientes );
    } catch ( error ) {
        next( error )
    }
};

export const get_cuenta_pendiente = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = req.params;
        const cuenta_pendiente = await prisma.cuenta_pendiente.findUnique( {
            where: { id: +id },
        } );
        if ( !cuenta_pendiente ) {
            return next( createError( 'Cuenta pendiente not found', 404 ) );
        }
        res.json( cuenta_pendiente );
    } catch ( error ) {
        next( error );
    }
};

export const get_cuentas_pendientes_by_empresa = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { empresa_id } = req.params;
        const empresa = await prisma.empresa.findUnique( {
            where: { id: +empresa_id },
        } );
        if ( !empresa ) {
            return next( createError( 'Empresa not found', 404 ) );
        }

        const cuentas_pendientes = await prisma.cuenta_pendiente.findMany( {
            where: { empresa_id: +empresa_id },
        } );
        res.json( cuentas_pendientes );
    } catch ( error ) {
        next( error );
    }
};

export const create_cuenta_pendiente = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const {
            proyecto,
            nit,
            proveedor,
            nfactura,
            fecha_recibido,
            estado,
            inmediato,
            dias_30,
            dias_60,
            fecha_vencida,
            empresa_id
        } = req.body;

        const empresa = await prisma.empresa.findUnique({
            where: { id: +empresa_id },
        });

        if ( !empresa ) {
            return next( createError( 'Empresa not found', 404 ) );
        }

        const cuenta_pendiente = await prisma.cuenta_pendiente.create({
            data: {
                proyecto: proyecto,
                nit: nit,
                proveedor: proveedor,
                nfactura: nfactura,
                fecha_recibido: new Date(fecha_recibido),
                estado: estado || undefined,
                inmediato: inmediato || undefined,
                dias_30: dias_30 || undefined,
                dias_60: dias_60 || undefined,
                fecha_vencida: new Date(fecha_vencida),
                empresa_id: empresa_id
            },
        });
        res.json( cuenta_pendiente );   
    }catch(error){
        next(error);
    }
};

export const update_cuenta_pendiente = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = req.params;
        const {
            proyecto,
            nit,
            proveedor,
            nfactura,
            fecha_recibido,
            estado,
            inmediato,
            dias_30,
            dias_60,
            fecha_vencida,
            empresa_id
        } = req.body;

        if(empresa_id){
            const empresa = await prisma.empresa.findUnique( {
                where: { id: +empresa_id },
            } );

            if ( !empresa ) {
                return next( createError( 'Empresa not found', 404 ) );
            }
        }

        const cuenta_pendiente = await prisma.cuenta_pendiente.update( {
            where: { id: +id },
            data: {
                proyecto: proyecto || undefined,
                nit: nit || undefined,
                proveedor: proveedor || undefined,
                nfactura: nfactura || undefined,
                fecha_recibido: fecha_recibido || undefined,
                estado: estado || undefined,
                inmediato: inmediato || undefined,
                dias_30: dias_30 || undefined,
                dias_60: dias_60 || undefined,
                fecha_vencida: fecha_vencida || undefined,
                empresa_id: empresa_id || undefined
            },
        });
        console.log('0' || undefined)
        res.json( cuenta_pendiente );   
    }catch(error){
        next(error);
    }
};

export const delete_cuenta_pendiente = async ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const { id } = req.params;
        const cuenta_pendiente = await prisma.cuenta_pendiente.delete( {
            where: { id: +id },
        } );
        res.json( cuenta_pendiente );
    } catch ( error ) {
        next( error );
    }
};