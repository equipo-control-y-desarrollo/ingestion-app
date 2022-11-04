//Cuentas bancarias
import { Router } from 'express';
import {
    get_cuentas,
    create_cuenta,
    get_cuenta,
    get_cuentas_by_empresa,
    update_cuenta,
    delete_cuenta,
    get_movimientos,
    get_movimientos_by_cuenta,
    create_movimiento,
    get_movimiento,
    update_movimiento,
    delete_movimiento,
} from "../controllers/cuentas";

const router = Router();

//Cuentas bancarias router
router.get('/empresa/:empresa_id', get_cuentas_by_empresa);
router.get('/', get_cuentas);
router.get('/:id', get_cuenta);
router.post('/', create_cuenta);
router.put('/:id', update_cuenta);
router.delete('/:id', delete_cuenta);

//Movimientos bancarios router
router.get('/movimientos', get_movimientos);
router.get('/movimientos/:cuenta_id', get_movimientos_by_cuenta);
router.get('/movimientos/:id', get_movimiento);
router.post('/movimientos', create_movimiento);
router.put('/movimientos/:id', update_movimiento);
router.delete('/movimientos/:id', delete_movimiento);

export default router;