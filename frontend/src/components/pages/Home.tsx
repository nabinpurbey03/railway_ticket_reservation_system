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
                    <div className="bg-gray-700 text-black font-bold w-full flex flex-col items-center">
                        <div className="m-2 bg-gray-100 rounded border w-[400px] h-[300px]">
                            <img
                                src="/assets/images/dogesh_sharma.png"
                                alt="Minister"
                                className="object-fill h-full w-full"/>
                        </div>
                        <section>
                            <p>Shree Dogesh Sharma</p>
                            <p>Minister of Physical Infrastructure and Transport</p>
                            <p>Contact No: <span className="text-green-600 font-normal hover:underline hover:cursor-pointer"> +977 01-420-420</span></p>
                            <p>Email: <span className="text-green-600 font-normal hover:underline hover:cursor-pointer"> minister.420@mopit.com</span></p>
                        </section>
                        <article className="font-normal mt-5 px-10">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa enim in temporibus ullam? A ad autem dicta eligendi fugit ipsum laboriosam odit officia quia repellat? Aliquid aperiam exercitationem fugit velit!
                        </article>
                        <p className="w-full text-right italic">- Minister: Dogesh Sharma</p>
                    </div>
                    {/*for secretary*/}
                    <div className="bg-gray-700 text-black font-bold w-full flex flex-col items-center">
                        <article className="font-normal mt-5 px-10">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa enim in temporibus ullam? A ad autem dicta eligendi fugit ipsum laboriosam odit officia quia repellat? Aliquid aperiam exercitationem fugit velit!
                        </article>
                        <p className="w-full text-right italic">- Minister: Dogesh Sharma</p>
                        <div className="m-2 bg-gray-100 rounded border border-b-8">
                            <img src="/assets/images/qr-code.jpg" alt="Minister"/>
                        </div>
                        <section>
                            <p>Shree Dogesh Sharma</p>
                            <p>Minister of Physical Infrastructure and Transport</p>
                            <p>Contact No: <span className="text-green-600 font-normal hover:underline hover:cursor-pointer"> +977 01-420-420</span></p>
                            <p>Email: <span className="text-green-600 font-normal hover:underline hover:cursor-pointer"> minister.420@mopit.com</span></p>
                        </section>
                    </div>
                </div>
                <div className="min-h-[25vh] bg-blue-400">
                    <footer>
                        <div className="w-full flex h-[25vh]">
                            <div className="w-full text-right pr-40">
                                <ul>
                                    <li>Halo</li>
                                    <li>Halo</li>
                                    <li>Halo</li>
                                    <li>Halo</li>
                                </ul>
                            </div>
                            <div className="w-full text-left pl-40">
                                <ul>
                                    <li>Halo</li>
                                    <li>Halo</li>
                                    <li>Halo</li>
                                    <li>Halo</li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>
                <div className="min-h-[5vh] bg-slate-200 text-slate-700">
                    <section className="text-sm pt-2">&copy; <a
                        href="https://nabinpurbey03.github.io/nabinpurbey.com.np/"
                        target="_blank"
                        className="text-blue-700"
                    >Nabin Purbey</a> 2025 Tribhuvan University Final Year Project</section>
                </div>
            </div>
            <Ticket/>
        </div>
    )
}