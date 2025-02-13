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
import {useForm} from "react-hook-form";
import {z} from "zod";
import {TicketSchema} from "@/components/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useLocation} from "react-router-dom";
import ShowTicketResult from "@/components/ticket-booking/show-ticket-result.tsx";
import axios from "axios";
import {toast} from "@/hooks/use-toast.ts";
import React, {useEffect, useState} from "react";
import {Toaster} from "@/components/ui/toaster.tsx";
import {useNavigate} from "react-router-dom";

const BookTicket: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const sourceStation = params.get("sourceStation") || "Janakpur";
    const destinationStation = params.get("destinationStation") || "Kathmandu";
    const journeyDate = new Date(params.get("journeyDate") || addDays(new Date(), 1));
    const classType = params.get("classType") || "All";

    const [open, setOpen] = useState<boolean>(false)
    const [number0fTickets, setnumber0fTickets] = useState<number>(1);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();


    const manageSeats = (operator: string) => {
        switch (operator) {
            case "+":
                if (number0fTickets < 10)
                    setnumber0fTickets(number0fTickets + 1);
                break;
            case "-":
                if (number0fTickets > 1)
                    setnumber0fTickets(number0fTickets - 1);
                break;
        }
    };
    const form = useForm<z.infer<typeof TicketSchema>>({
        resolver: zodResolver(TicketSchema),
        defaultValues: {
            sourceStation: sourceStation,
            destinationStation: destinationStation,
            journeyDate: journeyDate,
            classType: classType,
        }
    });

    const payload = {
        source_station: sourceStation,
        destination_station: destinationStation,
        journey_date: journeyDate,
        class_type: classType
    }


    const updateURL = (updatedParams: Record<string, string>) => {
        const newParams = new URLSearchParams(location.search);

        // Update each key in the URL
        Object.entries(updatedParams).forEach(([key, value]) => {
            if (value !== undefined) {
                newParams.set(key, value);
            }
        });

        navigate(`?${newParams.toString()}`, {replace: true});
    };

// Watch form values and update URL
    useEffect(() => {
        const subscription = form.watch((values) => {
            updateURL({
                sourceStation: values.sourceStation || "", // Ensure it's a string
                destinationStation: values.destinationStation || "",
                journeyDate: values.journeyDate
                    ? new Date(values.journeyDate).toLocaleDateString("en-CA").split("T")[0]
                    : "",
                classType: values.classType || "All",
            });
        });
        return () => subscription.unsubscribe();
    }, [form.watch]);

    const fetchTicketAvailability = async (payload: object) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/ticket-search`, payload);
            return response.data; // Returning only the data object
        } catch (error) {
            console.error("Failed to fetch ticket availability:", error);
            return {status: false, tickets: []}; // Return a default fallback
        }
    };

    const fetchTicketsOnLoad = async () => {
        setLoading(true);
        const response = await fetchTicketAvailability(payload);
        if (!response.status) {
            toast({title: "Data Fetch Unsuccessful", description: "Something went wrong", variant: "destructive"});
        } else {
            setData(response);
        }
        setLoading(false);
    };

// Fetch data on page load
    useEffect(() => {
        fetchTicketsOnLoad();
    }, []);


    async function onSubmit(data: z.infer<typeof TicketSchema>) {
        payload.source_station = data.sourceStation ?? "Janakpur";
        payload.destination_station = data.destinationStation ?? "Kathmandu";
        payload.journey_date = data.journeyDate;
        payload.class_type = data.classType ?? "All";
        if (payload.source_station === payload.destination_station) {
            toast({
                title: "Data Fetch Unsuccessful",
                description: "Source and Destination cannot be same",
                variant: "destructive"
            });
            return;
        }
        setLoading(true);
        const response = await fetchTicketAvailability(payload);

        if (!response.status) {
            toast({title: "Data Fetch Unsuccessful", description: "Something went wrong", variant: "destructive"});
        } else {
            setData(response);
        }
        setLoading(false);
    }
    return (
        <>
            <Toaster/>
            <Navbar showReg={() => {
            }}/>
            <main>
                <div className="w-full gd-css">
                    <div className="px-5 pb-2 text-black mx-64">
                        <Form {...form}>
                            <form
                                className="space-y-2"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
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
                                                                <SelectItem value={"All"}>All Class</SelectItem>
                                                                <SelectItem value={"Economy"}>Economy</SelectItem>
                                                                <SelectItem value={"Business"}>Business</SelectItem>
                                                                <SelectItem value={"First Class"}>First
                                                                    Class</SelectItem>
                                                                <SelectItem value={"Ladies"}>Ladies</SelectItem>
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

                                                <h1 className="mt-1 text-2xl text-white bg-blue-900 rounded px-5 py-1">{number0fTickets}</h1>
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
                <div className="bg-gray-500 text-black min-h-[63.4vh]">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ShowTicketResult data={data} number0fTickets={number0fTickets}/>
                        // <div>Hello Solo</div>
                    )
                    }
                </div>
            </main>
        </>
    )
}

export default BookTicket;