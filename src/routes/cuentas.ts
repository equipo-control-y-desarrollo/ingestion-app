//Cuentas bancarias
import { Router } from 'express';
import {
    get_cuentas,
    create_cuenta,
    get_cuenta,
    get_cuentas_by_empresa,
    update_cuenta,
    delete_cuenta,
} from "../controllers/cuentas";

const router = Router();

router.get('/empresa/:empresa_id', get_cuentas_by_empresa);
router.get('/', get_cuentas);
router.get('/:id', get_cuenta);
router.post('/', create_cuenta);
router.put('/:id', update_cuenta);
router.delete('/:id', delete_cuenta);

export default router;