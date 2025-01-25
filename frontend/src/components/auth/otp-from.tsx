import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp.tsx";
import React, {ReactElement, useState} from "react";
import axios from "axios";
import {toast} from "@/hooks/use-toast.ts";
import {Toaster} from "@/components/ui/toaster.tsx";

interface Props {
    updateTab(): void;
}
const OtpFrom: React.FC<Props> = ({updateTab}): ReactElement => {
    const [otp, setOtp] = useState("");

    const onComplete = async () => {
        try {
            const payload = {
                otp: otp
            }
            const response = await axios.post(import.meta.env.VITE_API_URL + "/api/verify-otp", payload);
            if (response.data.status) {
                toast({
                    title: response.data.message,
                })
                updateTab();
            } else {
                toast({
                    title: response.data.message,
                    // description: "Please enter a valid email",
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "OTP failed:",
                description: error instanceof Error ? error.message : "An unknown error occurred",
                variant: "destructive"
            })
        }
    }

    return (
        <div className="font-bold text-black">
            <p className="text-blue-700 text-xl my-7">Please Enter The OPT</p>
            <Toaster/>
            <div className="flex items-center justify-center my-10">
                <InputOTP
                    maxLength={6}
                    onComplete={onComplete}
                    onChange={(e) => setOtp(e)}
                >
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
        </div>
    )
}

export default OtpFrom;