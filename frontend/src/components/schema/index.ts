import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z
        .string()
        .min(8, {message: "Password must be at least 8 characters long"})
        .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
        .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
        .regex(/[0-9]/, {message: "Password must contain at least one number"})
        .regex(/[^A-Za-z0-9]/, {message: "Password must contain at least one special character"})
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address"
    })
})

export const PasswordConfirmationSchema = z.object({
    password: z
        .string()
        .min(8, {message: "Password must be at least 8 characters long"})
        .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
        .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
        .regex(/[0-9]/, {message: "Password must contain at least one number"})
        .regex(/[^A-Za-z0-9]/, {message: "Password must contain at least one special character"}),

    confirmPassword: z
        .string()
        .min(8, {message: "Password must be at least 8 characters long"})
        .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
        .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
        .regex(/[0-9]/, {message: "Password must contain at least one number"})
        .regex(/[^A-Za-z0-9]/, {message: "Password must contain at least one special character"})
})

export const PersonalDetailSchema = z.object({
    firstName: z.string().nonempty("First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().nonempty("Last name is required"),
    dateOfBirth: z.string().nonempty("Date of birth is required"),
    gender: z.enum(["M", "F", "O"], {required_error: "Gender is required"}),
    cardType: z.enum(["Citizenship", "Passport", "National Identity Card"], {required_error: "Card type is required"}),
    issuedDistrict: z.string().nonempty("Issued District is required"),
    cardNumber: z.string().min(10, {message: "Card Number is required"}),
    profileImage: z.any(),
    citizenshipFront: z.any().optional(),
    citizenshipBack: z.any().optional(),
    cardImage: z.any().optional()
});