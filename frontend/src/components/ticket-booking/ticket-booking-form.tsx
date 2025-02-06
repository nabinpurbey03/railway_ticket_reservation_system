"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListCheck, faTableList} from "@fortawesome/free-solid-svg-icons";
import {TicketSchema} from "@/components/schema";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import {Calendar} from "@/components/ui/calendar"
import {addDays, format} from "date-fns"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {destinations} from "@/components/ticket-booking/destinations.ts";
import {Button} from "../ui/button";
import {cn} from "@/lib/utils.ts";
import {CalendarIcon} from "lucide-react";
import React from "react";
import {useNavigate} from "react-router-dom";


const TicketBookingForm: React.FC = () => {
    const [open, setOpen] = React.useState<boolean>(false)
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof TicketSchema>>({
        resolver: zodResolver(TicketSchema),
        defaultValues: {
            sourceStation: "",
            destinationStation: "",
            journeyDate: addDays(new Date(), 1),
            classType: ""
        }
    })

    function onSubmit(data: z.infer<typeof TicketSchema>) {
        navigate(`/book-ticket?sourceStation=${encodeURIComponent(data.sourceStation || "")}&destinationStation=${encodeURIComponent(data.destinationStation || "")}&classType=${encodeURIComponent(data.classType || "")}&journeyDate=${encodeURIComponent(encodeURIComponent(new Date(data.journeyDate).toISOString().split("T")[0]) || "")}`);
    }

    return (
        <main>
            <div className="grid grid-cols-2 gap-4 text-white font-bold text-lg">
                <div className="bg-blue-950 py-1 text-center">
                    <FontAwesomeIcon icon={faListCheck} className="mr-5"/>Ticket Status
                </div>
                <div className="bg-blue-950 py-1 text-center">
                    <FontAwesomeIcon icon={faTableList} className="mr-5"/>Charts / Vacancy
                </div>
            </div>
            <div className="text-4xl font-bold text-center py-5">BOOK &nbsp; TICKET</div>
            <div className="px-5 pb-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-[60%_40%] gap-10">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="sourceStation"
                                    render={({field, fieldState: {error}}) => (
                                        <FormItem>
                                            <FormLabel>From</FormLabel>
                                            <FormControl>
                                                <Select value={field.value}
                                                        onValueChange={(value) => field.onChange(value)}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="From"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {destinations.map((dest, index) => (
                                                            <SelectItem value={dest.place}
                                                                        key={index}>{dest.place}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            {error && <FormMessage>{error.message}</FormMessage>}
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full pr-8">
                                <FormField
                                    control={form.control}
                                    name="journeyDate"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Travel Date</FormLabel>
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal w-full",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon/>
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : <></>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    align="start"
                                                    className="flex w-auto flex-col space-y-2 p-2"
                                                >
                                                    <div className="rounded-md border">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            // onSelect={field.onChange}
                                                            onSelect={(newValue) => {
                                                                // setDate(newValue);
                                                                field.onChange(newValue)
                                                                setOpen(false);
                                                            }}
                                                            disabled={(date) =>
                                                                date < new Date() || date > addDays(new Date(), 7)
                                                            }
                                                            initialFocus
                                                        />
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        {/*<div>Reverse</div>*/}
                        <div>
                            <div className="grid grid-cols-[60%_40%] gap-10">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="destinationStation"
                                        render={({field, fieldState: {error}}) => (
                                            <FormItem>
                                                <FormLabel>To</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value}
                                                            onValueChange={(value) => field.onChange(value)}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="To"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {destinations.map((dest, index) => (
                                                                <SelectItem value={dest.place}
                                                                            key={index}>{dest.place}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                {error && <FormMessage>{error.message}</FormMessage>}
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-full pr-8">
                                    <FormField
                                        control={form.control}
                                        name="classType"
                                        render={({field, fieldState: {error}}) => (
                                            <FormItem>
                                                <FormLabel>Class</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value}
                                                            onValueChange={(value) => field.onChange(value)}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Class"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value={"all"}>All Class</SelectItem>
                                                            <SelectItem value={"general"}>General</SelectItem>
                                                            <SelectItem value={"ladies"}>Ladies</SelectItem>
                                                            <SelectItem value={"ac"}>AC Booth</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                {error && <FormMessage>{error.message}</FormMessage>}
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" variant={"constructive"} className="px-10 font-bold">Check
                                Availability</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </main>
    )
}


export default TicketBookingForm;