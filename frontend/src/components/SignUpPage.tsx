import Navbar from "@/components/Navbar.tsx";
import GeneralInput from "@/components/forms/GeneralInput.tsx";
import AddressInput from "@/components/forms/AddressInput.tsx";
import nepal from "@/components/forms/local_levels_nepal_eng.json"
import UsernameInput from "@/components/forms/UsernameInput.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/Input.tsx";
import CardInput from "@/components/forms/CardInput.tsx";
import Divider from "@/components/forms/Divider.tsx";
import {Button} from "@/components/ui/Button.tsx";
import React, {ReactElement} from "react";

const SignUpPage: React.FC = ():ReactElement => {

    return (
        <div>
            <Navbar showReg={function (): void {
                throw new Error("Function not implemented.");
            }}/>
            <div className="bg-white text-black flex items-center justify-center font-bold pb-1">
                <div className="w-4/5 bg-pink-50 px-5 shadow-2xl">
                    <Divider dividerName={"Personal Details"} />
                    <div className="grid grid-cols-3 gap-2">
                        <GeneralInput id="firstname" label="First Name"/>
                        <GeneralInput id="middlename" label="Middle Name"/>
                        <GeneralInput id="lastname" label="Last Name"/>
                    </div>
                    <div>
                        <CardInput/>
                    </div>
                    <Divider dividerName={"Address Details"} />
                    <AddressInput data={nepal}/>
                    <Divider dividerName={"Contact Details"} />
                    <div className="grid grid-cols-2 gap-2">
                        <UsernameInput label="Email"/>
                        <div>
                            <Label className="flex pl-2 pb-2 pt-5 font-bold">
                                Phone Number
                            </Label>
                            <Input type="number"/>
                        </div>
                    </div>
                    <Button>Submit</Button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
