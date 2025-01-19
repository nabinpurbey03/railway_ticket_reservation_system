import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import React, {ReactElement} from "react";
import GeneralInput from "@/components/forms/GeneralInput.tsx";

const CardInput: React.FC = (): ReactElement => {
    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="basis-1/2">
                <Label className="flex font-bold pl-2 pb-2">Card Type</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Card Type"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0">Citizenship</SelectItem>
                        <SelectItem value="1">National Identity Card</SelectItem>
                        <SelectItem value="2">Passport</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <GeneralInput label="Card Number" id="card"/>
            </div>
        </div>
    )
}

export default CardInput;