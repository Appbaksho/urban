import { z } from 'zod';

const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, { message: "Confirm Password must be at least 8 characters long" }),
    name: z.string().min(1, { message: "Name is required" }),
    billingAddress: z.string().min(1, { message: "Billing address is required" }),
    phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits long" }),
    city: z.string().min(1, { message: "City is required" }),
    zip: z.string().min(5, { message: "ZIP code must be at least 5 characters long" })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});

export default registerSchema;