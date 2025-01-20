import {Button} from "@/components/ui/Button.tsx";
import React, {ReactElement, useState} from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import UsernameInput from "@/components/forms/UsernameInput.tsx";
import PasswordInput from "@/components/forms/PasswordInput.tsx";
import GLOBALS from "@/components/globals.ts";

const SignInPage: React.FC = (): ReactElement => {
    const [tab, setTab] = useState(1);
    function verifyEmail(){
        console.log(GLOBALS.email);
        console.log(GLOBALS.password);
    }

    return (
        tab === 1 ? <div
                className="font-bold text-black">
                <UsernameInput label="Username"/>
                <PasswordInput/>
                <Button className="pb-2 w-full bg-blue-600 mb-3 pt-3" onClick={verifyEmail}>Sign In</Button>
                <div className="flex font-light">Not have an account? &nbsp;
                    <p
                        className="cursor-pointer text-blue-700 hover:underline hover:text-blue-400"
                        onClick={(): void => setTab(2)}
                    >Register &#10097;</p>
                </div>
            </div>
            : tab === 2
                ? <div className="text-black font-bold">
                    <UsernameInput label="Email"/>
                    <Button className="bg-blue-700" onClick={verifyEmail}>Verify</Button>
                </div>
                : <div className="py-5 text-black font-bold">
                    <div className="flex justify-center">
                        <InputOTP maxLength={6}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0}/>
                                <InputOTPSlot index={1}/>
                                <InputOTPSlot index={2}/>
                                <InputOTPSlot index={3}/>
                                <InputOTPSlot index={4}/>
                                <InputOTPSlot index={5}/>
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <Button className="pb-2 w-full bg-blue-600 mb-3 pt-3 mt-10">Validate OTP</Button>
                </div>
    )
}

export default SignInPage;