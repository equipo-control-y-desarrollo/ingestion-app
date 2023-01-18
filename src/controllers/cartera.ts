//Cartera
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { createError } from "../utils/errors";
import { exportData } from "../utils/export";
import {
  updateCarteraSchema,
  createCarteraSchema,
} from "../schemas/cartera.schema";
import zodToJsonSchema from "zod-to-json-schema";

const prisma = new PrismaClient();

export const get_cartera = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const cartera = await prisma.cartera.findUnique({
      where: { id: +id },
    });
    if (!cartera) {
      return next(createError("Cartera not found", 404));
    }

    //Validates user is admin or belongs to the empresa
    if (req.user.isAdmin || req.user.empresas.includes(+cartera.empresa_id)) {
      return res.status(200).json({
        data: cartera,
        updatable: Object.keys(
          zodToJsonSchema(updateCarteraSchema)["properties"]["body"][
            "properties"
          ]
        ),
      });
    } else {
      next(createError("Unauthorized", 401));
    }
  } catch (error) {
    next(error);
  }
};

export const get_carteras = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const carteras = await prisma.cartera.findMany();
    res.status(200).json(carteras);
  } catch (error) {
    next(error);
  }
};

export const get_cartera_schema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(200)
    .json(
      zodToJsonSchema(createCarteraSchema)["properties"]["body"]["properties"]
    );
};

export const get_export_cartera = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const empresa_id = req.params.empresa_id;

  const empresa = await prisma.empresa.findUnique({
    where: { id: +empresa_id },
  });
  if (!empresa) {
    return next(createError("Empresa not found", 404));
  }

  const cuentas = await prisma.cartera.findMany({
    where: {
      empresa_id: +empresa_id,
    },
    orderBy:{
      fecha_factura: 'desc'
    }
  });
  try {
    const workbook = exportData(cuentas);

    if (workbook == null) {
      return next(createError("Empresa without data", 404));
    }

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "export.xlsx"
    );
    workbook.xlsx.write(res);
  } catch (err) {
    next(err);
  }
};

export const get_carteras_by_empresa = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { empresa_id } = req.params;
    const empresa = await prisma.empresa.findUnique({
      where: { id: +empresa_id },
    });
    if (!empresa) {
      return next(createError("Empresa not found", 404));
    }

    const carteras = await prisma.cartera.findMany({
      where: { empresa_id: +empresa_id },
      orderBy:{
        fecha_factura: 'desc'
      }
    });
    res.status(200).json(carteras);
  } catch (error) {
    next(error);
  }
};

export const create_cartera = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      valor,
      valor_abonado,
      fecha_factura,
      fecha_vencimiento,
      estado,
      nro_factura,
      proyecto,
      empresa_id,
    } = req.body;

    //Validates user is admin or belongs to the empresa
    if (!req.user.isAdmin && !req.user.empresas.includes(+empresa_id)) {
      next(createError("Unauthorized", 401));
    }

    const empresa = await prisma.empresa.findUnique({
      where: { id: +empresa_id },
    });
    if (!empresa) {
      return next(createError("Empresa not found", 404));
    }

    const cartera = await prisma.cartera.create({
      data: {
        empresa_id: empresa_id,
        valor: valor,
        valor_abonado: valor_abonado || undefined,
        fecha_factura: new Date(fecha_factura),
        fecha_vencimiento: new Date(fecha_vencimiento),
        estado: estado || undefined,
        nro_factura: nro_factura,
        proyecto: proyecto,
      },
    });
    res.status(200).json(cartera);
  } catch (error) {
    next(error);
  }
};

export const update_cartera = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      valor,
      valor_abonado,
      fecha_factura,
      fecha_vencimiento,
      estado,
      nro_factura,
      proyecto,
      empresa_id,
    } = req.body;

    if (empresa_id) {
      //Validates user is admin or belongs to the empresa
      if (!req.user.isAdmin && !req.user.empresas.includes(+empresa_id)) {
        next(createError("Unauthorized", 401));
      }
      const empresa = await prisma.empresa.findUnique({
        where: { id: +empresa_id },
      });
      if (!empresa) {
        return next(createError("Empresa not found", 404));
      }
    }

    //Checks if user belongs to cartera's empresa
    let cartera = await prisma.cartera.findUnique({
      where: { id: +id },
    });
    if (!req.user.isAdmin && !req.user.empresas.includes(+cartera.empresa_id)) {
      next(createError("Unauthorized", 401));
    }

    const new_fecha_factura = fecha_factura
      ? new Date(fecha_factura)
      : undefined;
    const new_fecha_vencimiento = fecha_vencimiento
      ? new Date(fecha_vencimiento)
      : undefined;

    const cartera_update = await prisma.cartera.update({
      where: { id: +id },
      data: {
        empresa_id: empresa_id || undefined,
        valor: valor || undefined,
        valor_abonado: valor_abonado || undefined,
        fecha_factura: new_fecha_factura,
        fecha_vencimiento: new_fecha_vencimiento,
        estado: estado || undefined,
        nro_factura: nro_factura || undefined,
        proyecto: proyecto || undefined,
      },
    });
    res.status(200).json(cartera_update);
  } catch (error) {
    next(error);
  }
};

export const delete_cartera = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    //Checks if user belongs to cartera's empresa
    let cartera = await prisma.cartera.findUnique({
      where: { id: +id },
    });
    if (!req.user.isAdmin && !req.user.empresas.includes(+cartera.empresa_id)) {
      next(createError("Unauthorized", 401));
    }

    const cartera_delete = await prisma.cartera.delete({
      where: { id: +id },
    });
    res.status(200).json(cartera_delete);
  } catch (error) {
    next(error);
  }
};
