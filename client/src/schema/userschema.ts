import { z } from "zod";

// SignUp Schema
export const userSignUpSchema = z
  .object({
    firstname: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters"),

    lastname: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters"),

    email: z.string().trim().min(1, "Email is required").email("Invalid email"),

    password: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[a-z]/, "Include a lowercase letter")
      .regex(/\d/, "Include a number")
      .regex(/[@$!%*?&#]/, "Include a special character"),

    confirmPassword: z.string().trim().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type signUpDetails = z.infer<typeof userSignUpSchema>;

// Login Schema
export const userLoginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().trim().min(1, "Password is required"),
});

export type loginDetails = z.infer<typeof userLoginSchema>;

// Forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
});

export type forgotPasswordDetails = z.infer<typeof forgotPasswordSchema>;

// Reset Password Schema
export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[a-z]/, "Include a lowercase letter")
      .regex(/\d/, "Include a number")
      .regex(/[@$!%*?&#]/, "Include a special character"),

    confirmNewPassword: z
      .string()
      .trim()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type resetPasswordDetails = z.infer<typeof resetPasswordSchema>;
