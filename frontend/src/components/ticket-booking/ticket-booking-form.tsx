import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Form, FormControl, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TicketSchema} from "@/components/schema";
import {z} from "zod";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import React from "react";

const TicketBookingForm: React.FC = () => {

    const form = useForm({
        resolver: zodResolver(TicketSchema),
        defaultValues: {
            form: "",
            to: "",
        }
    })

    const onSubmit = async (formData: z.infer<typeof TicketSchema>) => {
        console.log(formData)
    }

    return(
        <Card>
            <CardHeader>
                <CardTitle>Book Your Ticket Here</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Controller
                                    name="from"
                                    render={({field, fieldState: {error}}) => (
                                        <FormItem>
                                            <FormLabel>From</FormLabel>
                                            <FormControl>
                                                <Select value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="From" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={"all"}>Janakpur</SelectItem>
                                                        <SelectItem value={"mall"}>Janakpur</SelectItem>
                                                        <SelectItem value={"call"}>Janakpur</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            {error && <FormMessage>{error.message}</FormMessage>}
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                >
                                </Controller>


                            {/*    For to destination   */}
                                <Controller
                                    name="from"
                                    render={({field, fieldState: {error}}) => (
                                        <FormItem>
                                            <FormLabel>To</FormLabel>
                                            <FormControl>
                                                <Select value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="From" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={"all"}>Janakpur</SelectItem>
                                                        <SelectItem value={"mall"}>Janakpur</SelectItem>
                                                        <SelectItem value={"call"}>Janakpur</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            {error && <FormMessage>{error.message}</FormMessage>}
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                >
                                </Controller>

                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default TicketBookingForm;