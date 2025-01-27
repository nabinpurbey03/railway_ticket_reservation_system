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
import {setUserCookies} from "@/cookies/handle_cookie.ts";

interface Props {
    closeRegisterModal(): void;
}

const LoginForm: React.FC<Props> = ({closeRegisterModal}): ReactElement => {
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
                            firstname: 'John',
                            lastname: 'Doe',
                            role: response.data.role,
                            is_active: response.data.is_active,
                        };
                        setUserCookies(user);
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
                                        placeholder="johndoe@gmail.com"
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
                                            placeholder="******"
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
                <Button type="submit" className="w-full" variant={"constructive"}>
                    Login
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;