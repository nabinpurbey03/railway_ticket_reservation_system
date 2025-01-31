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
import React, {ReactElement, useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import axios from "axios";
import bcrypt from "bcryptjs";
import {Toaster} from "@/components/ui/toaster"
import {useToast} from "@/hooks/use-toast"
import {setNameCookies, setUserCookies} from "@/cookies/handle_cookie.ts";
import GLOBALS from "@/components/globals.ts";

interface Props {
    closeRegisterModal(): void;
    nextTab(): void;
}

const LoginForm: React.FC<Props> = ({closeRegisterModal, nextTab}): ReactElement => {
    if(GLOBALS.forgotPassword) GLOBALS.forgotPassword = false;
    const {toast} = useToast()
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        try {
            // const hashedPassword: string = await bcrypt.hash(data.password, 12);
            const payload = {
                email: data.email,
            };
            const response = await axios.post(import.meta.env.VITE_API_URL + "/api/login", payload);
            if (response.data.status) {

                if (await bcrypt.compare(data.password, response.data.password)) {
                    toast({
                        title: "Login successful",
                    })
                    const response = await axios.get(import.meta.env.VITE_API_URL + "/api/user/" + data.email);
                    if (response.data.status) {
                        const user = {
                            id: response.data.user_id.toString(),
                            role: response.data.role,
                            is_active: response.data.is_active,
                            loggedIn: true,
                        };
                        setUserCookies(user)

                        if (response.data.is_active) {
                            const response1 = await axios.get(import.meta.env.VITE_API_URL + "/api/get-profile/" + response.data.user_id.toString());

                            const names = {
                                first_name: response1.data.first_name,
                                last_name: response1.data.last_name,
                                image_url: import.meta.env.VITE_API_URL + response1.data.image_url
                            }
                            setNameCookies(names)

                        }
                    }
                    closeRegisterModal();
                } else {
                    toast({
                        title: "Login Unsuccessful",
                        description: "Incorrect password.",
                        variant: "destructive"
                    })
                }
            } else {
                toast({
                    title: response.data.message,
                    // description: "Please enter a valid email",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Login failed:",
                description: error instanceof Error ? error.message : "An unknown error occurred",
                variant: "destructive"
            })
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
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder="example@provider.com"
                                    />
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
                                        <Input
                                            {...field}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="********"
                                            className="pr-10"
                                        />

                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-500"/>
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-500"/>
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <span
                    className="text-sm ml-0 pr-52 pl-0 hover:underline cursor-pointer text-gray-700"
                    onClick={nextTab}
                >Forgot Password</span>
                <Button type="submit" className="w-full" variant={"constructive"}>
                    Login
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;