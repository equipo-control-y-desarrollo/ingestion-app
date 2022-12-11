//Cuadro de ventas y Registro de ventas

import { Router } from "express";

import {
  get_ventas,
  create_venta,
  get_venta,
  get_ventas_by_empresa,
  update_venta,
  delete_venta,
  get_cuadros_ventas,
  get_cuadros_ventas_by_empresa,
  get_cuadro_venta,
  update_cuadro_venta,
  create_cuadro_venta,
  delete_cuadro_venta,
} from "../controllers/ventas";

import { verifyAdmin, verifyEmpresa } from "../utils/jwt";

import { validate } from "../utils/validation";
import {
  createVentaSchema,
  updateVentaSchema,
  deleteVentaSchema,
  getVentaSchema,
  getVentaByEmpresaSchema,
  createCuadroVentaSchema,
  updateCuadroVentaSchema,
  deleteCuadroVentaSchema,
  getCuadroVentaSchema,
  getCuadroVentaByEmpresaSchema,
} from "../schemas/ventas.schema";


const router = Router();

//Cuadros de ventas routes
router.get(
  "/cuadros/empresa/:empresa_id",
  [validate(getCuadroVentaByEmpresaSchema), verifyEmpresa],
  get_cuadros_ventas_by_empresa
);
router.get("/cuadros/", verifyAdmin, get_cuadros_ventas);
router.get("/cuadros/:id", validate(getCuadroVentaSchema),get_cuadro_venta);
router.post("/cuadros/", validate(createCuadroVentaSchema), create_cuadro_venta);
router.put("/cuadros/:id", validate(updateCuadroVentaSchema), update_cuadro_venta);
router.delete("/cuadros/:id", validate(deleteCuadroVentaSchema), delete_cuadro_venta);

//Ventas routes
router.get("/empresa/:empresa_id", [validate(getVentaByEmpresaSchema), verifyEmpresa], get_ventas_by_empresa);
router.get("/", verifyAdmin, get_ventas);
router.get("/:id", validate(getVentaSchema),get_venta);
router.post("/", validate(createVentaSchema), create_venta);
router.put("/:id", validate(updateVentaSchema), update_venta);
router.delete("/:id", validate(deleteVentaSchema), delete_venta);

export default router;
