import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faListCheck, faTableList} from "@fortawesome/free-solid-svg-icons";
import {toast} from "@/hooks/use-toast.ts";
import {TicketSchema} from "@/components/schema";
import {useForm} from "react-hook-form";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
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
import {Button} from "react-day-picker";

const TicketBookingForm = () => {

    function form() {
        const form = useForm<z.infer<typeof TicketSchema>>({
            resolver: zodResolver(TicketSchema),
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
                <div>
                    {/*<Form {...form}>*/}
                    {/*    <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">*/}
                    {/*        <FormField*/}
                    {/*            control={form.control}*/}
                    {/*            name="from"*/}
                    {/*            render={({field}) => (*/}
                    {/*                <FormItem>*/}
                    {/*                    <FormLabel>Email</FormLabel>*/}
                    {/*                    <Select onValueChange={field.onChange} defaultValue={field.value}>*/}
                    {/*                        <FormControl>*/}
                    {/*                            <SelectTrigger>*/}
                    {/*                                <SelectValue placeholder="Select a verified email to display"/>*/}
                    {/*                            </SelectTrigger>*/}
                    {/*                        </FormControl>*/}
                    {/*                        <SelectContent>*/}
                    {/*                            <SelectItem value="m@example.com">m@example.com</SelectItem>*/}
                    {/*                            <SelectItem value="m@google.com">m@google.com</SelectItem>*/}
                    {/*                            <SelectItem value="m@support.com">m@support.com</SelectItem>*/}
                    {/*                        </SelectContent>*/}
                    {/*                    </Select>*/}
                    {/*                    <FormMessage/>*/}
                    {/*                </FormItem>*/}
                    {/*            )}*/}
                    {/*        />*/}
                    {/*        <Button type="submit">Submit</Button>*/}
                    {/*    </form>*/}
                    {/*</Form>*/}
                </div>
            </main>
        )
    }
}

export default TicketBookingForm;