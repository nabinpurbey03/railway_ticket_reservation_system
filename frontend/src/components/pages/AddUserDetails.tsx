import Navbar from "@/components/pages/Navbar.tsx";
import React, {ReactElement, useState} from "react";
import AddressInput from "@/components/forms/AddressInput.tsx";
import nepal from "@/components/forms/local_levels_nepal_eng.json";
import PersonalDetailForm from "@/components/forms/PersonalDetailForm.tsx";

const AddUserDetails: React.FC = (): ReactElement => {

    const [tab, setTab] = useState(true);

    return (
        <>
            <Navbar showReg={function (): void {
                throw new Error("Function not implemented.");
            }}/>
            <div className="text-black flex bg-[#0d3b66] items-center justify-center min-h-[85vh]">
                <div className="w-4/5 shadow-2xl">
                    {tab ? (<PersonalDetailForm changeTab={() => setTab(false)}/>) : (<AddressInput data={nepal}/>)}
                </div>
            </div>
        </>
    );
};

export default AddUserDetails;
