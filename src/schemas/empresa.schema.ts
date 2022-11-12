import { z, AnyZodObject } from "zod";

export const createEmpresaSchema = z.object({
    body: z.object({
        nombre: z.string({
            required_error: "Nombre is required",
            invalid_type_error: "Nombre must be a string"
        }).min(5).max(30),
    }).strict(),
});

export const updateEmpresaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
    body: z.object({
        nombre: z.optional(
            z.string({
                invalid_type_error: "Nombre must be a string"
            }).min(5).max(30)
        )
    }).strict(),
});

export const deleteEmpresaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
});

export const getEmpresaSchema = z.object({
    params: z.object({
        id: z.string({
            required_error: "Id is required",
            invalid_type_error: "Id must be a number"
        }),
    }).strict(),
});
    

