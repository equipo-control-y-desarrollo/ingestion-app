import { z, AnyZodObject } from "zod";

export const createCuentaPendienteSchema = z.object({
    body: z.object({
        proyecto: z.string({
            required_error: "Proyecto is required",
            invalid_type_error: "Proyecto must be a string"
        }).max(60),
        nit: z.string({
            required_error: "Nit is required",
            invalid_type_error: "Nit must be a string"
        }),
        proveedor: z.optional(
            z.string({
                invalid_type_error: "Proveedor must be a string"
            }).max(100)
        ),
        nfactura: z.optional(
            z.string({
                invalid_type_error: "Numero factura must be a string"
            }).max(20)
        ),
        fecha_recibido: z.string({
            required_error: "Fecha recibido is required",
            invalid_type_error: "Fecha recibido must be a string"
        }),
        fecha_vencida: z.string({
            required_error: "Fecha vencida is required",
            invalid_type_error: "Fecha vencida must be a string"
        }),
        estado: z.optional(
            z.string({
                invalid_type_error: "Estado must be a string"
            }).max(20),
        ),
        inmediato: z.optional(
            z.number({
                invalid_type_error: "Inmediato must be a number"
            }).nonnegative()
        ),
        dias_30: z.optional(
            z.number({
                invalid_type_error: "Dias 30 must be a number"
            }).nonnegative()
        ),
        dias_60: z.optional(
            z.number({
                invalid_type_error: "Dias 60 must be a number"
            }).nonnegative()
        ),
        empresa_id: z.number({
            required_error: "Empresa id is required",
            invalid_type_error: "Empresa id must be a number"
        }).nonnegative(),
    }).strict(),
});

export const updateCuentaPendienteSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
    body: z.object({
        proyecto: z.optional(
            z.string({
                invalid_type_error: "Proyecto must be a string"
            }).max(60),
        ),
        nit: z.optional(
            z.string({
                invalid_type_error: "Nit must be a string"
            })
        ),
        proveedor: z.optional(
            z.string({
                invalid_type_error: "Proveedor must be a string"
            }).max(100)
        ),
        nfactura: z.optional(
            z.string({
                invalid_type_error: "Numero factura must be a string"
            }).max(20)
        ),
        fecha_recibido: z.optional(
            z.string({
                invalid_type_error: "Fecha recibido must be a string"
            })
        ),
        fecha_vencida: z.optional(
            z.string({
                invalid_type_error: "Fecha vencida must be a string"
            })
        ),
        estado: z.optional(
            z.string({
                invalid_type_error: "Estado must be a string"
            }).max(20),
        ),
        inmediato: z.optional(
            z.number({
                invalid_type_error: "Inmediato must be a number"
            }).nonnegative()
        ),
        dias_30: z.optional(
            z.number({
                invalid_type_error: "Dias 30 must be a number"
            }).nonnegative()
        ),
        dias_60: z.optional(
            z.number({
                invalid_type_error: "Dias 60 must be a number"
            }).nonnegative()
        ),
        empresa_id: z.optional(
            z.number({
                invalid_type_error: "Empresa id must be a number"
            }).nonnegative()
        ),
    }).strict(),
});

export const deleteCuentaPendienteSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
});

export const getCuentaPendienteSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
});

export const getCuentaPendienteByEmpresaSchema = z.object({
    params: z.object({
        empresa_id: z.string({
            required_error: "Empresa id is required",
            invalid_type_error: "Empresa id must be a number"
        }),
    }).strict(),
});
