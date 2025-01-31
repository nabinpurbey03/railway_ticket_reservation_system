import React, {ReactElement, useState} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Input} from "@/components/ui/input.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Toaster} from "@/components/ui/toaster.tsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import {z} from "zod";
import {AddressFormSchema} from "@/components/schema";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button.tsx";
import axios from "axios";
import {toast} from "@/hooks/use-toast.ts";
import Cookies from "js-cookie";
import {set_name_cookies} from "@/components/helper.ts";

type AddressInputProps = {
    data: Record<string, Record<string, Record<string, string[]>>>;
};

const AddressInput: React.FC<AddressInputProps> = ({data}): ReactElement => {
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
    const wards: string[] | null =
        selectedProvince &&
        selectedDistrict &&
        selectedMunicipality &&
        data[selectedProvince][selectedDistrict][selectedMunicipality];

    const form = useForm({
        resolver: zodResolver(AddressFormSchema),
        defaultValues: {
            province: "",
            district: "",
            municipality: "",
            ward: "",
            tole: "",
            houseNumber: "",
        },
    });

    const onSubmit = async (formData: z.infer<typeof AddressFormSchema>) => {
        const payload = {
            user_id: Cookies.get("id"),
            province: formData.province,
            district: formData.district,
            municipality: formData.municipality,
            ward: formData.ward,
            tole: formData.tole,
            house_number: formData.houseNumber,
        }
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/api/add-address", payload);
            if (response.data.status) {
                toast({
                    title: response.data.message,
                })
                await set_name_cookies({res: response});
            } else {
                toast({
                    title: response.data.message,
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Something went wrong:",
                description: error instanceof Error ? error.message : "An unknown error occurred",
                variant: "destructive"
            })
        }
    };

    return (
        <Card className="p-6 mx-auto h-[80vh]">
            <Toaster/>
            <CardContent>
                <section className="font-bold text-cyan-800 bg-gray-200 rounded p-1 mb-3 text-2xl">
                    Your Address Details
                </section>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6">
                            <div className="grid gap-4 grid-cols-2">
                                {/* Province */}
                                <Controller
                                    control={form.control}
                                    name="province"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Province</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
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
                                                        {provinces.map((province) => (
                                                            <SelectItem key={province} value={province}>
                                                                {province}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* District */}
                                <Controller
                                    control={form.control}
                                    name="district"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>District</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
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
                                                        {districts.map((district) => (
                                                            <SelectItem key={district} value={district}>
                                                                {district}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* Municipality */}
                                <Controller
                                    control={form.control}
                                    name="municipality"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Municipality</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        setSelectedMunicipality(value);
                                                        setSelectedWard(null);
                                                    }}
                                                    disabled={!selectedDistrict}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Municipality"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {municipalities.map((municipality) => (
                                                            <SelectItem key={municipality} value={municipality}>
                                                                {municipality}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* Ward */}
                                <Controller
                                    control={form.control}
                                    name="ward"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Ward Number</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    disabled={!selectedMunicipality}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Ward"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {wards?.map((ward) => (
                                                            <SelectItem key={ward} value={ward}>
                                                                {ward}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-4 grid-cols-2">
                                {/* Tole Name */}
                                <FormField
                                    control={form.control}
                                    name="tole"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Tole Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {/* House Number */}
                                <FormField
                                    control={form.control}
                                    name="houseNumber"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>House Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="text"/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-1/5 mt-4" variant={"constructive"}>
                            Save
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default AddressInput;
