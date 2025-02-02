import {Avatar, AvatarImage} from "@/components/ui/avatar.tsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import TicketBookingForm from "@/components/ticket-bookung/ticket-booking-form.tsx";



const Ticket = () => {
    return (
        <main className="fixed left-20 bottom-16 bg-black rounded-full hover:bg-white transition-all">
            <Popover>
                <PopoverTrigger>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Avatar className="h-[80px] w-[83px] border-4 border-white">
                                    <AvatarImage src="/assets/images/TrainTicket.gif" />
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Book Tickets</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </PopoverTrigger>
                <PopoverContent className="w-full ml-32 shadow-2xl"><TicketBookingForm /></PopoverContent>
            </Popover>
        </main>
    );
};

export default Ticket;
