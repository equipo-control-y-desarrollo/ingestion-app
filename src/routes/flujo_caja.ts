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

import { verifyAdmin, verifyEmpresa, verifyUser } from '../utils/jwt' 

const router = Router();

router.get('/empresa/:empresa_id', verifyEmpresa, get_flujo_caja_by_empresa);
router.get('/:id', verifyUser,get_flujo_caja);
router.post('/', verifyUser, create_flujo_caja);
router.put('/:id', verifyUser, update_flujo_caja);
router.delete('/:id', verifyUser, delete_flujo_caja);

router.get('/categorias/flujo/:flujo_caja_id', verifyUser, get_categorias_by_flujo_caja);
router.get('/categorias/:id', verifyUser, get_categoria);
router.post('/categorias', verifyUser, create_categoria);
router.put('/categorias/:id', verifyUser, update_categoria);
router.delete('/categorias/:id', verifyUser, delete_categoria);


export default router;