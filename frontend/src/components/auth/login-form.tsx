"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {LoginSchema} from "@/components/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {z} from "zod";
import React, {useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import axios from "axios";
import bcrypt from "bcryptjs";
import {Toaster} from "@/components/ui/toaster";
import {useToast} from "@/hooks/use-toast";
import {setUserCookies} from "@/cookies/handle_cookie.ts";
import GLOBALS from "@/components/globals.ts";
import {set_name_cookies} from "@/components/helper.ts";

interface Props {
    closeRegisterModal: () => void;
    nextTab: () => void;
}

const LoginForm: React.FC<Props> = ({closeRegisterModal, nextTab}) => {
    if (GLOBALS.forgotPassword) GLOBALS.forgotPassword = false;
    const {toast} = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const loginUser = async (email: string) => {
        try {
            return await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {email});
        } catch (error) {
            throw new Error("Failed to login. Please check your credentials." + error);
        }
    };

    const fetchUserProfile = async (email: string) => {
        try {
            return await axios.get(`${import.meta.env.VITE_API_URL}/api/user/${email}`);
        } catch (error) {
            throw new Error("Failed to fetch user profile." + error);
        }
    };

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        setIsLoading(true);

        try {
            const loginResponse = await loginUser(data.email);

            if (!loginResponse.data.status) {
                toast({title: loginResponse.data.message, variant: "destructive"});
                return;
            }

            const passwordMatch = await bcrypt.compare(data.password, loginResponse.data.password);
            if (!passwordMatch) {
                toast({title: "Login Unsuccessful", description: "Incorrect password.", variant: "destructive"});
                return;
            }

            toast({title: "Login successful"});
            const userResponse = await fetchUserProfile(data.email);
            if (userResponse.data.status) {
                const user = {
                    id: userResponse.data.user_id.toString(),
                    role: userResponse.data.role,
                    is_active: userResponse.data.is_active,
                    loggedIn: true,
                    email: data.email,
                };

                setUserCookies(user);
                if (user.is_active) {
                    await set_name_cookies({res: userResponse});
                }
            }

            closeRegisterModal();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            toast({title: "Login failed", description: errorMessage, variant: "destructive"});
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form {...form}>
            <Toaster/>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4 text-black">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" placeholder="example@provider.com"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input {...field} type={showPassword ? "text" : "password"}
                                               placeholder="********" className="pr-10"/>
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-500"/> :
                                                <Eye className="h-5 w-5 text-gray-500"/>}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <span
                    className="text-sm mr-48 hover:underline cursor-pointer text-gray-700"
                    onClick={nextTab}
                >
                    Forgot Password?
                </span>
                <Button type="submit" className="w-full" variant="constructive" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
