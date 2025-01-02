import {useState} from "react";
import SignInPage from "@/components/SignInPage.tsx";
import SignUpPage from "@/components/SignUpPage.tsx";

const RegistrationPage = () => {

    const [tab, setTab] = useState(1);

    function updateTab(pos: number): void {
        setTab(pos);
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-2/5 bg-white rounded-lg ">

                <div className="flex rounded-t-lg flex-row bg-blue-950 justify-between h-[150px] p-4 pb-10">
                    <div>
                        <img
                            alt='Emblem_of_Nepal'
                            src="/assets/images/emblem_of_nepal.svg"
                            className="object-contain h-full cursor-pointer"
                        />
                    </div>
                    <div className="">
                        <p className="font-bold">Government of Nepal</p>
                        <p className="font-bold">Ministry of Physical Infrastructure and Transport</p>
                        <p className="font-bold text-3xl">Department of Railways</p>
                        <p className="font-bold">Bishalnagar, Kathmandu</p>
                    </div>
                    <div>
                        <img
                            alt='Waving Nepal Flag'
                            src="/assets/images/nepal_flag.gif"
                            className="object-fill h-full"
                        />
                    </div>
                </div>
                <div className="w-full bg-black"></div>
                <div id="reg-sec">
                    <div className="flex flex-row justify-around items-center font-bold pt-2 pb-5 px-5">
                        <div
                            className={tab === 1 ? "bg-blue-300 tab" : "tab"}
                            onClick={() => updateTab(1)}
                        >Sign In
                        </div>
                        <div
                            className={tab === 2 ? "bg-blue-300 tab" : "tab"}
                            onClick={() => updateTab(2)}
                        >Create an Account
                        </div>
                    </div>
                    <div className={"font-bold text-black w-3/5 ml-[20%] px-5"}>
                        {tab === 1 ? <SignInPage/> : <SignUpPage/>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RegistrationPage;