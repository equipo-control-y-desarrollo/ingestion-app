//Cartera
import {
    get_cartera,
    create_cartera,
    get_carteras,
    get_carteras_by_empresa,
    update_cartera,
    get_cartera_schema,
    delete_cartera,
} from "../controllers/cartera";

import { verifyAdmin, verifyEmpresa } from '../utils/jwt' 
import { validate } from "../utils/validation";
import {
    createCarteraSchema,
    updateCarteraSchema,
    deleteCarteraSchema,
    getCarteraSchema,
    getCarteraByEmpresa
} from "../schemas/cartera.schema";

import { Router } from 'express';

const router = Router();

router.get('/empresa/:empresa_id', [validate(getCarteraByEmpresa), verifyEmpresa], get_carteras_by_empresa);
router.get('/', verifyAdmin, get_carteras);
router.get('/schema', get_cartera_schema);
router.get('/:id', validate(getCarteraSchema) ,get_cartera);
router.post('/', validate(createCarteraSchema), create_cartera);
router.put('/:id', validate(updateCarteraSchema), update_cartera);
router.delete('/:id', validate(deleteCarteraSchema),delete_cartera);

export default router;