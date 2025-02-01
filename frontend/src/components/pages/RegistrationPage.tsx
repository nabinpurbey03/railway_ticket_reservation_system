import React from "react";
import SignInPage from "@/components/pages/SignInPage";
import {Button} from "@/components/ui/button.tsx";

interface RegistrationPageProps {
    closeReg: () => void; // Type for the closeReg function prop
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({closeReg}) => {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-black bg-opacity-85">
            {/* Main Card */}
            <div className="w-2/5 bg-white rounded-lg pb-5 shadow-lg min-h-[535px]">
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
                        <p className="font-bold">Singha Durbar, Kathmandu</p>
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
                <div className="text-3xl font-bold bg-gradient-to-tl bg-blue-950 py-3 text-gradient border-b-2">
                    Log In To Your Account
                </div>
                {/* Sign In Form */}
                <div className="mx-36">
                    <SignInPage closeRegisterModal={closeReg}/>
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
