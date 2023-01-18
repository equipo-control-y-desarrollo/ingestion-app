import { Router } from "express";
import { verifyAdmin, verifyEmpresa } from "../utils/jwt";
import {
  createGastoSchema,
  getGastoSchema,
  updateGastoSchema,
  deleteGastoSchema,
} from "../schemas/gasto.schema";
import {
  create_gasto,
  get_gasto,
  get_gastos,
  update_gasto,
  delete_gasto,
  get_gastos_schema,
  get_export_gasto,
  get_gastos_by_empresa,
} from "../controllers/gasto";
import { validate } from "../utils/validation";

const router = Router();

router.get("/", verifyAdmin, get_gastos);
router.get("/schema", get_gastos_schema);
router.get("/empresa/:empresa_id", verifyEmpresa, get_gastos_by_empresa);
router.get("/export/:empresa_id", verifyEmpresa,get_export_gasto);
router.get("/:id", validate(getGastoSchema), get_gasto);
router.post("/", validate(createGastoSchema), create_gasto);
router.put("/:id", validate(updateGastoSchema), update_gasto);
router.delete("/:id", validate(deleteGastoSchema), delete_gasto);

export default router;
