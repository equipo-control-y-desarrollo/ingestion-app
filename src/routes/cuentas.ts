//Cuentas bancarias
import { Router } from "express";
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
  get_cuenta_schema,
  get_movimiento_schema,
  get_export_movimientos,
} from "../controllers/cuentas";

import { verifyAdmin, verifyEmpresa } from "../utils/jwt";

import { validate } from "../utils/validation";
import {
  createCuentaSchema,
  updateCuentaSchema,
  deleteCuentaSchema,
  getCuentaSchema,
  getCuentaByEmpresaSchema,
  createMovimientoSchema,
  updateMovimientoSchema,
  deleteMovimientoSchema,
  getMovimientoSchema,
  getMovimientoByCuentaSchema,
} from "../schemas/cuentas.schema";

const router = Router();

//Cuentas bancarias router
router.get(
  "/empresa/:empresa_id",
  [validate(getCuentaByEmpresaSchema), verifyEmpresa],
  get_cuentas_by_empresa
);
router.get("/", verifyAdmin, get_cuentas);
router.get("/schema", get_cuenta_schema);
router.get("/:id", validate(getCuentaSchema), get_cuenta);
router.post("/", validate(createCuentaSchema), create_cuenta);
router.put("/:id", validate(updateCuentaSchema), update_cuenta);
router.delete("/:id", validate(deleteCuentaSchema), delete_cuenta);

//Movimientos bancarios router
router.get(
  "/movimientos/cuenta/:cuenta_id",
  validate(getMovimientoByCuentaSchema),
  get_movimientos_by_cuenta
);
router.get("/movimientos/schema", get_movimiento_schema);
router.get("/movimientos/:id", validate(getMovimientoSchema), get_movimiento);
router.get("/movimientos/export/:cuenta_id", get_export_movimientos);
router.post(
  "/movimientos",
  validate(createMovimientoSchema),
  create_movimiento
);
router.put(
  "/movimientos/:id",
  validate(updateMovimientoSchema),
  update_movimiento
);
router.delete(
  "/movimientos/:id",
  validate(deleteMovimientoSchema),
  delete_movimiento
);

export default router;
