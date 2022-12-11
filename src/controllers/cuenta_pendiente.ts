//Cuentas pendientes
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/errors";
import { updateCuentaPendienteSchema } from "../schemas/cuenta_pendiente.schema";
import zodToJsonSchema from "zod-to-json-schema";

const prisma = new PrismaClient();

export const get_cuentas_pendientes = async ( req: Request, res: Response, next: NextFunction ) => {
    /**
     * Gets all the cuentas pendientes from the database
     * @param req Request
     * @param res Response
     * @param next NextFunction
     * 
     * @returns {Promise<Response>} Response
     * 
     * @throws {Error} Error
     */
    try {
        const cuentas_pendientes = await prisma.cuenta_pendiente.findMany();
        res.json( cuentas_pendientes );
    } catch ( error ) {
        next( error )
    }
};

export const get_cuenta_pendiente = async ( req: Request, res: Response, next: NextFunction ) => {
    /**
     * Gets an specific cuenta pendiente from the database
     * @param req Request
     * @param res Response
     * @param next NextFunction
     * 
     * @returns {Promise<Response>} Response
     * 
     * @throws {Error} Error
     **/ 

    try {
        const { id } = req.params;
        const cuenta_pendiente = await prisma.cuenta_pendiente.findUnique( {
            where: { id: +id },
        } );
        if ( !cuenta_pendiente ) {
            return next( createError( 'Cuenta pendiente not found', 404 ) );
        }

        if ( req.user.isAdmin || req.user.empresas.includes( +cuenta_pendiente.empresa_id ) ) {
            return res.status( 200 ).json( {
                "data": cuenta_pendiente,
                "updatable": Object.keys(zodToJsonSchema( updateCuentaPendienteSchema )['properties']['body']['properties'])
            });
        } else {
            next( createError( 'Unauthorized', 401 ) );
        }
    } catch ( error ) {
        next( error );
    }
};

export const get_cuentas_pendientes_by_empresa = async ( req: Request, res: Response, next: NextFunction ) => {
    /**
     * Gets all the cuentas pendientes from an specific empresa
     * @param req Request
     * @param res Response
     * @param next NextFunction
     * 
     * @returns {Promise<Response>} Response
     * 
     * @throws {Error} Error
    */
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
    /**
     * Creates a new cuenta pendiente
     * @param req Request
     * @param res Response
     * @param next NextFunction
     *  
     * @returns {Promise<Response>} Response
     * 
     * @throws {Error} Error
     */

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

        if(!req.user.isAdmin && !req.user.empresas.includes(+empresa_id)){
            return next(createError('Unauthorized', 401));
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
    /**
     * Updates an specific cuenta pendiente
     * @param req Request
     * @param res Response
     * @param next NextFunction
     * 
     * @returns {Promise<Response>} Response
     * 
     * @throws {Error} Error
     */

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
        
        //Validates if cuenta_pendiente is in usuario's empresas
        const cuenta_pendiente = await prisma.cuenta_pendiente.findUnique({
            where: { id: +id },
        });

        if ( !req.user.isAdmin && !req.user.empresas.includes( +cuenta_pendiente.empresa_id ) ) {
            return next( createError( 'Unauthorized', 401 ) );
        }

        if(empresa_id){
            const empresa = await prisma.empresa.findUnique( {
                where: { id: +empresa_id },
            } );

            if ( !empresa ) {
                return next( createError( 'Empresa not found', 404 ) );
            }

            //Validates if empresa is in usuario's empresas
            if ( !req.user.isAdmin && !req.user.empresas.includes( +empresa_id ) ) {
                return next( createError( 'Unauthorized', 401 ) );
            }
        }

        const new_fecha_recibido = fecha_recibido ? new Date(fecha_recibido) : undefined;
        const new_fecha_vencida = fecha_vencida ? new Date(fecha_vencida) : undefined;
        
        const cuenta_pendiente_updated = await prisma.cuenta_pendiente.update( {
            where: { id: +id },
            data: {
                proyecto: proyecto || undefined,
                nit: nit || undefined,
                proveedor: proveedor || undefined,
                nfactura: nfactura || undefined,
                fecha_recibido: new_fecha_recibido,
                estado: estado || undefined,
                inmediato: inmediato || undefined,
                dias_30: dias_30 || undefined,
                dias_60: dias_60 || undefined,
                fecha_vencida: new_fecha_vencida,
                empresa_id: empresa_id || undefined
            },
        });
        console.log(undefined || 0)
        res.json( cuenta_pendiente_updated );   
    }catch(error){
        next(error);
    }
};

export const delete_cuenta_pendiente = async ( req: Request, res: Response, next: NextFunction ) => {
    /**
     * Deletes an specific cuenta pendiente
     * @param req Request
     * @param res Response
     * @param next NextFunction
     * 
     * @returns {Promise<Response>} Response
     * 
     * @throws {Error} Error
     */
    
    try {
        const { id } = req.params;
        
        const cuenta_pendiente = await prisma.cuenta_pendiente.findUnique({
            where: { id: +id },
        });

        if(!req.user.isAdmin && !req.user.empresas.includes(+cuenta_pendiente.empresa_id)){
            return next(createError('Unauthorized', 401));
        }

        const cuenta_pendiente_deleted = await prisma.cuenta_pendiente.delete( {
            where: { id: +id },
        } );
        res.json( cuenta_pendiente_deleted );
    } catch ( error ) {
        next( error );
    }
};