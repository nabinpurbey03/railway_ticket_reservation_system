import {Avatar} from "@/components/ui/avatar.tsx";
import {AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ChevronsUpDown, LogOut, SquarePlus} from "lucide-react";
import {Card, CardDescription} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";

const AdminInfo = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <div className="flex space-x-5 items-center w-full border-black py-2 border-2 rounded justify-center bg-blue-300">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold text-slate-700">Nabin Purbey</p>
                        <p className="text-sm">Admin</p>
                    </div>
                    <p><ChevronsUpDown /></p>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] ml-64 shadow-2xl p-0 flex flex-col">
                <Card>
                    <CardDescription className="text-center mb-1">Admin Profile</CardDescription>
                    <Separator />
                    <div className="flex space-x-5 items-center w-full py-2 justify-evenly bg-slate-200">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-slate-700">Nabin Purbey</p>
                            <p className="text-sm">Admin</p>
                        </div>
                    </div>
                    <Separator />

                    <Button variant="outline" className="w-full flex justify-start"><LogOut /> Logout</Button>
                </Card>
            </PopoverContent>
        </Popover>
    )
}

export default AdminInfo;