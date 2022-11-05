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
    get_cuadro_ventas_by_empresa,
    get_cuadro_ventas,
    update_cuadro_ventas,
    create_cuadro_ventas,
    delete_cuadro_ventas,
} from "../controllers/ventas";

const router = Router();

router.get('/empresa/:empresa_id', get_ventas_by_empresa);
router.get('/', get_ventas);
router.get('/:id', get_venta);
router.post('/', create_venta);
router.put('/:id', update_venta);
router.delete('/:id', delete_venta);


router.get('/cuadros/empresa/:empresa_id', get_cuadro_ventas_by_empresa);
router.get('/cuadros/', get_cuadros_ventas);
router.get('/cuadros/:id', get_cuadro_ventas);
router.post('/cuadros/', create_cuadro_ventas);
router.put('/cuadros/:id', update_cuadro_ventas);
router.delete('/cuadros/:id', delete_cuadro_ventas);

export default router;