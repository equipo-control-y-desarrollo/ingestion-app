//Cartera
import {
    get_cartera,
    create_cartera,
    get_carteras,
    get_carteras_by_empresa,
    update_cartera,
    delete_cartera,
} from "../controllers/cartera";

import { verifyAdmin, verifyEmpresa } from '../utils/jwt' 

import { Router } from 'express';

const router = Router();

router.get('/empresa/:empresa_id', verifyEmpresa, get_carteras_by_empresa);
router.get('/', verifyAdmin, get_carteras);
router.get('/:id',   get_cartera);
router.post('/',   create_cartera);
router.put('/:id',   update_cartera);
router.delete('/:id',   delete_cartera);

export default router;