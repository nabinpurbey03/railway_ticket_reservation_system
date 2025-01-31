import React, { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster.tsx";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordConfirmationSchema } from "@/components/schema";
import { z } from "zod";
import { toast } from "@/hooks/use-toast.ts";
import axios from "axios";
import bcrypt from "bcryptjs";
import GLOBALS from "@/components/globals.ts";

interface Props {
    updateTab: () => void;
}

const PasswordConfirmationForm: React.FC<Props> = ({ updateTab }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(PasswordConfirmationSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    const handlePasswordSubmission = async (password: string) => {
        const hashedPassword = await bcrypt.hash(password, 12);
        const payload = { password: hashedPassword, fp: GLOBALS.forgotPassword };

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/add-user`, payload);
            return response.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "An unknown error occurred.");
        }
    };

    const onSubmit = useCallback(
        async (data: z.infer<typeof PasswordConfirmationSchema>) => {
            if (loading) return;
            if (data.password !== data.confirmPassword) {
                toast({ title: "Passwords do not match!", variant: "destructive" });
                return;
            }

            setLoading(true);
            try {
                const result = await handlePasswordSubmission(data.password);

                if (result.status) {
                    toast({ title: result.message, description: "Now you can log in." });
                    updateTab();
                } else {
                    toast({ title: result.message, variant: "destructive" });
                }
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                toast({ title: "Confirmation failed", description: errorMessage, variant: "destructive" });
            } finally {
                setLoading(false);
            }
        },
        [loading, updateTab]
    );

    return (
        <Form {...form}>
            <Toaster />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4 text-black">
                    {["password", "confirmPassword"].map((fieldName, index) => (
                        <FormField
                            key={index}
                            control={form.control}
                            name={fieldName as "password" | "confirmPassword"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{fieldName === "password" ? "Password" : "Confirm Password"}</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input {...field} type={showPassword ? "text" : "password"} placeholder="******" className="pr-10" />
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </div>
                <Button type="submit" className="w-full" variant="constructive" disabled={loading}>
                    {loading ? "Processing..." : "Register"}
                </Button>
            </form>
        </Form>
    );
};

export default PasswordConfirmationForm;
