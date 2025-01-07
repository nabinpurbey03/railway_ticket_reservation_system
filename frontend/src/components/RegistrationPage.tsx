import SignInPage from "@/components/SignInPage.tsx";

const RegistrationPage = () => {

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-2/5 bg-white rounded-lg pb-5">
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
                <div
                    className="text-black text-4xl font-bold bg-blue-300 underline py-3 s-bg"
                >Sign In Here</div>
                <div className="mx-36">
                    <SignInPage />
                </div>
            </div>
        </div>
    )
}

export default RegistrationPage;