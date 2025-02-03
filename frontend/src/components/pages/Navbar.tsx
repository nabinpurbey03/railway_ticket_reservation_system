import React, {ReactElement} from "react";
import DateTime from "@/components/pages/DateTime.tsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar"
import Cookies from "js-cookie";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {destroyCookies} from "@/cookies/handle_cookie.ts";
import {Link} from "react-router-dom";

interface navbarProps {
    showReg(): void
}

const Navbar: React.FC<navbarProps> = ({showReg}): ReactElement => {

    const active = Cookies.get("is_active") === "true";
    const loggedIn = Cookies.get("loggedIn") === "true";
    const image_url = Cookies.get("image_url");

    return (
        <main id="navbar" className="flex w-full h-[15vh] px-5">
            {/* Left Section */}
            <div className="basis-2/5 py-2 flex flex-row">
                <img
                    alt="Emblem_of_Nepal"
                    src="/assets/images/emblem_of_nepal.svg"
                    className="object-contain h-full cursor-pointer"
                />
                <div>
                    <p className="font-bold">Government of Nepal</p>
                    <p className="font-bold">Ministry of Physical Infrastructure and Transport</p>
                    <p className="font-bold text-3xl">Department of Railways</p>
                    <p className="font-bold">Singha Durbar, Kathmandu</p>
                </div>
            </div>

            {/* Right Section */}
            <div id="nav-ele" className="basis-3/5 flex flex-row justify-end">
                <div className="flex flex-row justify-evenly items-center mx-3 ">
                    <img
                        alt="Waving Nepal Flag"
                        src="/assets/images/nepal_flag.gif"
                        className="object-fill h-full py-4"
                    />
                    <DateTime/>
                </div>
                <div className="flex items-center justify-center mx-3">
                    {loggedIn || (loggedIn && !active)? <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar className="bg-white cursor-pointer" onClick={showReg}>
                                    <AvatarImage src={active? image_url :"/assets/images/user_avatar.png"}/>
                                    {/*<AvatarFallback>Nabin Purbey</AvatarFallback>*/}
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem className="text-green-700">
                                    <Link to={active ? "/profile" : "/add-user-details"}>Profile</Link>
                                    <span>&#10026;</span></DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem
                                    className="text-red-700"
                                    onClick={destroyCookies}
                                >
                                    <span className="inline-block transform scale-x-[-1]">&#10162;</span>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        : <Avatar className="bg-white cursor-pointer" onClick={showReg}>
                            <AvatarImage src="/assets/images/user_avatar.png"/>
                        </Avatar>
                    }
                </div>

            </div>
        </main>
    );
};

export default Navbar;