import React, {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select, SelectTrigger, SelectContent, SelectItem, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {Card, CardContent} from "@/components/ui/card";
import {PersonalDetailSchema} from "@/components/schema";
import {Separator} from "@/components/ui/separator.tsx";

type FormData = z.infer<typeof PersonalDetailSchema>;

const PersonalDetailsForm: React.FC = () => {
    const [profileImage, setProfileImage] = useState("assets/images/user_avatar1.png");
    const [citizenshipFront, setCitizenshipFront] = useState("assets/images/card.jpg");
    const [citizenshipBack, setCitizenshipBack] = useState("assets/images/card.jpg");
    const [cardImage, setCardImage] = useState("assets/images/card.jpg");

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(PersonalDetailSchema),
    });

    const cardType = watch("cardType");

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string>>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    return (
        <Card className="p-6 mx-auto">
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <div className="flex justify-between">
                            {/* First Name */}
                            <div>
                                <Label>First Name</Label>
                                <Input {...register("firstName")} placeholder="First Name"/>
                                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                            </div>

                            {/* Middle Name */}
                            <div>
                                <Label>Middle Name</Label>
                                <Input {...register("middleName")} placeholder="Middle Name"/>
                            </div>

                            {/* Last Name */}
                            <div>
                                <Label>Last Name</Label>
                                <Input {...register("lastName")} placeholder="Last Name"/>
                                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        <Separator className="border-"/>
                        <div className="flex justify-evenly">
                            {/* Profile Image */}
                            <div>
                                <Label>Profile Image</Label>
                                <div className="flex">
                                    <img src={profileImage} alt="Profile"
                                         className="w-20 h-20 object-cover rounded-full"/>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, setProfileImage)}
                                    />
                                </div>
                                {/* Date of Birth */}
                            </div>
                            <div>
                                <Label>Date of Birth</Label>
                                <Input type="date" {...register("dateOfBirth")} />
                                {errors.dateOfBirth &&
                                    <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
                            </div>
                        </div>


                        {/* Gender */}
                        <div>
                            <Label>Gender</Label>
                            <Select
                                onValueChange={(value) => setValue("gender", value, {shouldValidate: true})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Gender"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                        </div>

                        {/* Card Type */}
                        <div>
                            <Label>Card Type</Label>
                            <Select
                                onValueChange={(value) => setValue("cardType", value, {shouldValidate: true})}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Card Type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Citizenship">Citizenship</SelectItem>
                                    <SelectItem value="Passport">Passport</SelectItem>
                                    <SelectItem value="National Identity Card">National Identity Card</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.cardType && <p className="text-red-500 text-sm">{errors.cardType.message}</p>}
                        </div>

                        {/* Card Images */}
                        {cardType === "Citizenship" && (
                            <div>
                                <Label>Citizenship Images</Label>
                                <div className="flex gap-4">
                                    <div>
                                        <Label>Front</Label>
                                        <img
                                            src={citizenshipFront}
                                            alt="Citizenship Front"
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, setCitizenshipFront)}
                                        />
                                    </div>
                                    <div>
                                        <Label>Back</Label>
                                        <img
                                            src={citizenshipBack}
                                            alt="Citizenship Back"
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, setCitizenshipBack)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {(cardType === "Passport" || cardType === "National Identity Card") && (
                            <div>
                                <Label>Card Image (Front)</Label>
                                <img src={cardImage} alt="Card" className="w-20 h-20 object-cover rounded"/>
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
