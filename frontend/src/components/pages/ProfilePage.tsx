import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import Navbar from "@/components/pages/Navbar.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import React, {ReactElement, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Eye, EyeOff} from "lucide-react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {ChangePasswordSchema} from "@/components/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/hooks/use-toast.ts";
import {Toaster} from "@/components/ui/toaster.tsx";
import axios from "axios";
import bcrypt from "bcryptjs";

const ProfilePage = () => {
    return (
        <>
            <Navbar showReg={function (): void {
            }}/>
            <div className="flex justify-center items-center w-full">
                <Card className="w-2/3">
                    <Toaster/>
                    <CardContent>
                        <div className="bg-gray-100 flex justify-center items-center space-x-10 rounded-lg py-2">
                            <Avatar className="w-32 h-32">
                                <AvatarImage src="/assets/images/emblem_of_nepal.svg"/>
                                <AvatarFallback>RN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="font-bold text-2xl">Nabin Purbey</h1>
                                <h1 className="text-gray-400">example@provider.com</h1>
                            </div>
                        </div>
                        {/*<div>*/}
                        <Card className="flex flex-col text-start bg-gray-100 mt-5">
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                                <CardDescription>Logged in with email.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <h1 className="font-bold text-lg">Name</h1>
                                <p>Nabin Purbey</p>
                                <h1 className="font-bold text-lg mt-5">Address</h1>
                                <p>Mulabari-8, Dhanushadham Municipality</p>
                                <p>Dhanusha, Madhesh Pradesh</p>
                                <div className="flex justify-between w-full items-center">
                                    <div>
                                        <h1 className="font-bold text-lg mt-5">Password</h1>
                                        <p>********</p>
                                    </div>
                                    <div>
                                        <ChangePassword triggerButton={(<Button variant="outline">Change</Button>)}/>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        {/*</div>*/}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Deploy</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default ProfilePage;


interface Props {
    triggerButton: ReactElement;
}

const ChangePassword: React.FC<Props> = ({triggerButton}): ReactElement => {
    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const [open, setOpen] = useState(false); // 🔹 State to control the dialog visibility

    const form = useForm<z.infer<typeof ChangePasswordSchema>>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords((prev) => ({...prev, [field]: !prev[field]}));
    };

    const verifyPassword = async (email: string) => {
        try {
            return await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, {email});
        } catch (error) {
            throw new Error("Failed to change password. Please check your credentials." + error);
        }
    };

    const changePassword = async (email: string, new_password: string) => {
        try {
            return await axios.post(`${import.meta.env.VITE_API_URL}/api/change-password`, {email, new_password});
        } catch (error) {
            throw new Error("Failed to change password. Please check your credentials." + error);
        }
    };

    const onSubmit = async (data: z.infer<typeof ChangePasswordSchema>) => {
        console.log(data);
        const user_email = "nokal22256@ahaks.com";

        if (data.currentPassword === data.newPassword) {
            toast({title: "Your current password and new password are the same", variant: "destructive"});
            return;
        }

        if (data.newPassword === data.confirmPassword) {
            try {
                const checkPasswordResponse = await verifyPassword(user_email);
                if (!checkPasswordResponse.data.status) {
                    toast({title: checkPasswordResponse.data.message, variant: "destructive"});
                    return;
                }

                const passwordMatch = await bcrypt.compare(data.currentPassword, checkPasswordResponse.data.password);
                if (!passwordMatch) {
                    toast({
                        title: "Password Change Unsuccessful",
                        description: "Incorrect password.",
                        variant: "destructive"
                    });
                    return;
                }

                const hashedPassword = await bcrypt.hash(data.newPassword, 12);
                const changePasswordResponse = await changePassword(user_email, hashedPassword);
                if (!changePasswordResponse) {
                    toast({title: checkPasswordResponse.data.message, variant: "destructive"});
                    return;
                }

                toast({title: "Password Change Successful"});

                setTimeout(() => setOpen(false), 500); // 🔹 Close dialog after success

                

            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                toast({title: "Login failed", description: errorMessage, variant: "destructive"});
            }
        } else {
            toast({title: "Your new password and confirmation do not match", variant: "destructive"});
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>{triggerButton}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] text-black">
                <DialogHeader>
                    <DialogTitle className="text-black">Change Password</DialogTitle>
                    <DialogDescription>
                        Make changes to your password here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4 text-black">
                            {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
                                <FormField
                                    key={field}
                                    control={form.control}
                                    name={field as "currentPassword" | "newPassword" | "confirmPassword"}
                                    render={({field: inputField}) => (
                                        <FormItem>
                                            <FormLabel>
                                                {field === "currentPassword" ? "Current Password" : field === "newPassword" ? "New Password" : "Confirm Password"}
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        {...inputField}
                                                        type={showPasswords[field as keyof typeof showPasswords] ? "text" : "password"}
                                                        placeholder="********"
                                                        className="pr-10"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => togglePasswordVisibility(field as keyof typeof showPasswords)}
                                                        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                                    >
                                                        {showPasswords[field as keyof typeof showPasswords] ?
                                                            <EyeOff className="h-5 w-5 text-gray-500"/> :
                                                            <Eye className="h-5 w-5 text-gray-500"/>}
                                                    </button>
                                                </div>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            ))}
                        </div>
                        <DialogFooter>
                            <Button type="submit" variant="constructive">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};


