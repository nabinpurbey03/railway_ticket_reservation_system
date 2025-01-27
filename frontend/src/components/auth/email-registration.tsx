import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import React, {ReactElement} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RegisterSchema} from "@/components/schema";
import {z} from "zod";
import {toast} from "@/hooks/use-toast.ts";
import {Toaster} from "@/components/ui/toaster.tsx";
import axios from "axios";

interface Props {
    updateTab(): void;
}

const EmailRegistrationForm: React.FC<Props> = ({updateTab}): ReactElement => {

    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        try {
            const payload = {
                email: data.email
            }
            const response = await axios.post(import.meta.env.VITE_API_URL + "/api/send-otp", payload);
            if (response.data.status) {
                toast({
                    title: response.data.message,
                })
                updateTab()
            } else {
                toast({
                    title: response.data.message,
                    // description: "Please enter a valid email",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Registration failed:",
                description: error instanceof Error ? error.message : "An unknown error occurred",
                variant: "destructive"
            })
        }
    };

    return (
        <Form {...form}>
            <Toaster/>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-black">
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
                <Button type="submit" className="w-full" variant={"constructive"}>
                    Send OTP
                </Button>
            </form>
        </Form>
    )
};

export default EmailRegistrationForm;
