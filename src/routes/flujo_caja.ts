//Flujo caja

import { Router } from 'express';

import {
    get_flujo_caja,
    create_flujo_caja,
    get_flujo_cajas,
    get_flujo_cajas_by_empresa,
    update_flujo_caja,
    delete_flujo_caja,
} from "../controllers/flujo_caja";

const router = Router();

router.get('/empresa/:empresa_id', get_flujo_cajas_by_empresa);
router.get('/', get_flujo_cajas);
router.get('/:id', get_flujo_caja);
router.post('/', create_flujo_caja);
router.put('/:id', update_flujo_caja);
router.delete('/:id', delete_flujo_caja);

export default router;