//Cuadro de ventas y Registro de ventas

import { Router } from 'express';

import {
    get_ventas,
    create_venta,
    get_venta,
    get_ventas_by_empresa,
    update_venta,
    delete_venta,
    get_cuadros_ventas,
    get_cuadros_ventas_by_empresa,
    get_cuadro_venta,
    update_cuadro_venta,
    create_cuadro_venta,
    delete_cuadro_venta,
} from "../controllers/ventas";

import { verifyAdmin, verifyEmpresa, verifyUser } from '../utils/jwt' 

const router = Router();

router.get('/empresa/:empresa_id', verifyEmpresa, get_ventas_by_empresa);
router.get('/', verifyAdmin, get_ventas);
router.get('/:id', verifyUser, get_venta);
router.post('/', verifyUser, create_venta);
router.put('/:id', verifyUser, update_venta);
router.delete('/:id', verifyUser, delete_venta);


router.get('/cuadros/empresa/:empresa_id', verifyEmpresa, get_cuadros_ventas_by_empresa);
router.get('/cuadros/', verifyAdmin, get_cuadros_ventas);
router.get('/cuadros/:id', verifyUser, get_cuadro_venta);
router.post('/cuadros/', verifyUser, create_cuadro_venta);
router.put('/cuadros/:id', verifyUser, update_cuadro_venta);
router.delete('/cuadros/:id', verifyUser, delete_cuadro_venta);

export default router;