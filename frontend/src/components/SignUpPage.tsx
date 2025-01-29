import Navbar from "@/components/Navbar.tsx";
import React, {ReactElement} from "react";
// import PersonalDetailForm from "@/components/forms/PersonalDetailForm.tsx";
import PersonalDetailForm2 from "@/components/forms/PersonalDetailForm.tsx";

const SignUpPage: React.FC = ():ReactElement => {

    return (
        <>
            <Navbar showReg={function (): void {
                throw new Error("Function not implemented.");
            }}/>
            <div className="bg-black text-black flex items-center justify-center">
                <div className="w-4/5 bg-gray-600 px-5 shadow-2xl">
                    {/*<div className="flex justify-between">*/}
                    {/*    <div>Personal Details</div>*/}
                    {/*    <div>Address</div>*/}
                    {/*    <div>Preview</div>*/}
                    {/*</div>*/}
                    <PersonalDetailForm2 />
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
