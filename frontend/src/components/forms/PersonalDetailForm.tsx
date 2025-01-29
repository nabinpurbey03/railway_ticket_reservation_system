import React, { ReactElement, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { PersonalDetailSchema } from "@/components/schema";
import { Separator } from "@/components/ui/separator.tsx";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster.tsx";
import { useToast } from "@/hooks/use-toast.ts";
import { districts } from "@/components/forms/districts.ts";

type FormData = z.infer<typeof PersonalDetailSchema>;

const PersonalDetailsForm: React.FC = (): ReactElement => {
    const { toast } = useToast();
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [citizenshipFront, setCitizenshipFront] = useState<File | null>(null);
    const [citizenshipBack, setCitizenshipBack] = useState<File | null>(null);
    const [cardImage, setCardImage] = useState<File | null>(null);
    const [age, setAge] = useState<number | null>(null);

    const updateAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dateOfBirth = e.target.value;

        if (!dateOfBirth) {
            setAge(null);
            return;
        }

        const dob = new Date(dateOfBirth);
        const today = new Date();

        let age: number = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        setAge(age);
    };

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(PersonalDetailSchema),
    });

    const cardType = watch("cardType");

    const onSubmit = async (data: FormData) => {
        const formData = new FormData();

        formData.append("firstName", data.firstName);
        formData.append("middleName", data.middleName || "");
        formData.append("lastName", data.lastName);
        formData.append("dateOfBirth", data.dateOfBirth);
        formData.append("gender", data.gender);
        formData.append("cardType", data.cardType);
        formData.append("cardNumber", data.cardNumber);
        formData.append("issuingDistrict", data.issuedDistrict);

        if (profileImage) {
            formData.append("profileImage", profileImage);
        }

        if (data.cardType === "Citizenship") {
            if (citizenshipFront) {
                formData.append("citizenshipFront", citizenshipFront);
            }
            if (citizenshipBack) {
                formData.append("citizenshipBack", citizenshipBack);
            }
        } else if (cardImage) {
            formData.append("cardImage", cardImage);
        }

        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + "/api/add-pd", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.data.status) {
                toast({
                    title: response.data.message,
                });
            } else {
                toast({
                    title: response.data.message,
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Data Not Saved:",
                description: error instanceof Error ? error.message : "An unknown error occurred",
                variant: "destructive",
            });
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<File | null>>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <Card className="p-6 mx-auto">
            <Toaster />
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <div className="flex justify-between">
                            {/* First Name */}
                            <div>
                                <Label>First Name</Label>
                                <Input {...register("firstName")} placeholder="First Name" />
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                            </div>

                            {/* Middle Name */}
                            <div>
                                <Label>Middle Name</Label>
                                <Input {...register("middleName")} placeholder="Middle Name" />
                            </div>

                            {/* Last Name */}
                            <div>
                                <Label>Last Name</Label>
                                <Input {...register("lastName")} placeholder="Last Name" />
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        <Separator className="border-2" />
                        <div className="flex justify-between">
                            {/* Profile Image */}
                            <div>
                                <Label>Profile Image</Label>
                                <div className="flex">
                                    <img
                                        src={profileImage ? URL.createObjectURL(profileImage) : "assets/images/user_avatar1.png"}
                                        alt="Profile"
                                        className="w-20 h-20 object-cover rounded-full"
                                    />
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setProfileImage)}
                                        name="profileImage"
                                    />
                                </div>
                            </div>
                            {/* Date of Birth */}
                            <div>
                                <Label>Date of Birth</Label>
                                <Input
                                    type="date"
                                    {...register("dateOfBirth")}
                                    onChange={(e) => updateAge(e)}
                                />
                                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
                            </div>
                            <div>
                                <p className="border px-5 py-2 rounded-lg mt-5">Age = {age ?? "N/A"}</p>
                            </div>
                            {/* Gender */}
                            <div>
                                <Label>Gender</Label>
                                <Select
                                    onValueChange={(value) => setValue("gender", value, { shouldValidate: true })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="M">Male</SelectItem>
                                        <SelectItem value="F">Female</SelectItem>
                                        <SelectItem value="O">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                            </div>
                        </div>

                        <Separator className="border-2" />
                        <div className="flex justify-between">
                            {/* Card Type */}
                            <div>
                                <Label>Card Type</Label>
                                <Select
                                    onValueChange={(value) => setValue("cardType", value, { shouldValidate: true })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Card Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Citizenship">Citizenship</SelectItem>
                                        <SelectItem value="Passport">Passport</SelectItem>
                                        <SelectItem value="National Identity Card">National Identity Card</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.cardType && <p className="text-red-500 text-sm">{errors.cardType.message}</p>}
                            </div>
                            <div>
                                <Label>Card Number</Label>
                                <Input {...register("cardNumber")} placeholder="Card Number" />
                                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>}
                            </div>
                            {/* Issued District */}
                            <div>
                                <Label>Issued District</Label>
                                <Select
                                    onValueChange={(value) => setValue("issuedDistrict", value, { shouldValidate: true })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select District" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {districts.map((district: string, index: number): ReactElement => (
                                            <SelectItem value={district} key={index}>
                                                {district}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                            </div>
                        </div>

                        {/* Card Images */}
                        {cardType === "Citizenship" && (
                            <div>
                                <Label>Citizenship Images</Label>
                                <div className="flex gap-4">
                                    <div>
                                        <Label>Front</Label>
                                        <img
                                            src={citizenshipFront ? URL.createObjectURL(citizenshipFront) : "assets/images/card.jpg"}
                                            alt="Citizenship Front"
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, setCitizenshipFront)}
                                            name="citizenshipFront"
                                        />
                                    </div>
                                    <div>
                                        <Label>Back</Label>
                                        <img
                                            src={citizenshipBack ? URL.createObjectURL(citizenshipBack) : "assets/images/card.jpg"}
                                            alt="Citizenship Back"
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, setCitizenshipBack)}
                                            name="citizenshipBack"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {(cardType === "Passport" || cardType === "National Identity Card") && (
                            <div>
                                <Label>Card Image (Front)</Label>
                                <img
                                    src={cardImage ? URL.createObjectURL(cardImage) : "assets/images/card.jpg"}
                                    alt="Card"
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, setCardImage)}
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button type="submit" className="w-1/5 mt-4" variant="constructive">
                            Submit
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default PersonalDetailsForm;