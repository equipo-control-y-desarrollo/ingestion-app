import { z, AnyZodObject } from "zod";

export const createCuentaSchema = z.object({
    body: z.object({
        banco: z.string({
            required_error: "Banco is required",
            invalid_type_error: "Banco must be a string"
        }).max(20),
        empresa_id: z.number({
            required_error: "Empresa_id is required",
            invalid_type_error: "Empresa_id must be a number"
        }).nonnegative(),
        tipo: z.enum(['corriente', 'ahorros', 'fiducuenta'],{
            required_error: "tipo is required", 
            invalid_type_error: "tipo must be a string"
        }),
        numero: z.string({
            required_error: "Numero is required",
            invalid_type_error: "Numero must be a string"
        }).max(20),
    }).strict(),
});

export const updateCuentaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
    body: z.object({
        banco: z.optional(
            z.string({
                invalid_type_error: "Banco must be a string"
            }).max(20)
        ),
        empresa_id: z.optional(
            z.number({
                invalid_type_error: "Empresa_id must be a number"
            }).nonnegative()
        ),
        tipo: z.optional(
            z.enum(['corriente', 'ahorros', 'fiducuenta'],{
                invalid_type_error: "tipo must be a string"
            })
        ),
        numero: z.optional(
            z.string({
                invalid_type_error: "Numero must be a string"
            }).max(20)
        ),
    }).strict(),
});

export const deleteCuentaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
});

export const getCuentaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
});

export const getCuentaByEmpresaSchema = z.object({
    params: z.object({
        empresa_id: z.string({
            required_error: "Empresa_id is required",
            invalid_type_error: "Empresa_id must be a number"
        }),
    }).strict(),
});

//Movimientos
export const createMovimientoSchema = z.object({
    body: z.object({
        cuenta_id: z.number({
            required_error: "Cuenta_id is required",
            invalid_type_error: "Cuenta_id must be a number"
        }).nonnegative(),
        fecha: z.string({
            required_error: "Fecha is required",
            invalid_type_error: "Fecha must be a string"
        }),
        saldo_inicial: z.number({
            required_error: "Saldo_inicial is required",
            invalid_type_error: "Saldo_inicial must be a number"
        }).nonnegative(),
        ingreso: z.optional(
            z.number({
                invalid_type_error: "Ingreso must be a number"
            }).nonnegative()
        ),
        pago: z.optional(
            z.number({
                invalid_type_error: "Pago must be a number"
            }).nonnegative()
        ),
        pago_impuesto: z.optional(
            z.number({
                invalid_type_error: "Pago_impuesto must be a number"
            }).nonnegative()
        ),
        gasto_bancario: z.optional(
            z.number({
                invalid_type_error: "Gasto_bancario must be a number"
            }).nonnegative()
        ),
        }).strict(),
});

export const updateMovimientoSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
    body: z.object({
        cuenta_id: z.optional(
            z.number({
                invalid_type_error: "Cuenta_id must be a number"
            }).nonnegative()
        ),
        fecha: z.optional(
            z.string({
                invalid_type_error: "Fecha must be a string"
            })
        ),
        saldo_inicial: z.optional(
            z.number({
                invalid_type_error: "Saldo_inicial must be a number"
            }).nonnegative()
        ),
        ingreso: z.optional(
            z.number({
                invalid_type_error: "Ingreso must be a number"
            }).nonnegative()
        ),
        pago: z.optional(
            z.number({
                invalid_type_error: "Pago must be a number"
            }).nonnegative()
        ),
        pago_impuesto: z.optional(
            z.number({
                invalid_type_error: "Pago_impuesto must be a number"
            }).nonnegative()
        ),
        gasto_bancario: z.optional(
            z.number({
                invalid_type_error: "Gasto_bancario must be a number"
            }).nonnegative()
        ),
    }).strict(),
});

export const deleteMovimientoSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
});

export const getMovimientoSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
});

export const getMovimientoByCuentaSchema = z.object({
    params: z.object({
        cuenta_id: z.string({
            required_error: "Cuenta_id is required",
            invalid_type_error: "Cuenta_id must be a number"
        }),
    }).strict(),
});


