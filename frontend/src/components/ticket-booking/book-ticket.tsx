import Navbar from "@/components/pages/Navbar.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {destinations} from "@/components/ticket-booking/destinations.ts";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {CalendarIcon} from "lucide-react";
import {addDays, format} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import React from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {TicketSchema} from "@/components/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useLocation} from "react-router-dom";

const BookTicket: React.FC = () => {

    const [open, setOpen] = React.useState<boolean>(false)
    const [numberOfSeats, setNumberOfSeats] = React.useState<number>(1)

    const manageSeats = (operator: string) => {
        switch (operator) {
            case "+":
                if (numberOfSeats < 10)
                    setNumberOfSeats(numberOfSeats + 1);
                break;
            case "-":
                if (numberOfSeats > 1)
                    setNumberOfSeats(numberOfSeats - 1);
                break;
        }
    }

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const form = useForm<z.infer<typeof TicketSchema>>({
        resolver: zodResolver(TicketSchema),
        defaultValues: {
            sourceStation: params.get("sourceStation") || "Janakpur",
            destinationStation: params.get("destinationStation") || "Kathmandu",
            journeyDate: new Date(params.get("journeyDate") || addDays(new Date(), 1)),
            classType: params.get("classType") || "all"
        }
    })

    function onSubmit(data: z.infer<typeof TicketSchema>) {
        const payload = {
            source_station: data.sourceStation,
            destination_station: data.destinationStation,
            journey_date: data.journeyDate,
            class_type: data.classType
        }
        console.log(payload)
    }

    return (
        <>
            <Navbar showReg={() => {
            }}/>
            <main>
                <div className="w-full bg-red-100">
                    <div className="px-5 pb-2 text-black mx-64">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-[40%_40%_20%] gap-10">
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
                                    <div className="w-full">
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
                                {/*<div>Reverse</div>*/}
                                <div>
                                    <div className="grid grid-cols-[40%_40%_20%] gap-10">
                                        <div>
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
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
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
                                        <div className="mt-3">
                                            <FormLabel>Number Of Seats</FormLabel>
                                            <div className="flex justify-evenly font-bold">
                                                <Button variant={"outline"}
                                                        className="font-bold text-lg"
                                                        type={"button"}
                                                        onClick={() => manageSeats("-")}> - </Button>

                                                <h1 className="mt-1 text-2xl text-white bg-blue-900 rounded px-5 py-1">{numberOfSeats}</h1>
                                                <Button variant={"outline"}
                                                        type={"button"}
                                                        className="font-bold text-lg"
                                                        onClick={() => manageSeats("+")}
                                                > + </Button>

                                            </div>
                                        </div>
                                        <div className="flex justify-center flex-col mt-7">
                                            <Button type="submit" variant={"constructive"}
                                                    className="font-bold">Search</Button>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default BookTicket;