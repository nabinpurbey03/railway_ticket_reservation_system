import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/Input.tsx";
import {Button} from "@/components/ui/Button.tsx";
import {useState} from "react";
import signInValidator from "@/components/Validator.tsx";

const SignInPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validation = () => {
        const valid = signInValidator(email, password);

        // Cache DOM elements
        const emailErrorElement = document.querySelector("#ue");
        const passwordErrorElement = document.querySelector("#pe");

        // Helper function to update error messages
        const updateError = (element: Element | null, message :string) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            element.innerHTML = message || ""; // Clear message if none provided
        };

        // Clear previous errors
        updateError(emailErrorElement, "");
        updateError(passwordErrorElement, "");

        // Validate and set error messages
        if (!valid.email) {
            updateError(emailErrorElement, "Invalid email address");
        }
        if (!valid.password) {
            updateError(passwordErrorElement, "Invalid password");
        }
    };


    return (
        <form onClick={(e) => e.preventDefault()} className="font-bold text-black">
            <div className="py-5">
                <Label htmlFor="email" className="font-bold pb-2 flex">Username</Label>
                <Input
                    type="email"
                    placeholder="example@provider.com"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-red-700" id="ue"></p>
            </div>
            <div className="pb-5 pt-2">
                <Label htmlFor="password" className="font-bold pb-2 flex">Password</Label>
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full pr-10"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-red-700" id='pe'></p>
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-[39.9%] bottom-[32.3%] bg-gray-200 rounded px-2 py-1 text-sm"
                >
                    {showPassword ? "Hide" : "Show"}
                </button>
            </div>
            <Button className="pb-2 w-full bg-blue-600 mb-3 pt-3" onClick={validation}>Sign In</Button>
            <div className="flex font-light">Not have an account? &nbsp;
                <span>Register &#10097;</span>
            </div>
        </form>
    )
}

export default SignInPage;