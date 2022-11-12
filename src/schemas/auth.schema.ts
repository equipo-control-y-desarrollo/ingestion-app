import { z, AnyZodObject } from "zod";

export const loginSchema = z.object({
    body: z.object({
        username: z.string({
            required_error: "Username is required",
            invalid_type_error: "Username must be a string"
        }).min(5).max(20),
        password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string"
        }).min(5).max(60),
    }),
});

export const signupSchema = z.object({
    body: z.object({
        username: z.string({
            required_error: "Username is required",
            invalid_type_error: "Username must be a string"
        }).min(5).max(20),
        password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Password must be a string"
        }).min(5).max(60),
        isAdmin: z.optional(
            z.boolean({
                invalid_type_error: "isAdmin must be a boolean"
            })
            ),
        empresas: z.array(z.number({
            required_error: "Empresas is required",
            invalid_type_error: "Empresas must be an array of numbers"
        })),
    }),
});
