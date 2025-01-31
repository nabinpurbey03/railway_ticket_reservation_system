import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import React, {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RegisterSchema} from "@/components/schema";
import {z} from "zod";
import {toast} from "@/hooks/use-toast.ts";
import {Toaster} from "@/components/ui/toaster.tsx";
import axios from "axios";
import GLOBALS from "@/components/globals.ts";

interface Props {
    nextTab: () => void;
    prevTab: () => void;
}

const EmailRegistrationForm: React.FC<Props> = ({nextTab, prevTab}) => {
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
        },
    });

    const sendOtp = async (email: string) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/send-otp`, {
                email,
                fp: GLOBALS.forgotPassword,
            });

            return response.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Failed to send OTP.");
        }
    };

    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        setLoading(true);

        try {
            const result = await sendOtp(data.email);

            if (result.status) {
                toast({title: result.message});
                nextTab();
            } else {
                toast({title: result.message, variant: "destructive"});
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            toast({title: "Registration failed", description: errorMessage, variant: "destructive"});
        } finally {
            setLoading(false);
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
                                <Input {...field} type="email" placeholder="example@provider.com"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full" variant="constructive" disabled={loading}>
                    {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
            </form>
            <Button
                variant="link"
                className="flex text-sm text-gray-500 hover:text-black"
                onClick={prevTab}
                disabled={loading}
            >
                &#10094; Back
            </Button>
        </Form>
    );
};

export default EmailRegistrationForm;
