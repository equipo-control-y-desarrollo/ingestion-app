import { z, AnyZodObject } from "zod";

export const createFlujoCajaSchema = z.object({
    body: z.object({
        fecha: z.string({
            required_error: "Fecha is required",
            invalid_type_error: "Fecha must be a string"
        }).length(10),
        empresa_id: z.number({
            required_error: "Empresa id is required",
            invalid_type_error: "Empresa id must be a number"
        }).nonnegative(),
        saldo_anterior: z.number({
            required_error: "Saldo anterior is required",
            invalid_type_error: "Saldo anterior must be a number"
        }).nonnegative(),
    }).strict(),
});

export const updateFlujoCajaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
    body: z.object({
        fecha: z.optional(
            z.string({
                invalid_type_error: "Fecha must be a string"
            }).length(10)
        ),
        empresa_id: z.optional(
            z.number({
                invalid_type_error: "Empresa id must be a number"
            }).nonnegative()
        ),
        saldo_anterior: z.optional(
            z.number({
                invalid_type_error: "Saldo anterior must be a number"
            }).nonnegative()
        ),
    }).strict(),
});

export const deleteFlujoCajaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
});

export const getFlujoCajaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
});

export const getFlujoCajaByEmpresaSchema = z.object({
    params: z.object({
        empresa_id: z.string({
            required_error: "Empresa_id is required",
            invalid_type_error: "Empresa_id must be a number"
        }),
    }).strict(),
});

//Categorias

export const createCategoriaSchema = z.object({
    body: z.object({
        flujo_caja_id: z.number({
            required_error: "Flujo_caja_id is required",
            invalid_type_error: "Flujo_caja_id must be a number"
        }).nonnegative(),
        descripcion: z.string({
            required_error: "Descripcion is required",
            invalid_type_error: "Descripcion must be a string"
        }).max(20),
        efectivo: z.optional(
            z.number({
                invalid_type_error: "Efectivo must be a number"
            }).nonnegative()
        ),
        datafono: z.optional(
            z.number({
                invalid_type_error: "Datafono must be a number"
            }).nonnegative()
        ),
        transferencia: z.optional(
            z.number({
                invalid_type_error: "Transferencia must be a number"
            }).nonnegative()
        ),
        gastos: z.optional(
            z.number({
                invalid_type_error: "Gastos must be a number"
            }).nonnegative()
        ),
    }).strict(),
});

export const updateCategoriaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
    body: z.object({
        flujo_caja_id: z.optional(
            z.number({
                invalid_type_error: "Flujo_caja_id must be a number"
            }).nonnegative()
        ),
        descripcion: z.optional(
            z.string({
                invalid_type_error: "Descripcion must be a string"
            }).max(20)
        ),
        efectivo: z.optional(
            z.number({
                invalid_type_error: "Efectivo must be a number"
            }).nonnegative()
        ),
        datafono: z.optional(
            z.number({
                invalid_type_error: "Datafono must be a number"
            }).nonnegative()
        ),
        transferencia: z.optional(
            z.number({
                invalid_type_error: "Transferencia must be a number"
            }).nonnegative()
        ),
        gastos: z.optional(
            z.number({
                invalid_type_error: "Gastos must be a number"
            }).nonnegative()
        ),
    }).strict(),
});

export const deleteCategoriaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
});

export const getCategoriaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
});

export const getCategoriaByFlujoCajaSchema = z.object({
    params: z.object({
        flujo_caja_id: z.string({
            required_error: "Flujo_caja_id is required",
            invalid_type_error: "Flujo_caja_id must be a number"
        }),
    }).strict(),
});


