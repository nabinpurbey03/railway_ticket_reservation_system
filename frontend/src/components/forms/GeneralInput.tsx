import {Input} from "@/components/ui/Input.tsx";
import {Label} from "@/components/ui/label.tsx";
import React, {ChangeEvent, ReactElement} from "react";
import {validate} from "@/components/Validator.tsx";

interface GeneralInputProps {
    id: string; // Input id and htmlFor value
    label: string; // Label text content
}

const GeneralInput: React.FC<GeneralInputProps> = ({id, label}: GeneralInputProps): ReactElement => {

    const err: string = id + "-err";

    function valid(name: string): void {
        const emailErrorElement: Element | null = document.querySelector("#" + err);
        const userRegex = /^[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)*$/;
        const message = "Invalid " + label;
        validate(name, emailErrorElement, message, userRegex)
    }

    return (
        <div className="w-full">
            <Label htmlFor={id} className="flex pl-2 pb-2 font-bold">
                {label}
            </Label>
            <Input
                type="text"
                id={id}
                onChange={
                    (e: ChangeEvent<HTMLInputElement>): void => valid(e.target.value)
                }
            />
            <p id={err} className="text-red-700 pt-1"></p>
        </div>
    );
};

export default GeneralInput;