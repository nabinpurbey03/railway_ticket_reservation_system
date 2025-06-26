import SimpleImageSlider from "react-simple-image-slider";
import Navbar from "@/components/pages/Navbar.tsx";
import RegistrationPage from "@/components/pages/RegistrationPage.tsx";
import {ReactElement, useState} from "react";
import {Toaster} from "@/components/ui/toaster.tsx";
import Cookies from "js-cookie";
import Ticket from "@/components/ticket-booking/ticket.tsx";
import Footer from "@/components/pages/Footer.tsx";

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
                autoPlay={true}
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
                <div className="flex min-h-[70vh] bg-slate-200 ">
                    {/*for minister*/}
                    <div className="text-black font-bold w-full flex flex-col items-center">
                        <div className="m-2 bg-gray-100 w-[400px] h-[300px]">
                            <img
                                src="/assets/images/dogesh_sharma.png"
                                alt="Minister"
                                className="object-fill h-full w-full rounded"/>
                        </div>
                        <section>
                            <p>Shree Dogesh Sharma</p>
                            <p>Minister of Physical Infrastructure and Transport</p>
                            <p>Contact No: <span
                                className="text-green-600 font-normal hover:underline hover:cursor-pointer"> +977 01-420-420</span>
                            </p>
                            <p>Email: <span
                                className="text-green-600 font-normal hover:underline hover:cursor-pointer"> minister.420@mopit.com</span>
                            </p>
                        </section>
                        <article className="font-normal mt-5 px-10 font-sans italic">
                            As the Railway Minister of Nepal I emphasize the importance of modernizing the country's
                            railway
                            system for economic growth, tourism, and remote access. The implementation of a Railway
                            Ticket Reservation System will address ticket reservation challenges, allowing passengers to
                            book tickets online, manage data, and make data-driven decisions. This digital
                            transformation will make railway travel more convenient and accessible, fostering
                            development and a modern, efficient, and people-centric railway system.
                        </article>
                        <p className="w-full text-right font-sans italic">- Minister: Dogesh Sharma &nbsp; &nbsp;</p>
                    </div>
                    {/*for secretary*/}
                    <div className="text-black font-bold w-full flex flex-col items-center">
                        <article className="font-normal mt-5 px-10 italic font-sans">
                            As the Secretary of the Ministry of Railways is working on transforming Nepal's railway
                            infrastructure to meet modern standards. The proposed system, called the Railway Ticket
                            Reservation System, will digitize ticketing, reduce congestion, and offer real-time seat
                            availability updates. It will also provide data insights to manage passenger flow and
                            optimize operations. This initiative aims to enhance passenger satisfaction, increase
                            efficiency, and modernize Nepal's public transport system.
                        </article>
                        <p className="w-full text-right font-sans italic">- Secretary: Pussy Cat &nbsp; &nbsp;</p>
                        <div className="m-2 bg-gray-100 w-[400px] h-[300px]">
                            <img
                                src="/assets/images/pussy_cat.png"
                                alt="Secretary"
                                className="object-fill h-full w-full rounded"/>
                        </div>
                        <section>
                            <p>Miss Pussy Cat</p>
                            <p>Secretary of Physical Infrastructure and Transport</p>
                            <p>Contact No: <span
                                className="text-green-600 font-normal hover:underline hover:cursor-pointer"> +977 01-420-420</span>
                            </p>
                            <p>Email: <span
                                className="text-green-600 font-normal hover:underline hover:cursor-pointer"> secretary.420@mopit.com</span>
                            </p>
                        </section>
                    </div>
                </div>
                <Footer/>
            </div>
            <Ticket/>
        </div>
    )
}