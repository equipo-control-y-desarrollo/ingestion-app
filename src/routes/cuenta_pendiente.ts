//Cuentas pendientes

import { Router } from 'express';
import {
    get_cuentas_pendientes,
    create_cuenta_pendiente,
    get_cuenta_pendiente,
    get_cuentas_pendientes_by_empresa,
    update_cuenta_pendiente,
    delete_cuenta_pendiente,
} from "../controllers/cuenta_pendiente";

import { verifyAdmin, verifyEmpresa, verifyUser } from '../utils/jwt' 

const router = Router();

router.get('/empresa/:empresa_id', verifyEmpresa, get_cuentas_pendientes_by_empresa);
router.get('/', verifyAdmin, get_cuentas_pendientes);
router.get('/:id', verifyUser, get_cuenta_pendiente);
router.post('/', verifyUser, create_cuenta_pendiente);
router.put('/:id', verifyUser, update_cuenta_pendiente);
router.delete('/:id', verifyUser, delete_cuenta_pendiente);

export default router;