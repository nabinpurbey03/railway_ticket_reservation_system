import {Avatar} from "@/components/ui/avatar.tsx";
import {AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {BadgeCheck, Bell, BookHeart, ChevronsUpDown, LogOut, Sparkle} from "lucide-react";
import {Card, CardDescription} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";

const AdminInfo = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <div className="flex text-white space-x-5 items-center w-full border-black py-2 border-2 rounded justify-center bg-blue-700">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>Admin</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-bold">Nabin Purbey</p>
                        <p className="text-sm">Admin</p>
                    </div>
                    <p><ChevronsUpDown /></p>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] ml-64 shadow-2xl p-0 flex flex-col">
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
                    <Separator className="my-1"/>
                    <Button variant="outline" className="rounded-none w-full flex justify-start hover:bg-gray-300 border-0"><Sparkle /> Upgrade To Pro</Button>
                    <Separator className="my-1"/>
                    <Button variant="outline" className="rounded-none w-full flex justify-start hover:bg-gray-300 border-0"><BadgeCheck /> Account</Button>
                    <Button variant="outline" className="rounded-none w-full flex justify-start hover:bg-gray-300 border-0"><Bell /> Notification</Button>
                    <Button variant="outline" className="rounded-none w-full flex justify-start hover:bg-gray-300 border-0"><BookHeart /> Personalize</Button>
                    <Separator className="my-1"/>
                    <Button variant="outline" className="rounded-none w-full flex justify-start hover:bg-gray-300 border-0"><LogOut /> Logout</Button>
                </Card>
            </PopoverContent>
        </Popover>
    )
}

export default AdminInfo;