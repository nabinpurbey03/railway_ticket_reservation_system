import React from "react";

interface UserProps {
    showReg: () => void; // Type for the showReg prop
}

const User: React.FC<UserProps> = ({showReg}) => {
    return (
        <div className="flex flex-row h-full justify-end items-center">
            <div className="pr-2.5">
                <p className="text-1xl font-bold">Nabin Purbey</p>
                <p>Passenger</p>
            </div>
            <div
                className="border-4 w-[13%] rounded-full overflow-hidden p-2 border-slate-900 cursor-pointer bg-gray-300"
            >
                <img
                    src="/assets/images/user_avatar.png"
                    alt="User Avatar"
                    className="object-contain h-full w-full"
                    onClick={showReg} // Function passed as prop
                />
            </div>
        </div>
    );
};

export default User;
