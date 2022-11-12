import { z, AnyZodObject } from "zod";

//Registro ventas
export const createVentaSchema = z.object({
    body: z.object({
        fecha: z.string({
            required_error: "Fecha is required",
            invalid_type_error: "Fecha must be a string"
        }).length(10),
        empresa_id: z.number({
            required_error: "Empresa id is required",
            invalid_type_error: "Empresa id must be a number"
        }).positive(),
        cantidad: z.number({
            required_error: "Cantidad is required",
            invalid_type_error: "Cantidad must be a number"
        }).positive(),
        producto: z.string({
            required_error: "Producto is required",
            invalid_type_error: "Producto must be a string"
        }).max(20),
        valor_total: z.number({
            required_error: "Valor total is required",
            invalid_type_error: "Valor total must be a number"
        }).positive()
    }),
});

export const updateVentaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }),
    body: z.object({
        fecha: z.optional(
            z.string({
                required_error: "Fecha is required",
                invalid_type_error: "Fecha must be a string"
            }).length(10)
        ),
        empresa_id: z.optional(
            z.number({
                required_error: "Empresa id is required",
                invalid_type_error: "Empresa id must be a number"
            }).positive()
        ),
        cantidad: z.optional(
            z.number({
                required_error: "Cantidad is required",
                invalid_type_error: "Cantidad must be a number"
            }).positive()
        ),
        producto: z.optional(
            z.string({
                required_error: "Producto is required",
                invalid_type_error: "Producto must be a string"
            }).max(20)
        ),
        valor_total: z.optional(
            z.number({
                required_error: "Valor total is required",
                invalid_type_error: "Valor total must be a number"
            }).positive()
        )
    }),
});

export const getVentaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }),
});

export const getVentaByEmpresaSchema = z.object({
    params: z.object({
        empresa_id: z.string({
            required_error: "Empresa id is required",
            invalid_type_error: "Empresa id must be a number"
        }),
    }),
});

export const deleteVentaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }),
});

// Schemas for cuadro ventas
export const createCuadroVentaSchema = z.object({
    body: z.object({
        empresa_id : z.number({
            required_error: "Empresa id is required",
            invalid_type_error: "Empresa id must be a number"
        }).positive(),
        ventas_mañana: z.optional(
            z.number({
                required_error: "Ventas mañana is required",
                invalid_type_error: "Ventas mañana must be a number"
            }).positive()
        ),
        ventas_tarde: z.optional(
            z.number({
                required_error: "Ventas tarde is required",
                invalid_type_error: "Ventas tarde must be a number"
            }).positive()
        ),
        efectivo: z.optional(
            z.number({
                required_error: "Efectivo is required",
                invalid_type_error: "Efectivo must be a number"
            }).positive()
        ),
        datafono: z.optional(
            z.number({
                required_error: "Datafono is required",
                invalid_type_error: "Datafono must be a number"
            }).positive()
        ),
        transferencia: z.optional(
            z.number({
                required_error: "Transferencia is required",
                invalid_type_error: "Transferencia must be a number"
            }).positive()
        ),
        propinas: z.optional(
            z.number({
                required_error: "Propinas is required",
                invalid_type_error: "Propinas must be a number"
            }).positive()
        ),
        iva: z.optional(
            z.number({
                required_error: "Iva is required",
                invalid_type_error: "Iva must be a number"
            }).positive()
        ),
        hipoconsumo: z.optional(
            z.number({
                required_error: "Hipoconsumo is required",
                invalid_type_error: "Hipoconsumo must be a number"
            }).positive()
        ),
        tks: z.optional(
            z.number({
                required_error: "Tks is required",
                invalid_type_error: "Tks must be a number"
            }).positive()
        ),
        epayco: z.optional(
            z.number({
                required_error: "Epayco is required",
                invalid_type_error: "Epayco must be a number"
            }).positive()
        ),
        ventas_cafe: z.optional(
            z.number({
                required_error: "Ventas cafe is required",
                invalid_type_error: "Ventas cafe must be a number"
            }).positive()
        ),
        ventas_bar: z.optional(
            z.number({
                required_error: "Ventas bar is required",
                invalid_type_error: "Ventas bar must be a number"
            }).positive()
        ),
        ventas_mercado: z.optional(
            z.number({
                required_error: "Ventas mercado is required",
                invalid_type_error: "Ventas mercado must be a number"
            }).positive()
        ),
        gastos_caja_menor: z.optional(
            z.number({
                required_error: "Gastos caja menor is required",
                invalid_type_error: "Gastos caja menor must be a number"
            }).positive()
        ),
        fecha: z.string({
            required_error: "Fecha is required",
            invalid_type_error: "Fecha must be a string"
        }).length(10)
    }),
});

export const updateCuadroVentaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }),
    body: z.object({
        empresa_id : z.optional(
            z.number({
                required_error: "Empresa id is required",
                invalid_type_error: "Empresa id must be a number"
            }).positive()
        ),
        ventas_mañana: z.optional(
            z.number({
                required_error: "Ventas mañana is required",
                invalid_type_error: "Ventas mañana must be a number"
            }).positive()
        ),
        ventas_tarde: z.optional(
            z.number({
                required_error: "Ventas tarde is required",
                invalid_type_error: "Ventas tarde must be a number"
            }).positive()
        ),
        efectivo: z.optional(
            z.number({
                required_error: "Efectivo is required",
                invalid_type_error: "Efectivo must be a number"
            }).positive()
        ),
        datafono: z.optional(
            z.number({
                required_error: "Datafono is required",
                invalid_type_error: "Datafono must be a number"
            }).positive()
        ),
        transferencia: z.optional(
            z.number({
                required_error: "Transferencia is required",
                invalid_type_error: "Transferencia must be a number"
            }).positive()
        ),
        propinas: z.optional(
            z.number({
                required_error: "Propinas is required",
                invalid_type_error: "Propinas must be a number"
            }).positive()
        ),
        iva: z.optional(
            z.number({
                required_error: "Iva is required",
                invalid_type_error: "Iva must be a number"
            }).positive()
        ),
        hipoconsumo: z.optional(
            z.number({
                required_error: "Hipoconsumo is required",
                invalid_type_error: "Hipoconsumo must be a number"
            }).positive()
        ),
        tks: z.optional(
            z.number({
                required_error: "Tks is required",
                invalid_type_error: "Tks must be a number"
            }).positive()
        ),
        epayco: z.optional(
            z.number({
                required_error: "Epayco is required",
                invalid_type_error: "Epayco must be a number"
            }).positive()
        ),
        ventas_cafe: z.optional(
            z.number({
                required_error: "Ventas cafe is required",
                invalid_type_error: "Ventas cafe must be a number"
            }).positive()
        ),
        ventas_bar: z.optional(
            z.number({
                required_error: "Ventas bar is required",
                invalid_type_error: "Ventas bar must be a number"
            }).positive()
        ),
        ventas_mercado: z.optional(
            z.number({
                required_error: "Ventas mercado is required",
                invalid_type_error: "Ventas mercado must be a number"
            }).positive()
        ),
        gastos_caja_menor: z.optional(
            z.number({
                required_error: "Gastos caja menor is required",
                invalid_type_error: "Gastos caja menor must be a number"
            }).positive()
        ),
        fecha: z.optional(
            z.string({
                required_error: "Fecha is required",
                invalid_type_error: "Fecha must be a string"
            }).length(10)
        )
    }),
});

export const getCuadroVentaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }),
});

export const getCuadroVentaByEmpresaSchema = z.object({
    params: z.object({
        empresa_id: z.string({
            required_error: "Empresa id is required",
            invalid_type_error: "Empresa id must be a number"
        }),
    }),
});

export const deleteCuadroVentaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }),
});

