import { z, AnyZodObject } from "zod";

export const createCarteraSchema = z.object({
    body: z.object({
        valor: z.number({
            required_error: "Valor is required",
            invalid_type_error: "Valor must be a number"
        }).nonnegative(),
        valor_abonado: z.number({
            required_error: "Valor abonado is required",
            invalid_type_error: "Valor abonado must be a number"
        }).nonnegative(),
        fecha_factura: z.string({
            required_error: "Fecha factura is required",
            invalid_type_error: "Fecha factura must be a string"
        }),
        fecha_vencimiento: z.string({
            required_error: "Fecha vencimiento is required",
            invalid_type_error: "Fecha vencimiento must be a string"
        }),
        estado: z.optional(
            z.boolean({
                invalid_type_error: "Estado must be a boolean"
            })
        ),
        nro_factura: z.string({
            required_error: "Nro factura is required",
            invalid_type_error: "Nro factura must be a string"
        }).min(5).max(20),
        proyecto: z.optional(
            z.string({
                invalid_type_error: "Proyecto must be a string"
            }).min(5).max(20)
        ),
        empresa_id: z.number({
            required_error: "Empresa id is required",
            invalid_type_error: "Empresa id must be a number"
        }).nonnegative(),
    }).strict(),
});

export const updateCarteraSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
    body: z.object({
        valor: z.optional(
            z.number({
                required_error: "Valor is required",
                invalid_type_error: "Valor must be a number"
            }).nonnegative(),
        ),
        valor_abonado: z.optional(
            z.number({
                required_error: "Valor abonado is required",
                invalid_type_error: "Valor abonado must be a number"
            }).nonnegative()
        ),
        fecha_factura: z.optional(
            z.string({
                required_error: "Fecha factura is required",
                invalid_type_error: "Fecha factura must be a string"
            })
        ),
        fecha_vencimiento: z.optional(
            z.string({
                required_error: "Fecha vencimiento is required",
                invalid_type_error: "Fecha vencimiento must be a string"
            })
        ),
        estado: z.optional(
            z.boolean({
                invalid_type_error: "Estado must be a boolean"
            })
        ),
        nro_factura: z.optional(
            z.string({
                required_error: "Nro factura is required",
                invalid_type_error: "Nro factura must be a string"
            }).min(5).max(20)
        ),
        proyecto: z.optional(
            z.string({
                invalid_type_error: "Proyecto must be a string"
            }).min(5).max(20)
        ),
        empresa_id: z.optional(
            z.number({
                required_error: "Empresa id is required",
                invalid_type_error: "Empresa id must be a number"
            }).nonnegative()
        ),
    }).strict(),
});

export const deleteCarteraSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
});

export const getCarteraSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
});

export const getCarteraByEmpresa = z.object({
    params: z.object({
        empresa_id: z.string({
            required_error: "Empresa id is required",
            invalid_type_error: "Empresa id must be a number"
        }),
    }).strict(),
});

        

        