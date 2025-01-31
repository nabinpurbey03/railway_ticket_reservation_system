import React, {ReactElement, useState} from "react";
import {Toaster} from "@/components/ui/toaster.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Eye, EyeOff} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {PasswordConfirmationSchema} from "@/components/schema";
import {z} from "zod";
import {toast} from "@/hooks/use-toast.ts";
import axios from "axios";
import bcrypt from "bcryptjs";
import GLOBALS from "@/components/globals.ts";


interface Props {
    updateTab(): void;
}

const PasswordConfirmationForm: React.FC<Props> = ({updateTab}): ReactElement => {

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    const form = useForm({
        resolver: zodResolver(PasswordConfirmationSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof PasswordConfirmationSchema>) => {
        try {
            if (data.password === data.confirmPassword) {
                const hashedPassword: string = await bcrypt.hash(data.password, 12);
                const payload = {
                    password: hashedPassword,
                    fp: GLOBALS.forgotPassword
                };
                const response = await axios.post(import.meta.env.VITE_API_URL + "/api/add-user", payload);
                if (response.data.status) {
                    toast({
                        title: response.data.message,
                        description: "Now you can log in"
                    })
                    updateTab();
                } else {
                    toast({
                        title: response.data.message,
                        variant: "destructive"
                    })
                }
            }
        } catch (error) {
            toast({
                title: "Confirmation failed:",
                description: error instanceof Error ? error.message : "An unknown error occurred",
                variant: "destructive"
            })
        }

    }


    return (
        <Form {...form}>
            <Toaster/>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4 text-black">
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
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
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
                    Register
                </Button>
            </form>
        </Form>
    )
}

export default PasswordConfirmationForm;