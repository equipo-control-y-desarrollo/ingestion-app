//Flujo caja

import { Router } from 'express';

import {
    get_flujo_caja,
    create_flujo_caja,
    get_flujo_caja_by_empresa,
    update_flujo_caja,
    delete_flujo_caja,
    get_categorias_by_flujo_caja,
    create_categoria,
    get_categoria,
    update_categoria,
    delete_categoria,
} from "../controllers/flujo_caja";

const router = Router();

router.get('/empresa/:empresa_id', get_flujo_caja_by_empresa);
router.get('/:id', get_flujo_caja);
router.post('/', create_flujo_caja);
router.put('/:id', update_flujo_caja);
router.delete('/:id', delete_flujo_caja);

router.get('/categorias/:flujo_caja_id', get_categorias_by_flujo_caja);
router.get('/categorias/:id', get_categoria);
router.post('/categorias', create_categoria);
router.put('/categorias/:id', update_categoria);
router.delete('/categorias/:id', delete_categoria);


export default router;