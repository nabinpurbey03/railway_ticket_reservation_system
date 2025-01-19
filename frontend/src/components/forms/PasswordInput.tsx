import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/Input.tsx";
import React, {ChangeEvent, ReactElement, useState} from "react";
import {validate} from "@/components/forms/Validator.ts";
import GLOBALS from "@/components/globals.ts";

const PasswordInput: React.FC = (): ReactElement => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = (): void => {
        setShowPassword(!showPassword);
    };

    function valid(pwd: string): void {
        const pwdErrorElement: Element | null = document.querySelector("#pe");
        const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/;
        const message = "Invalid password";
        if (validate(pwd, pwdErrorElement, message, pwdRegex)) {
            GLOBALS.password = pwd;
        }
    }

    return (
        <div className="pb-5 pt-2">
            <Label htmlFor="password" className="font-bold pb-2 flex">
                Password
            </Label>
            <div className="flex items-center border border-gray-300 rounded">
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="flex-1 px-3 py-2 rounded-l"
                    onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                        valid(e.target.value)
                    }
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="px-3 py-2 text-gray-600 border-l border-gray-300 rounded-r"
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>
            <p className="text-red-700" id="pe"></p>
        </div>
    );
};

export default PasswordInput;
