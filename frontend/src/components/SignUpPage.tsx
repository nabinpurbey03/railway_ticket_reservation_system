import {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import data from "../nepal_location.json";
import {Button} from "@/components/ui/Button.tsx";

const SignUpPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedMunicipality, setSelectedMunicipality] = useState('');
    const [districts, setDistricts] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);

    const handleProvinceChange = (provinceId: string) => {
        const province = data.provinceList.find((p) => p.id === parseInt(provinceId));
        setSelectedProvince(provinceId);
        setSelectedDistrict('');
        setSelectedMunicipality('');
        setDistricts(province?.districtList || []);
        setMunicipalities([]);
    };

    const handleDistrictChange = (districtId: string) => {
        const district = districts.find((d) => d.id === parseInt(districtId));
        setSelectedDistrict(districtId);
        setSelectedMunicipality('');
        setMunicipalities(district?.municipalityList || []);
    };

    const handleMunicipalityChange = (municipalityId: string) => {
        setSelectedMunicipality(municipalityId);
        console.log(selectedProvince, selectedDistrict, municipalityId);
    };

    return (
        <div className="font-bold text-black w-full bg-gray-200">
            <div className="flex bg-gray-300 pl-2">Personal Details</div>
            <div>
                {/* Name Fields */}
                <div className="flex flex-row justify-between px-1">
                    {["First Name", "Middle Name", "Last Name"].map((name, index) => (
                        <div key={index} className="py-2 mx-1">
                            <Label htmlFor={name.toLowerCase().replace(" ", "")} className="font-bold pb-2 flex">
                                {name}
                            </Label>
                            <Input type="text"/>
                        </div>
                    ))}
                </div>

                <div className="flex border-b-2 bg-gray-300 my-3 pl-2">Address Details</div>
                {/* Province and District Selection */}
                <div className="flex flex-row w-full px-1">
                    <div className="py-2 mx-1 basis-1/2">
                        <Label className="font-bold pb-2 flex">Province</Label>
                        <Select onValueChange={handleProvinceChange} value={selectedProvince}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Province"/>
                            </SelectTrigger>
                            <SelectContent>
                                {data.provinceList.map((province) => (
                                    <SelectItem key={province.id} value={province.id.toString()}>{province.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="py-2 mx-1 basis-1/2">
                        <Label className="font-bold pb-2 flex">District</Label>
                        <Select
                            onValueChange={handleDistrictChange}
                            value={selectedDistrict}
                            disabled={!districts.length}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select District"/>
                            </SelectTrigger>
                            <SelectContent>
                                {districts.map((district) => (
                                    <SelectItem key={district.id}
                                                value={district.id.toString()}>{district.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Municipality and Ward Selection */}
                <div className="flex flex-row w-full px-1">
                    <div className="py-2 mx-1 basis-1/2">
                        <Label className="font-bold pb-2 flex">Municipality</Label>
                        <Select
                            onValueChange={handleMunicipalityChange}
                            value={selectedMunicipality}
                            disabled={!municipalities.length}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Municipality"/>
                            </SelectTrigger>
                            <SelectContent>
                                {municipalities.map((municipality) => (
                                    <SelectItem key={municipality.id}
                                                value={municipality.id.toString()}>{municipality.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="py-2 mx-1 basis-1/2">
                        <Label htmlFor="ward" className="font-bold pb-2 flex">
                            Ward
                        </Label>
                        <Input type="number" max="35" min="1"/>
                    </div>
                </div>

                {/* Additional Fields */}
                <div className="flex flex-row w-full px-1">
                    <div className="py-2 mx-1 basis-1/2">
                        <Label htmlFor="tole" className="font-bold pb-2 flex">
                            Tole Name
                        </Label>
                        <Input type="text"/>
                    </div>
                </div>
                <div className="flex border-b-2 bg-gray-300 pl-2">Sign in Details</div>


                {/* Sign in Fields */}
                <div className="flex flex-row px-1 justify-evenly">
                    <div className="py-2 basis-1/2 px-1">
                        <Label htmlFor="email" className="font-bold pb-2 flex">Username</Label>
                        <Input type="email" placeholder="example@provider.com"/>
                    </div>
                    <div className="py-2 basis-1/2 px-1">
                        <Label htmlFor="password" className="font-bold pb-2 flex">Password</Label>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full pr-10"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-[31%] bottom-[10.2%] bg-gray-200 rounded px-2 py-1 text-sm"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
            </div>
            <Button className="bg-blue-600 mb-1">Submit</Button>
        </div>
    );
};

export default SignUpPage;
