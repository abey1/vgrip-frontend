import { z } from 'zod'

export const loginSchema = z.object({
    username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters long"),
    password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters long"),
});

export type LoginFormValuesSchemaType = z.infer<typeof loginSchema>;


export const signupSchema = z.object({
    username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters long"),
    password: z
    .string()
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters long"),
    confirmPassword: z
    .string()
    .min(1, "Confirm password is required")
    .min(4, "Confirm password must be at least 4 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type SignupFormValuesSchemaType = z.infer<typeof signupSchema>;
