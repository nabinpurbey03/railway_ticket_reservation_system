import React from 'react'
import Image from 'next/image'

function Navbar() {
    return (
        <div id='navbar' className="flex w-full h-[20vh] bg-blue-900 p-1">
            <div className="basis-1/4 relative">
                    <Image
                        alt='Emblem_of_Nepal'
                        fill
                        src="/asstes/images/Emblem_of_Nepal.svg"
                        className="object-contain"
                    />
            </div>
            <div className="basis-1/2 flex justify-center items-center flex-col">
                <h1 className="font-bold">Government of Nepal</h1>
                <h1 className="font-bold">Ministry of Physical Infrastructure and Transport</h1>
                <h1 className="font-bold text-3xl">Department of Railways</h1>
                <h1 className="font-bold">Bishalnagar, Kathmandu</h1>
            </div>
            <div className="basis-1/4 relative">
                <Image
                    alt='Wavin Nepal Flag'
                    fill
                    src="/asstes/images/Nepal_Flag.gif"
                    className="object-contain"
                />
            </div>
        </div>
    )
}

export default Navbar;