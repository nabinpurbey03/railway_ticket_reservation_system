import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faListCheck, faTableList} from "@fortawesome/free-solid-svg-icons";
import {toast} from "@/hooks/use-toast.ts";
import {TicketSchema} from "@/components/schema";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
    Form,
    FormControl, FormDescription,
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
import { Button } from "../ui/button";
import {cn} from "@/lib/utils.ts";
import {CalendarIcon} from "lucide-react";

const TicketBookingForm = () => {


    const form = useForm<z.infer<typeof TicketSchema>>({
        resolver: zodResolver(TicketSchema),
        defaultValues: {
            from: "",
            to: "",
            travelDate: new Date(),
        }
    })

    function onSubmit(data: z.infer<typeof TicketSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })
    }

    return (
        <main>
            <div className="grid grid-cols-2 gap-4 text-white font-bold text-lg">
                <div className="bg-blue-950 py-1 rounded text-center">
                    <FontAwesomeIcon icon={faListCheck} className="mr-5"/>Ticket Status
                </div>
                <div className="bg-blue-950 py-1 rounded text-center">
                    <FontAwesomeIcon icon={faTableList} className="mr-5"/>Charts / Vacancy
                </div>
            </div>
            <div className="text-4xl font-bold text-center py-5">Book Ticket</div>
            <div className="px-5 pb-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-[60%_40%] gap-10">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="from"
                                    render={({field, fieldState: {error}}) => (
                                        <FormItem>
                                            <FormLabel>From</FormLabel>
                                            <FormControl>
                                                <Select value={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="From"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {destinations.map((dest, index) => (
                                                            <SelectItem value={dest.place} key={index}>{dest.place}</SelectItem>
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
                                    name="travelDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Travel Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "font-normal w-full",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-[60%_40%] gap-4">
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="to"
                                        render={({field, fieldState: {error}}) => (
                                            <FormItem>
                                                <FormLabel>To</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="To"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {destinations.map((dest, index) => (
                                                                <SelectItem value={dest.place} key={index}>{dest.place}</SelectItem>
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
                                        name="from"
                                        render={({field, fieldState: {error}}) => (
                                            <FormItem>
                                                <FormLabel>Class</FormLabel>
                                                <FormControl>
                                                    <Select value={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="From"/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value={"123"}>General</SelectItem>
                                                            <SelectItem value={"123"}>AC</SelectItem>
                                                            <SelectItem value={"123"}>Dabba</SelectItem>
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
                    </form>
                </Form>
            </div>
        </main>
    )
}


export default TicketBookingForm;