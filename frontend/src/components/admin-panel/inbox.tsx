"use client";

import { format } from 'date-fns';
import AppSidebar from "@/components/admin-panel/app-sidebar.tsx";
import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import {z} from "zod";
import {AdminTicketSearchSchema} from "@/components/schema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Button} from "@/components/ui/button.tsx";
import {addDays} from "date-fns";

const Inbox = () => {
    const form = useForm<z.infer<typeof AdminTicketSearchSchema>>({
        resolver: zodResolver(AdminTicketSearchSchema),
        defaultValues: {
            journeyDate: format(new Date(), 'yyyy-MM-dd'), // Default to "Today"
            classType: "All" // Default to "All"
        },
    });

    const dates = [2, 3, 4, 5, 6, 7];

    const onSubmit = async (data: z.infer<typeof AdminTicketSearchSchema>) => {
        console.log(data);
    };

    return (
        <SidebarProvider>
            <AppSidebar/>
            <main className="w-full my-5 text-black">
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                                <FormField
                                    name="journeyDate"
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Journey Date</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    {...field}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Journey Date"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value={format(new Date(), 'yyyy-MM-dd')}>Today</SelectItem>
                                                        <SelectItem value={addDays(new  Date(), 2)}>Tomorrow</SelectItem>
                                                        {dates.map((value) => (
                                                            <SelectItem
                                                                key={value}
                                                                value={addDays(new Date(), value).toLocaleDateString("en-CA")}
                                                            >
                                                                {addDays(new Date(), value).toLocaleDateString("en-CA", {
                                                                    weekday: 'long',
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric'
                                                                })}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    name="classType"  // Fixed: Changed from journeyDate to classType
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Class Type</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    {...field}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Class Type"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="All">All Class</SelectItem>
                                                        <SelectItem value="Economy">Economy</SelectItem>
                                                        <SelectItem value="Business">Business</SelectItem>
                                                        <SelectItem value="First Class">First Class</SelectItem>
                                                        <SelectItem value="Ladies">Ladies</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit">Search</Button>
                        </form>
                    </Form>
                </div>
            </main>
        </SidebarProvider>
    );
};

export default Inbox;