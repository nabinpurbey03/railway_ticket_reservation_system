import SimpleImageSlider from "react-simple-image-slider";
import Navbar from "@/components/Navbar.tsx";
import RegistrationPage from "@/components/RegistrationPage.tsx";
import {ReactElement, useState} from "react";
import {Toaster} from "@/components/ui/toaster.tsx";
import Cookies from "js-cookie";

export default function Home(): ReactElement {

    const loggedIn = Cookies.get("loggedIn") === "true";

    const [reg, setReg] = useState(false);

    const regPageHandler = (): void => {
        setReg(!reg);
    }

    const images = [
        {url: "/assets/images/train_nepal.jpg"},
        {url: "/assets/images/emblem_of_nepal.svg"},
        {url: "/assets/images/emblem_of_nepal.svg"},
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
            />
            <div className="absolute w-full top-0 z-0">
                {
                    reg && !loggedIn ? <RegistrationPage closeReg={regPageHandler}/> : null
                }
            </div>

        </div>
    )
}