"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {RegisterSchema} from "@/components/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {z} from "zod";
import {useState} from "react";

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
        setLoading(true);
        console.log(data);
    };

    // const {pending} = useFormStatus();
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="******"/>
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
                                    <Input {...field} type="password" placeholder="******"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full">
                    {loading ? "Loading..." : "Register"}
                </Button>
            </form>
        </Form>
    );
};

export default RegisterForm;
