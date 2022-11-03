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

const router = Router();

router.get('/empresa/:empresa_id', get_cuentas_pendientes_by_empresa);
router.get('/', get_cuentas_pendientes);
router.get('/:id', get_cuenta_pendiente);
router.post('/', create_cuenta_pendiente);
router.put('/:id', update_cuenta_pendiente);
router.delete('/:id', delete_cuenta_pendiente);

export default router;