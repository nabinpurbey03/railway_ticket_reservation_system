import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import React, {ChangeEvent, ReactElement} from "react";
import {validate} from "@/components/forms/Validator.ts";
import GLOBALS from "@/components/globals.ts";

interface UserProps {
    label: string;
}

const UsernameInput: React.FC<UserProps> = ({label}: UserProps): ReactElement => {

    function valid(username: string): void {
        const emailErrorElement: Element | null = document.querySelector("#ue");
        const userRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const message = "Invalid email address"
        if (validate(username, emailErrorElement, message, userRegex)) {
            GLOBALS.email = username;
        } else {
            GLOBALS.email = "";
        }
    }

    return (
        <div className="py-5">
            <Label htmlFor="email" className="font-bold pb-2 flex">{label}</Label>
            <Input
                type="email"
                placeholder="example@provider.com"
                onChange={
                    (e: ChangeEvent<HTMLInputElement>): void => valid(e.target.value)
                }
            />
            <p className="text-red-700" id="ue"></p>
        </div>
    )
}

export default UsernameInput;