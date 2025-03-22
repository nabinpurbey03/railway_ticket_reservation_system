import {Building2, ChevronsUpDown, SquarePlus} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardDescription} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";

const OrgInfo = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <div className="flex justify-center items-center bg-blue-300 px-1 border-2 border-black rounded py-2">
                    <div className="bg-blue-700 rounded text-white py-2 px-2"><Building2 /></div>
                    <div>
                        <p className="font-bold text-slate-700">Railway Ticket Reservation System</p>
                    </div>
                    <p><ChevronsUpDown /></p>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] ml-64 shadow-2xl p-0 flex flex-col">
                <Card className="py-0">
                    <CardDescription className="text-center mb-1">Team</CardDescription>
                    <Separator />
                    <Button variant="outline" className="w-full flex justify-start"><SquarePlus />Team Members</Button>
                    <Button variant="outline" className="w-full flex justify-start"><SquarePlus />Add Admin</Button>
                    <Button variant="outline" className="w-full flex justify-start"><SquarePlus />Add Team</Button>
                </Card>
            </PopoverContent>
        </Popover>


    )
}

export default OrgInfo;