import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/Input.tsx";
import {Button} from "@/components/ui/Button.tsx";
import {useState} from "react";

const SignInPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form>
            <div className="py-2">
                <Label htmlFor="email" className="font-bold pb-2 flex">Username</Label>
                <Input type="email" placeholder="example@provider.com"/>
            </div>
            <div className="py-2">
                <Label htmlFor="password" className="font-bold pb-2 flex">Password</Label>
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full pr-10"
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-[39.9%] bottom-[31.5%] bg-gray-200 rounded px-2 py-1 text-sm"
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>
            <Button className="pb-2 flex bg-blue-600 mb-3">Submit</Button>
        </form>
    )
}

export default SignInPage;