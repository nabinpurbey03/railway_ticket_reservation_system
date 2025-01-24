import {Button} from "@/components/ui/button.tsx";
import React, {ReactElement, useState} from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import UsernameInput from "@/components/forms/UsernameInput.tsx";
import LoginForm from "@/components/auth/login-form.tsx";

const SignInPage: React.FC = (): ReactElement => {
    const [tab, setTab] = useState(1);

    // const form = useForm()

    return (
        tab === 1 ? <div className="text-black">
                <LoginForm />
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