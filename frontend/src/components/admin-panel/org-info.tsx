import {ChevronsUpDown, MessageCircleCode, SquarePlus, Users} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardDescription} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";

const OrgInfo = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <div className="flex justify-center text-white items-center bg-blue-700 px-1 border-2 border-black rounded py-2">
                    <div className="w-full h-[50px] basis-1/3">
                        <img src="/assets/images/emblem_of_nepal.svg" alt="Emblem Of Nepal" className="w-full h-full object-fill"/>
                    </div>
                    <div>
                        <p className="font-bold">Railway Ticket Reservation System</p>
                    </div>
                    <p><ChevronsUpDown /></p>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] ml-64 shadow-2xl p-0 flex flex-col">
                <Card className="py-0">
                    <CardDescription className="text-center mb-1">Team</CardDescription>
                    <Separator />
                    <Button variant="outline" className="rounded-none w-full flex justify-start hover:bg-gray-300"><Users /> Team Members</Button>
                    <Button variant="outline" className="rounded-none w-full flex justify-start hover:bg-gray-300"><SquarePlus /> Add Admin</Button>
                    <Button variant="outline" className="rounded-none w-full flex justify-start hover:bg-gray-300"><MessageCircleCode /> Feedbacks</Button>
                </Card>
            </PopoverContent>
        </Popover>


    )
}

export default OrgInfo;