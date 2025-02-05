import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
// } from "@/components/ui/tooltip"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import TicketBookingForm from "@/components/ticket-booking/ticket-booking-form.tsx";



const Ticket = () => {
    return (
        <main className="fixed left-20 bottom-16 rounded-full bg-white border-4">
            <Popover>
                <PopoverTrigger>
                    <Avatar className="h-[75px] w-[78px] p-3">
                        <AvatarImage src="/assets/images/output-onlinegiftools.gif" />
                    </Avatar>
                    {/*<TooltipProvider>*/}
                    {/*    <Tooltip>*/}
                    {/*        <TooltipTrigger>*/}
                    {/*            */}
                    {/*        </TooltipTrigger>*/}
                    {/*        <TooltipContent>*/}
                    {/*            <p>Book Tickets</p>*/}
                    {/*        </TooltipContent>*/}
                    {/*    </Tooltip>*/}
                    {/*</TooltipProvider>*/}
                </PopoverTrigger>
                <PopoverContent className="w-[600px] ml-32 shadow-2xl"><TicketBookingForm /></PopoverContent>
            </Popover>
        </main>
    );
};

export default Ticket;
