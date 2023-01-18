import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { createError } from "../utils/errors";
import { exportData } from "../utils/export";
import { updateGastoSchema, createGastoSchema } from "../schemas/gasto.schema";
import zodToJsonSchema from "zod-to-json-schema";

const prisma = new PrismaClient();

export const get_gastos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gastos = await prisma.gasto.findMany();
    res.status(200).json(gastos);
  } catch (error) {
    next(error);
  }
};

export const get_gasto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const gasto = await prisma.gasto.findUnique({
      where: { id: +id },
    });
    if (!gasto) {
      return next(createError("gasto not found", 404));
    }

    if (req.user.isAdmin || req.user.empresas.includes(+gasto.empresa_id)) {
      res.status(200).json({
        data: gasto,
        updatable: Object.keys(
          zodToJsonSchema(updateGastoSchema)["properties"]["body"]["properties"]
        ),
      });
    } else {
      next(createError("Unauthorized", 401));
    }
  } catch (error) {
    next(error);
  }
};

export const get_gastos_schema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(200)
    .json(
      Object.keys(
        zodToJsonSchema(createGastoSchema)["properties"]["body"]["properties"]
      )
    );
};

export const get_gastos_by_empresa = async (
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
        
            const gastos = await prisma.gasto.findMany({
              where: { empresa_id: +empresa_id },
            });
            res.json(gastos);
          } catch (error) {
            next(error);
          }
        };
    


export const get_export_gasto = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const empresa_id = req.params.empresa_id;
  
    const empresa = await prisma.empresa.findUnique({
      where: { id: +empresa_id },
    });
    if (!empresa) {
      return next(createError("empresa not found", 404));
    }
  
    const gasto = await prisma.gasto.findMany({
      where: {
        empresa_id: +empresa_id,
      },
    });
    try {
      const workbook = exportData(gasto);
  
      if (workbook == null) {
        return next(createError("empresa without data", 404))
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
      next(err)
    }
  };

export const create_gasto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fecha, valor_total, empresa_id, nombre } = req.body;

    const empresa = await prisma.empresa.findUnique({
      where: { id: +empresa_id },
    });

    if (!empresa) {
      return next(createError("Empresa not found", 404));
    }
    if (!req.user.isAdmin && !req.user.empresas.includes(+empresa_id)) {
      return next(createError("Unauthorized", 401));
    }

    const gasto = await prisma.gasto.create({
      data: {
        fecha: new Date(fecha),
        valor_total: +valor_total,
        empresa_id: +empresa_id,
        nombre: nombre,
      },
    });
    res.status(200).json(gasto);
  } catch (error) {
    next(error);
  }
};

export const update_gasto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { fecha, empresa_id, nombre, valor_total } = req.body;

    //Checks if gasto is in the empresas of the user
    const gasto = await prisma.gasto.findUnique({
      where: { id: +id },
    });
    if (!req.user.isAdmin && !req.user.empresas.includes(+gasto.empresa_id)) {
      return next(createError("Unauthorized", 401));
    }

    if (empresa_id) {
      const empresa = await prisma.empresa.findUnique({
        where: { id: +empresa_id },
      });
      if (!empresa) {
        return next(createError("Empresa not found", 404));
      }
      //Validates if new empresa is owned by the user
      if (!req.user.isAdmin && !req.user.empresas.includes(+empresa_id)) {
        return next(createError("Unauthorized", 401));
      }
    }

    const new_fecha = fecha ? new Date(fecha) : undefined;

    const updated_gasto = await prisma.gasto.update({
      where: { id: +id },
      data: {
        fecha: new_fecha,
        empresa_id: empresa_id || undefined,
        nombre: nombre || undefined,
        valor_total: valor_total || undefined,
      },
    });
    res.status(200).json(updated_gasto);
  } catch (error) {
    next(error);
  }
};

export const delete_gasto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const gasto = await prisma.gasto.findUnique({
      where: { id: +id },
    });
    if (!req.user.isAdmin && !req.user.empresas.includes(+gasto.empresa_id)) {
      return next(createError("Unauthorized", 401));
    }
    await prisma.gasto.delete({
      where: { id: +id },
    });
    res.status(200).json({ message: "gasto deleted" });
  } catch (error) {
    next(error);
  }
};
