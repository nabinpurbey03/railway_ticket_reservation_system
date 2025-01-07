import GLOBAL from "@/globals.ts";

function User(){

    const showReg = () => {
        GLOBAL.regOn = !GLOBAL.regOn;
        console.log(GLOBAL.regOn);
    }

    return (
        <div className="flex flex-row h-full justify-end items-center">
            <div className="pr-2.5">
                <p className="text-1xl font-bold">Nabin Purbey</p>
                <p>Customer</p>
            </div>
            <div
                className="border-4 w-[13%] rounded-full overflow-hidden p-2 border-slate-900 cursor-pointer bg-gray-300"
                onClick={showReg}
            >
                <img
                    src="/assets/images/user_avatar.png"
                    alt="User Avatar"
                    className="object-contain h-full w-full"
                />
            </div>
        </div>
    )
}

export default User;