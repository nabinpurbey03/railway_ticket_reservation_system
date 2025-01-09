import React from "react";
import User from "./User";

interface NavbarProps {
    showReg: () => void; // Type for the showReg prop
}

const Navbar: React.FC<NavbarProps> = ({showReg}) => {
    const date: Date = new Date();
    const today: string = date.toDateString();
    const time: string = date.toLocaleTimeString("en-US");

    return (
        <div id="navbar" className="flex w-full h-[15vh] px-5">
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
                    <p className="font-bold">Bishalnagar, Kathmandu</p>
                </div>
            </div>

            {/* Right Section */}
            <div id="nav-ele" className="basis-3/5 flex flex-row">
                <div className="basis-3/5">
                    <User showReg={showReg}/>
                </div>
                <div className="basis-2/5 flex flex-row justify-evenly items-center">
                    <img
                        alt="Waving Nepal Flag"
                        src="/assets/images/nepal_flag.gif"
                        className="object-fill h-full"
                    />
                    <div className="font-bold">
                        <p>{today}</p>
                        <p>{time}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
