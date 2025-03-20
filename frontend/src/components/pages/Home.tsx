import SimpleImageSlider from "react-simple-image-slider";
import Navbar from "@/components/pages/Navbar.tsx";
import RegistrationPage from "@/components/pages/RegistrationPage.tsx";
import {ReactElement, useState} from "react";
import {Toaster} from "@/components/ui/toaster.tsx";
import Cookies from "js-cookie";
import Ticket from "@/components/ticket-booking/ticket.tsx";

export default function Home(): ReactElement {

    const loggedIn = Cookies.get("loggedIn") === "true";
    const [reg, setReg] = useState(false);

    const regPageHandler = (): void => {
        setReg(!reg);
    }

    const images = [
        {url: "/assets/images/img.png"},
        {url: "/assets/images/img_1.png"},
        {url: "/assets/images/img_2.jpg"},
        {url: "/assets/images/train_nepal.jpg"}
    ]

    return (
        <div className="relative z-10">
            <Toaster/>
            <Navbar showReg={regPageHandler}/>
            <SimpleImageSlider
                width="100%"
                height="85vh"
                images={images}
                showBullets={false}
                showNavs={false}
                autoPlay={false}
                autoPlayDelay={5}
            />
            <div className="absolute w-full top-0 z-0">
                {
                    reg && !loggedIn ? <RegistrationPage closeReg={regPageHandler}/> : null
                }
            </div>
            {/*lowe section*/}
            <div className="w-full min-h-[100vh]">
                {/*authority image and info section*/}
                <div className="flex min-h-[70vh]">
                    {/*for minister*/}
                    <div className="bg-white text-black font-bold w-full flex flex-col justify-center items-center">
                        <div className="p-5 m-2 bg-gray-100 rounded">
                            <img src="/assets/images/qr-code.jpg" alt="Minister"/>
                        </div>
                        <section>
                            <p>Minister of Physical Infrastructure and Transport</p>
                            <p>Contact No: <span className="text-green-600 font-normal hover:underline hover:cursor-pointer"> +977 01-420-420</span></p>
                            <p>Email: <span className="text-green-600 font-normal hover:underline hover:cursor-pointer"> minister.420@mopit.com</span></p>
                        </section>
                    </div>
                    {/*for secretary*/}
                    <div className="bg-gray-600 text-black font-bold w-full flex flex-col justify-center items-center">
                        <div>
                            <img src="/assets/images/qr-code.jpg" alt="Minister"/>
                        </div>
                        <section>
                            <p>Secretary of Physical Infrastructure and Transport</p>
                            <p>Contact No: <span className="text-green-600 font-normal hover:underline hover:cursor-pointer"> +977 01-420-420</span></p>
                            <p>Email: <span className="text-green-600 font-normal hover:underline hover:cursor-pointer"> secretary.420@mopit.com</span></p>
                        </section>
                    </div>
                </div>
                <div className="w-full min-h-[30vh] bg-gray-950">
                    <footer>
                        <ul>
                            <li>Name</li>
                            <li>Name</li>
                            <li>Name</li>
                            <li>Name</li>
                        </ul>
                    </footer>
                </div>
            </div>
            <Ticket/>
        </div>
    )
}