import { z } from "zod";

export const getGastoSchema = z.object({
    params: z
        .object({
            id: z.string({
                required_error: "Id is required",
                invalid_type_error: "Id must be a number",
            }),
        })
        .strict(),
});

export const createGastoSchema = z.object({
  body: z
    .object({
      fecha: z.string({
        required_error: "Fecha is required",
        invalid_type_error: "Fecha must be a string",
      }),
      empresa_id: z
        .number({
          required_error: "Empresa id is required",
          invalid_type_error: "Empresa id must be a number",
        })
        .nonnegative(),
      nombre: z.string({
        required_error: "Nombre is required",
        invalid_type_error: "Nombre must be a string",
      }),
      valor_total: z
        .number({
          required_error: "Valor total is required",
          invalid_type_error: "Valor total must be a number",
        })
        .nonnegative(),
    })
    .strict(),
});

export const updateGastoSchema = z.object({
    params: z
        .object({
            id: z.string({
                required_error: "Id is required",
                invalid_type_error: "Id must be a number",
            }),
        })
        .strict(),
    body: z
        .object({
            fecha: z.optional(
                z.string({
                    invalid_type_error: "Fecha must be a string",
                })
            ),
            empresa_id: z.optional(
                z.number({
                    invalid_type_error: "Empresa id must be a number",
                }).nonnegative()
            ),
            nombre: z.optional(
                z.string({
                    invalid_type_error: "Nombre must be a string",
                })
            ),
            valor_total: z.optional(
                z.number({
                    invalid_type_error: "Valor total must be a number",
                }).nonnegative()
            ),
        })
        .strict(),
});

export const deleteGastoSchema = z.object({
    params: z
        .object({
            id: z.string({
                required_error: "Id is required",
                invalid_type_error: "Id must be a number",
            }),
        })
        .strict(),
});

