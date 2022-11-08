//Cuentas bancarias
import { Router } from 'express';
import {
    get_cuentas,
    create_cuenta,
    get_cuenta,
    get_cuentas_by_empresa,
    update_cuenta,
    delete_cuenta,
    get_movimientos_by_cuenta,
    create_movimiento,
    get_movimiento,
    update_movimiento,
    delete_movimiento,
} from "../controllers/cuentas";

import { verifyAdmin, verifyEmpresa, verifyToken } from '../utils/jwt' 

const router = Router();

//Cuentas bancarias router
router.get('/empresa/:empresa_id', verifyEmpresa, get_cuentas_by_empresa);
router.get('/', verifyToken, verifyAdmin, get_cuentas);
router.get('/:id', verifyToken, get_cuenta);
router.post('/', verifyToken, create_cuenta);
router.put('/:id', verifyToken, update_cuenta);
router.delete('/:id', verifyToken, delete_cuenta);

//Movimientos bancarios router
router.get('/movimientos/cuenta/:cuenta_id', verifyToken, get_movimientos_by_cuenta);
router.get('/movimientos/:id', verifyToken, get_movimiento);
router.post('/movimientos', verifyToken, create_movimiento);
router.put('/movimientos/:id', verifyToken, update_movimiento);
router.delete('/movimientos/:id', verifyToken, delete_movimiento);

export default router;