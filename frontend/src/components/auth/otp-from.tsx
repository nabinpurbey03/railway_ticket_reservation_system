import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp.tsx";
import React, { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast.ts";
import { Toaster } from "@/components/ui/toaster.tsx";

interface Props {
    updateTab: () => void;
}

const OtpForm: React.FC<Props> = ({ updateTab }) => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const verifyOtp = async (otpCode: string) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/verify-otp`, { otp: otpCode });
            return response.data;
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "OTP verification failed.");
        }
    };

    const onComplete = useCallback(async () => {
        if (loading) return;

        setLoading(true);
        try {
            const result = await verifyOtp(otp);

            if (result.status) {
                toast({ title: result.message });
                updateTab();
            } else {
                toast({ title: result.message, variant: "destructive" });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
            toast({ title: "OTP verification failed", description: errorMessage, variant: "destructive" });
        } finally {
            setLoading(false);
        }
    }, [otp, loading, updateTab]);

    return (
        <div className="font-bold text-black">
            <p className="text-blue-700 text-xl my-7">Please Enter The OTP</p>
            <Toaster />
            <div className="flex items-center justify-center my-10">
                <InputOTP maxLength={6} onComplete={onComplete} onChange={setOtp} disabled={loading}>
                    <InputOTPGroup>
                        {[...Array(6)].map((_, index) => (
                            <InputOTPSlot key={index} index={index} />
                        ))}
                    </InputOTPGroup>
                </InputOTP>
            </div>
        </div>
    );
};

export default OtpForm;
