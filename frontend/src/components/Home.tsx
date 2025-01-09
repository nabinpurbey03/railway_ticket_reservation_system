import SimpleImageSlider from "react-simple-image-slider";
import Navbar from "@/components/Navbar.tsx";
import RegistrationPage from "@/components/RegistrationPage.tsx";
import {useState} from "react";
// import RegistrationPage from "@/components/RegistrationPage.tsx";
export default function Home() {

    const [reg, setReg] = useState(false);

    const regPageHandler = () => {
        setReg(!reg);
    }

    const images = [
        {url: "/assets/images/train_nepal.jpg"},
        {url: "/assets/images/emblem_of_nepal.svg"},
        {url: "/assets/images/emblem_of_nepal.svg"},
    ]

    return (
        <div className="relative z-10">
            <Navbar showReg={regPageHandler}/>
            <div className="bg-gray-600">
                <SimpleImageSlider
                    width="100%"
                    height="85vh"
                    images={images}
                    showBullets={false}
                    showNavs={false}
                    autoPlay={false}
                />
            </div>
            <div className="absolute w-full top-0 z-0">
                {
                    reg ? <RegistrationPage closeReg={regPageHandler}/> : null
                }

            </div>
        </div>
    )
}