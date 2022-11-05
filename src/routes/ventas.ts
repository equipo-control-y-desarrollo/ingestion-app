//Cuadro de ventas y Registro de ventas

import { Router } from 'express';

import {
    get_ventas,
    create_venta,
    get_venta,
    get_ventas_by_empresa,
    update_venta,
    delete_venta,
} from "../controllers/ventas";

const router = Router();

router.get('/empresa/:empresa_id', get_ventas_by_empresa);
router.get('/', get_ventas);
router.get('/:id', get_venta);
router.post('/', create_venta);
router.put('/:id', update_venta);
router.delete('/:id', delete_venta);

export default router;