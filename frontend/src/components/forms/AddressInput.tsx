import React, {ReactElement, useState} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import GeneralInput from "@/components/forms/GeneralInput.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";


type AddressInputProps = {
    data: Record<string, Record<string, Record<string, string[]>>>;
};

const AddressInput: React.FC<AddressInputProps> = ({data}: AddressInputProps): ReactElement => {
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [selectedMunicipality, setSelectedMunicipality] = useState<string | null>(null);
    const [selectedWard, setSelectedWard] = useState<string | null>(null);

    const provinces: string[] = Object.keys(data);
    const districts: string[] = selectedProvince ? Object.keys(data[selectedProvince]) : [];
    const municipalities: string[] =
        selectedProvince && selectedDistrict
            ? Object.keys(data[selectedProvince][selectedDistrict])
            : [];
    const wards: "" | string[] | null =
        selectedProvince &&
        selectedDistrict &&
        selectedMunicipality &&
        data[selectedProvince][selectedDistrict][selectedMunicipality];

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-x-3">
                {/* Province Selection */}
                <div>
                    <Label className="flex font-bold pl-2 pb-2">Province</Label>
                    <Select
                        value={selectedProvince || ""}
                        onValueChange={(value: string): void => {
                            setSelectedProvince(value);
                            setSelectedDistrict(null);
                            setSelectedMunicipality(null);
                            setSelectedWard(null);
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Province"/>
                        </SelectTrigger>
                        <SelectContent>
                            {provinces.map((province: string): ReactElement => (
                                <SelectItem key={province} value={province}>
                                    {province}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* District Selection */}
                <div>
                    <Label className="flex font-bold pl-2 pb-2">District</Label>
                    <Select
                        value={selectedDistrict || ""}
                        onValueChange={(value: string): void => {
                            setSelectedDistrict(value);
                            setSelectedMunicipality(null);
                            setSelectedWard(null);
                        }}
                        disabled={!selectedProvince}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select District"/>
                        </SelectTrigger>
                        <SelectContent>
                            {districts.map((district: string): ReactElement => (
                                <SelectItem key={district} value={district}>
                                    {district}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-3">
                {/* Municipality Selection */}
                <div>
                    <Label className="flex font-bold pl-2 pb-2">Municipality</Label>
                    <Select
                        value={selectedMunicipality || ""}
                        onValueChange={(value: string): void => {
                            setSelectedMunicipality(value);
                            setSelectedWard(null);
                        }}
                        disabled={!selectedDistrict}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Municipality"/>
                        </SelectTrigger>
                        <SelectContent>
                            {municipalities.map((municipality: string): ReactElement => (
                                <SelectItem key={municipality} value={municipality}>
                                    {municipality}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Ward Selection */}
                <div>
                    <Label className="flex font-bold pl-2 pb-2">Ward No</Label>
                    <Select
                        value={selectedWard || ""}
                        onValueChange={setSelectedWard}
                        disabled={!selectedMunicipality}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Ward"/>
                        </SelectTrigger>
                        <SelectContent>
                            {wards?.map((ward: never): ReactElement => (
                                <SelectItem key={ward} value={ward}>
                                    {ward}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-3">
                <GeneralInput id="tole" label="Tole"/>
                <div>
                    <Label className="flex pl-2 pb-2 font-bold">
                        House Number
                    </Label>
                    <Input type="text"/>
                </div>
            </div>
        </div>
    );
};

export default AddressInput;
