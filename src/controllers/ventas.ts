//Cuadro de ventas y Registro de ventas
import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { createError } from "../utils/errors";
import { exportData } from "../utils/export";
import {
  updateCuadroVentaSchema,
  createCuadroVentaSchema,
  updateVentaSchema,
  createVentaSchema,
} from "../schemas/ventas.schema";
import zodToJsonSchema from "zod-to-json-schema";

const prisma = new PrismaClient();

export const get_ventas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ventas = await prisma.registro_ventas.findMany();
    //Validates user is admin or belongs to the empresa
    res.status(200).json(ventas);
  } catch (error) {
    next(error);
  }
};

export const get_venta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const venta = await prisma.registro_ventas.findUnique({
      where: { id: +id },
    });
    if (!venta) {
      return next(createError("Venta not found", 404));
    }
    //Validates user is admin or belongs to the empresa
    if (req.user.isAdmin || req.user.empresas.includes(+venta.empresa_id)) {
      res.status(200).json({
        data: venta,
        updatable: Object.keys(
          zodToJsonSchema(updateVentaSchema)["properties"]["body"]["properties"]
        ),
      });
    } else {
      next(createError("Unauthorized", 401));
    }
  } catch (error) {
    next(error);
  }
};

export const get_venta_schema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(200)
    .json(
      Object.keys(
        zodToJsonSchema(createVentaSchema)["properties"]["body"]["properties"]
      )
    );
};

export const get_ventas_by_empresa = async (
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

    const ventas = await prisma.registro_ventas.findMany({
      where: { empresa_id: +empresa_id },
      orderBy:{
        fecha: 'desc'
      }
    });
    res.status(200).json(ventas);
  } catch (error) {
    next(error);
  }
};

export const get_export_ventas = async (
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

  const ventas = await prisma.registro_ventas.findMany({
    where: {
      empresa_id: +empresa_id,
    },
    orderBy:{
      fecha: 'desc'
    }
  });
  try {
    const workbook = exportData(ventas);

    if (workbook == null) {
      return next(createError("Empresa without data", 404))
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

export const create_venta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fecha, empresa_id, cantidad, producto, valor_total } = req.body;

    const empresa = await prisma.empresa.findUnique({
      where: { id: +empresa_id },
    });

    if (!empresa) {
      return next(createError("Empresa not found", 404));
    }
    if (!req.user.isAdmin && !req.user.empresas.includes(+empresa_id)) {
      return next(createError("Unauthorized", 401));
    }

    const venta = await prisma.registro_ventas.create({
      data: {
        fecha: new Date(fecha),
        empresa_id: empresa_id,
        cantidad: cantidad,
        producto: producto.toUpperCase(),
        valor_total: valor_total,
      },
    });
    res.status(201).json(venta);
  } catch (error) {
    next(error);
  }
};

export const update_venta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { fecha, empresa_id, cantidad, producto, valor_total } = req.body;

    //Checks if venta is in the empresas of the user
    const venta = await prisma.registro_ventas.findUnique({
      where: { id: +id },
    });
    if (!req.user.isAdmin && !req.user.empresas.includes(+venta.empresa_id)) {
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

    const updated_venta = await prisma.registro_ventas.update({
      where: { id: +id },
      data: {
        fecha: new_fecha,
        empresa_id: empresa_id || undefined,
        cantidad: cantidad || undefined,
        producto: producto || undefined,
        valor_total: valor_total || undefined,
      },
    });
    res.status(200).json(updated_venta);
  } catch (error) {
    next(error);
  }
};

export const delete_venta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const venta = await prisma.registro_ventas.findUnique({
      where: { id: +id },
    });
    if (!venta) {
      return next(createError("Venta not found", 404));
    }

    //Checks if venta is in the empresas of the user
    if (!req.user.isAdmin && !req.user.empresas.includes(+venta.empresa_id)) {
      return next(createError("Unauthorized", 401));
    }

    await prisma.registro_ventas.delete({
      where: { id: +id },
    });
    res.status(200).json(venta);
  } catch (error) {
    next(error);
  }
};

//Cuadros ventas
export const get_cuadros_ventas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cuadro_ventas = await prisma.cuadro_ventas.findMany();
    res.status(200).json(cuadro_ventas);
  } catch (error) {
    next(error);
  }
};

export const get_cuadro_venta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const cuadro_venta = await prisma.cuadro_ventas.findUnique({
      where: { id: +id },
    });
    if (!cuadro_venta) {
      return next(createError("Cuadro venta not found", 404));
    }

    if (
      req.user.isAdmin ||
      req.user.empresas.includes(+cuadro_venta.empresa_id)
    ) {
      res.status(200).json({
        data: cuadro_venta,
        updatable: Object.keys(
          zodToJsonSchema(updateCuadroVentaSchema)["properties"]["body"][
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

export const get_cuadro_venta_schema = async (
  req: Response,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(200)
    .json(
      Object.keys(
        zodToJsonSchema(createCuadroVentaSchema)["properties"]["body"][
          "properties"
        ]
      )
    );
};

export const get_cuadros_ventas_by_empresa = async (
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

    const cuadro_ventas = await prisma.cuadro_ventas.findMany({
      where: { empresa_id: +empresa_id },
      orderBy:{
        fecha: 'desc'
      }
    });
    res.status(200).json(cuadro_ventas);
  } catch (error) {
    next(error);
  }
};

export const get_export_cuadro_ventas = async (
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

  const cuadro_ventas = await prisma.cuadro_ventas.findMany({
    where: {
      empresa_id: +empresa_id,
    },
    orderBy:{
      fecha: 'desc'
    }
  });
  try {
    const workbook = exportData(cuadro_ventas);

    if (workbook == null) {
      return next(createError("Empresa without data", 404))
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

export const create_cuadro_venta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      fecha,
      empresa_id,
      ventas_mañana,
      ventas_tarde,
      ventas_totales,
      efectivo,
      datafono,
      transferencia,
      propinas,
      iva,
      hipoconsumo,
      tks,
      tks_promedio,
      rappi,
      ventas_cafe,
      ventas_bar,
      ventas_mercado,
      gastos_caja_menor,
      horas_reserva,
    } = req.body;

    const empresa = await prisma.empresa.findUnique({
      where: { id: +empresa_id },
    });

    if (!empresa) {
      return next(createError("Empresa not found", 404));
    }
    if (!req.user.isAdmin && !req.user.empresas.includes(+empresa_id)) {
      return next(createError("Unauthorized", 401));
    }

    const cuadro_venta = await prisma.cuadro_ventas.create({
      data: {
        fecha: new Date(fecha),
        empresa_id: empresa_id,
        ventas_ma_ana: ventas_mañana,
        ventas_tarde: ventas_tarde,
        ventas_totales: ventas_totales,
        efectivo: efectivo,
        datafono: datafono,
        transferencia: transferencia,
        propinas: propinas,
        iva: iva,
        hipoconsumo: hipoconsumo,
        tks: tks,
        tks_promedio: tks_promedio,
        rappi: rappi,
        ventas_cafe: ventas_cafe,
        ventas_bar: ventas_bar,
        ventas_mercado: ventas_mercado,
        gastos_caja_menor: gastos_caja_menor,
        horas_reserva: horas_reserva,
      },
    });
    res.status(201).json(cuadro_venta);
  } catch (error) {
    next(error);
  }
};

export const update_cuadro_venta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      fecha,
      empresa_id,
      ventas_mañana,
      ventas_tarde,
      ventas_totales,
      efectivo,
      datafono,
      transferencia,
      propinas,
      iva,
      hipoconsumo,
      tks,
      tks_promedio,
      rappi,
      ventas_cafe,
      ventas_bar,
      ventas_mercado,
      gastos_caja_menor,
      horas_reserva,
    } = req.body;

    //Validates if cuadro ventas exists and if the user is authorized
    const cuadro_venta = await prisma.cuadro_ventas.findUnique({
      where: { id: +id },
    });
    if (
      !req.user.isAdmin &&
      !req.user.empresas.includes(+cuadro_venta.empresa_id)
    ) {
      return next(createError("Unauthorized", 401));
    }

    if (empresa_id) {
      const empresa = await prisma.empresa.findUnique({
        where: { id: +empresa_id },
      });
      if (!empresa) {
        return next(createError("Empresa not found", 404));
      }
      //Validates if the user is authorized in the new empresa
      if (!req.user.isAdmin && !req.user.empresas.includes(+empresa_id)) {
        return next(createError("Unauthorized", 401));
      }
    }

    const new_fecha = fecha ? new Date(fecha) : undefined;

    const updated_cuadro_venta = await prisma.cuadro_ventas.update({
      where: { id: +id },
      data: {
        fecha: new_fecha,
        empresa_id: empresa_id || undefined,
        ventas_ma_ana: ventas_mañana || undefined,
        ventas_tarde: ventas_tarde || undefined,
        ventas_totales: ventas_totales || undefined,
        efectivo: efectivo || undefined,
        datafono: datafono || undefined,
        transferencia: transferencia || undefined,
        propinas: propinas || undefined,
        iva: iva || undefined,
        hipoconsumo: hipoconsumo || undefined,
        tks: tks || undefined,
        tks_promedio: tks_promedio || undefined,
        rappi: rappi || undefined,
        ventas_cafe: ventas_cafe || undefined,
        ventas_bar: ventas_bar || undefined,
        ventas_mercado: ventas_mercado || undefined,
        gastos_caja_menor: gastos_caja_menor || undefined,
        horas_reserva: horas_reserva || undefined,
      },
    });
    res.status(200).json(updated_cuadro_venta);
  } catch (error) {
    next(error);
  }
};

export const delete_cuadro_venta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    //Validates if cuadro ventas exists and if the user is authorized
    const cuadro_venta = await prisma.cuadro_ventas.findUnique({
      where: { id: +id },
    });
    if (
      !req.user.isAdmin &&
      !req.user.empresas.includes(+cuadro_venta.empresa_id)
    ) {
      return next(createError("Unauthorized", 401));
    }

    const cuadro_venta_deleted = await prisma.cuadro_ventas.delete({
      where: { id: +id },
    });

    res.status(200).json(cuadro_venta_deleted);
  } catch (error) {
    next(error);
  }
};
