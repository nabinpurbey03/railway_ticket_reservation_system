import React from "react";
import SignInPage from "@/components/SignInPage";
import {Button} from "@/components/ui/Button";

interface RegistrationPageProps {
    closeReg: () => void; // Type for the closeReg function prop
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({closeReg}) => {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-black bg-opacity-60">
            {/* Main Card */}
            <div className="w-2/5 bg-white rounded-lg pb-5 shadow-lg">
                {/* Header Section */}
                <div className="flex rounded-t-lg bg-blue-900 flex-row justify-between h-[150px] p-4 pb-10">
                    <div>
                        <img
                            alt="Emblem_of_Nepal"
                            src="/assets/images/emblem_of_nepal.svg"
                            className="object-contain h-full cursor-pointer"
                        />
                    </div>
                    <div>
                        <p className="font-bold">Government of Nepal</p>
                        <p className="font-bold">Ministry of Physical Infrastructure and Transport</p>
                        <p className="font-bold text-3xl">Department of Railways</p>
                        <p className="font-bold">Bishalnagar, Kathmandu</p>
                    </div>
                    <div>
                        <img
                            alt="Waving Nepal Flag"
                            src="/assets/images/nepal_flag.gif"
                            className="object-fill h-full"
                        />
                    </div>
                </div>
                {/* Title */}
                <div className="text-black text-4xl font-bold bg-blue-300 py-3">
                    Log In
                </div>
                {/* Sign In Form */}
                <div className="mx-36">
                    <SignInPage/>
                </div>
            </div>
            {/* Close Button */}
            <Button
                className="absolute text-gray-600 right-2 top-2 font-bold text-4xl rounded bg-gray-500 hover:bg-gray-400"
                onClick={closeReg}
            >
                &#x2716;
            </Button>
        </div>
    );
};

export default RegistrationPage;
