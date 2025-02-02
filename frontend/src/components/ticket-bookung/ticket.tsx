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
        <main className="absolute left-10 bottom-10 bg-white rounded-full">
            <Popover>
                <PopoverTrigger>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Avatar className="h-[100px] w-[100px] border-8 border-white">
                                    <AvatarImage src="/assets/images/train_icon.png" />
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Book Tickets</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </PopoverTrigger>
                <PopoverContent><TicketBookingForm /></PopoverContent>
            </Popover>
        </main>
    );
};

export default Ticket;
