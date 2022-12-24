//Flujo caja

import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { createError } from "../utils/errors";
import {
  updateFlujoCajaSchema,
  createFlujoCajaSchema,
  updateCategoriaSchema,
  createCategoriaSchema,
} from "../schemas/flujo_caja.schema";
import zodToJsonSchema from "zod-to-json-schema";

const prisma = new PrismaClient();

export const get_flujo_caja = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const flujo_caja = await prisma.flujo_caja.findUnique({
      where: { id: +id },
    });
    if (!flujo_caja) {
      return next(createError("Flujo caja not found", 404));
    }

    if (
      req.user.isAdmin ||
      req.user.empresas.includes(+flujo_caja.empresa_id)
    ) {
      res.status(200).json({
        data: flujo_caja,
        updatable: Object.keys(
          zodToJsonSchema(updateFlujoCajaSchema)["properties"]["body"][
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

export const get_flujo_caja_schema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(200)
    .json(
      Object.keys(
        zodToJsonSchema(createFlujoCajaSchema)["properties"]["body"][
          "properties"
        ]
      )
    );
};

export const get_flujo_caja_by_empresa = async (
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

    const flujo_caja = await prisma.flujo_caja.findMany({
      where: { empresa_id: +empresa_id },
    });
    res.status(200).json(flujo_caja);
  } catch (error) {
    next(error);
  }
};

export const create_flujo_caja = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { fecha, empresa_id, saldo_anterior } = req.body;

    console.log(empresa_id);
    const empresa = await prisma.empresa.findUnique({
      where: { id: +empresa_id },
    });

    if (!empresa) {
      return next(createError("Empresa not found", 404));
    }

    if (!req.user.isAdmin && !req.user.empresas.includes(+empresa_id)) {
      return next(createError("Unauthorized", 401));
    }

    const flujo_caja = await prisma.flujo_caja.create({
      data: {
        fecha: new Date(fecha),
        empresa_id: empresa_id,
        saldo_anterior: saldo_anterior || undefined,
      },
    });
    res.status(200).json(flujo_caja);
  } catch (error) {
    next(error);
  }
};

export const update_flujo_caja = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { fecha, empresa_id, saldo_anterior } = req.body;

    const flujo_caja = await prisma.flujo_caja.findUnique({
      where: { id: +id },
    });
    if (
      !req.user.isAdmin &&
      !req.user.empresas.includes(+flujo_caja.empresa_id)
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

      if (!req.user.isAdmin && !req.user.empresas.includes(+empresa_id)) {
        return next(createError("Unauthorized", 401));
      }
    }

    let new_fecha = undefined;
    if (fecha) {
      new_fecha = new Date(fecha);
    }

    const flujo_caja_updated = await prisma.flujo_caja.update({
      where: { id: +id },
      data: {
        fecha: new_fecha,
        empresa_id: empresa_id || undefined,
        saldo_anterior: saldo_anterior || undefined,
      },
    });
    res.status(200).json(flujo_caja_updated);
  } catch (error) {
    next(error);
  }
};

export const delete_flujo_caja = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const flujo_caja = await prisma.flujo_caja.findUnique({
      where: { id: +id },
    });
    if (
      !req.user.isAdmin &&
      !req.user.empresas.includes(+flujo_caja.empresa_id)
    ) {
      return next(createError("Unauthorized", 401));
    }

    const flujo_caja_deleted = await prisma.flujo_caja.delete({
      where: { id: +id },
    });
    res.status(200).json(flujo_caja_deleted);
  } catch (error) {
    next(error);
  }
};

//Categorias

export const get_categoria = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const categoria = await prisma.categoria.findUnique({
      where: { id: +id },
    });
    if (!categoria) {
      return next(createError("Categoria not found", 404));
    }

    //validate auth
    const flujo_caja = await prisma.flujo_caja.findUnique({
      where: { id: +categoria.flujo_caja_id },
    });
    if (
      req.user.isAdmin ||
      req.user.empresas.includes(+flujo_caja.empresa_id)
    ) {
      res.status(200).json({
        data: categoria,
        updatable: Object.keys(
          zodToJsonSchema(updateCategoriaSchema)["properties"]["body"][
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

export const get_categoria_schema = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(200)
    .json(
      Object.keys(
        zodToJsonSchema(createCategoriaSchema)["properties"]["body"][
          "properties"
        ]
      )
    );
};

export const get_categorias_by_flujo_caja = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { flujo_caja_id } = req.params;
    const flujo_caja = await prisma.flujo_caja.findUnique({
      where: { id: +flujo_caja_id },
    });

    if (!flujo_caja) {
      return next(createError("Flujo caja not found", 404));
    }

    //validate auth
    if (
      !req.user.isAdmin &&
      !req.user.empresas.includes(+flujo_caja.empresa_id)
    ) {
      return next(createError("Unauthorized", 401));
    }

    const categorias = await prisma.categoria.findMany({
      where: { flujo_caja_id: +flujo_caja_id },
    });
    res.status(200).json(categorias);
  } catch (error) {
    next(error);
  }
};

export const create_categoria = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      descripcion,
      efectivo,
      datafono,
      transferencia,
      gastos,
      flujo_caja_id,
    } = req.body;

    const flujo_caja = await prisma.flujo_caja.findUnique({
      where: { id: +flujo_caja_id },
    });

    if (!flujo_caja) {
      return next(createError("Flujo caja not found", 404));
    }

    if (
      !req.user.isAdmin &&
      !req.user.empresas.includes(+flujo_caja.empresa_id)
    ) {
      return next(createError("Unauthorized", 401));
    }

    const categoria = await prisma.categoria.create({
      data: {
        descripcion: descripcion.toUpperCase(),
        efectivo: efectivo || undefined,
        datafono: datafono || undefined,
        transferencia: transferencia || undefined,
        gastos: gastos || undefined,
        flujo_caja_id: flujo_caja_id,
      },
    });
    res.status(200).json(categoria);
  } catch (error) {
    next(error);
  }
};

export const update_categoria = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      descripcion,
      efectivo,
      datafono,
      transferencia,
      gastos,
      flujo_caja_id,
    } = req.body;

    //validate auth
    const categoria = await prisma.categoria.findUnique({
      where: { id: +id },
    });

    const flujo_caja = await prisma.flujo_caja.findUnique({
      where: { id: +categoria.flujo_caja_id },
    });

    if (
      !req.user.isAdmin &&
      !req.user.empresas.includes(+flujo_caja.empresa_id)
    ) {
      return next(createError("Unauthorized", 401));
    }

    //Validates new flujo_caja_id
    if (flujo_caja_id) {
      const flujo_caja = await prisma.flujo_caja.findUnique({
        where: { id: +flujo_caja_id },
      });

      if (!flujo_caja) {
        return next(createError("Flujo caja not found", 404));
      }

      if (
        !req.user.isAdmin &&
        !req.user.empresas.includes(+flujo_caja.empresa_id)
      ) {
        return next(createError("Unauthorized", 401));
      }
    }

    const categoria_updated = await prisma.categoria.update({
      where: { id: +id },
      data: {
        descripcion: descripcion || undefined,
        efectivo: efectivo || undefined,
        datafono: datafono || undefined,
        transferencia: transferencia || undefined,
        gastos: gastos || undefined,
        flujo_caja_id: flujo_caja_id || undefined,
      },
    });
    res.status(200).json(categoria_updated);
  } catch (error) {
    next(error);
  }
};

export const delete_categoria = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    //validate auth
    const categoria = await prisma.categoria.findUnique({
      where: { id: +id },
    });

    const flujo_caja = await prisma.flujo_caja.findUnique({
      where: { id: +categoria.flujo_caja_id },
    });

    if (
      !req.user.isAdmin &&
      !req.user.empresas.includes(+flujo_caja.empresa_id)
    ) {
      return next(createError("Unauthorized", 401));
    }

    const categoria_deleted = await prisma.categoria.delete({
      where: { id: +id },
    });
    res.status(200).json(categoria_deleted);
  } catch (error) {
    next(error);
  }
};
