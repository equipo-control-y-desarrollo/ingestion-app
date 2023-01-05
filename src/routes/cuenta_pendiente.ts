//Cuentas pendientes

import { Router } from "express";
import {
  get_cuentas_pendientes,
  create_cuenta_pendiente,
  get_cuenta_pendiente,
  get_cuentas_pendientes_by_empresa,
  update_cuenta_pendiente,
  delete_cuenta_pendiente,
  get_cuenta_pendiente_schema,
  get_export_cuenta_pendiente
} from "../controllers/cuenta_pendiente";

import { verifyAdmin, verifyEmpresa } from "../utils/jwt";

import { validate } from "../utils/validation";
import {
  createCuentaPendienteSchema,
  updateCuentaPendienteSchema,
  deleteCuentaPendienteSchema,
  getCuentaPendienteSchema,
  getCuentaPendienteByEmpresaSchema,
} from "../schemas/cuenta_pendiente.schema";

const router = Router();

router.get(
  "/empresa/:empresa_id",
  [validate(getCuentaPendienteByEmpresaSchema),verifyEmpresa],
  get_cuentas_pendientes_by_empresa
);
router.get("/", verifyAdmin, get_cuentas_pendientes);
router.get("/schema", get_cuenta_pendiente_schema);
router.get("/export/:empresa_id", get_export_cuenta_pendiente);
router.get("/:id", validate(getCuentaPendienteSchema), get_cuenta_pendiente);
router.post("/", validate(createCuentaPendienteSchema), create_cuenta_pendiente);
router.put("/:id", validate(updateCuentaPendienteSchema),update_cuenta_pendiente);
router.delete("/:id", validate(deleteCuentaPendienteSchema),delete_cuenta_pendiente);

export default router;
