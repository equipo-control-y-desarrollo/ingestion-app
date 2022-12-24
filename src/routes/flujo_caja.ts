//Flujo caja

import { Router } from "express";

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
  get_categoria_schema,
  get_flujo_caja_schema,
} from "../controllers/flujo_caja";

import { verifyAdmin, verifyEmpresa } from "../utils/jwt";

import { validate } from "../utils/validation";
import {
  createFlujoCajaSchema,
  updateFlujoCajaSchema,
  deleteFlujoCajaSchema,
  getFlujoCajaSchema,
  getFlujoCajaByEmpresaSchema,
  createCategoriaSchema,
  updateCategoriaSchema,
  deleteCategoriaSchema,
  getCategoriaSchema,
  getCategoriaByFlujoCajaSchema
} from "../schemas/flujo_caja.schema";


const router = Router();

router.get("/categorias/flujo/:flujo_caja_id", validate(getCategoriaByFlujoCajaSchema), get_categorias_by_flujo_caja);
router.get("/categorias/schema", get_categoria_schema);
router.get("/categorias/:id", validate(getCategoriaSchema),get_categoria);
router.post("/categorias", validate(createCategoriaSchema),create_categoria);
router.put("/categorias/:id", validate(updateCategoriaSchema),update_categoria);
router.delete("/categorias/:id", validate(deleteCategoriaSchema),delete_categoria);

router.get("/empresa/:empresa_id", [validate(getFlujoCajaByEmpresaSchema), verifyEmpresa], get_flujo_caja_by_empresa);
router.get("/schema", get_flujo_caja_schema);
router.get("/:id", validate(getFlujoCajaSchema), get_flujo_caja);
router.post("/", validate(createFlujoCajaSchema),create_flujo_caja);
router.put("/:id", validate(updateFlujoCajaSchema),update_flujo_caja);
router.delete("/:id", validate(deleteFlujoCajaSchema), delete_flujo_caja);

export default router;
