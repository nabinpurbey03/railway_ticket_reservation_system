import React, {ReactElement, useState} from "react";
import LoginForm from "@/components/auth/login-form.tsx";
import EmailRegistration from "@/components/auth/email-registration.tsx";
import OtpFrom from "@/components/auth/otp-from.tsx";
import {Button} from "@/components/ui/button.tsx";
import PasswordConfirmationForm from "@/components/auth/password-confirmation.tsx";
import GLOBALS from "@/components/globals.ts";

interface Props {
    closeRegisterModal(): void;
}


const SignInPage: React.FC<Props> = ({closeRegisterModal}): ReactElement => {
    const [tab, setTab] = useState(1);
    const forgotPassword = (): void => {
        setTab(2);
        GLOBALS.forgotPassword = true;
    }
    switch (tab) {
        case 1:
            return <div className="text-black">
                <LoginForm closeRegisterModal={closeRegisterModal} nextTab={forgotPassword}/>
                <section className="mt-5">Don't have an Account? <Button variant={"link"}
                                                                         onClick={() => setTab(2)}>Register &#10095;</Button>
                </section>
            </div>;
        case 2:
            return <EmailRegistration nextTab={() => setTab(3)} prevTab={() => setTab(1)}/>;
        case 3:
            return <OtpFrom updateTab={() => setTab(4)}/>;
        case 4:
            return <PasswordConfirmationForm updateTab={() => setTab(1)}/>
        default:
            return <></>
    }
}

export default SignInPage;