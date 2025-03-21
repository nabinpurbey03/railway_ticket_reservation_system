import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressCard,
    faBuilding, faClock,
    faEnvelope,
    faHouse,
    faLocationDot,
    faPhone, faSnowflake, faSun
} from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
    return (
        <>
            <div className="min-h-[25vh] bg-[#2834c9]">
                <footer>
                    <div className="w-full flex h-[25vh]">
                        <div className="w-full text-left items-center flex justify-center">
                            <ul>
                                <li className="font-bold text-xl"> <FontAwesomeIcon icon={faAddressCard} className="pr-2"/>Contact Details</li>
                                <li><FontAwesomeIcon icon={faHouse} className="text-red-500 pr-2" /> <a
                                    href="https://www.mopit.gov.np/en/" target="_blank">Ministry of Physical Infrastructure and Transport</a></li>
                                <li><FontAwesomeIcon icon={faBuilding} className="text-red-500 pr-2"/> Department of Railway</li>
                                <li> <FontAwesomeIcon icon={faLocationDot} className="text-red-500 pr-2"/> Singha Durbar, Kathmandu, Nepal</li>
                                <li><FontAwesomeIcon icon={faPhone} className="text-red-500 pr-2"/><a href="tel:+97701420420">01 420-420</a></li>
                                <li><FontAwesomeIcon icon={faEnvelope} className="text-red-500 pr-2"/><a
                                    href="mailto:project.railway@gmail.com"> project.railway@gmail.com</a></li>
                            </ul>
                        </div>
                        <div className="w-full text-left items-center flex justify-center">
                            <ul>
                                <li className="font-bold text-xl"><FontAwesomeIcon icon={faClock} /> Office Hours</li>
                                <li className="font-bold text-red-500"><FontAwesomeIcon icon={faSun}/> Summer </li>
                                <li>Sunday to Thursday: 10 AM to 5 PM</li>
                                <li>Friday: 10 AM to 3 PM</li>
                                <li className="font-bold text-red-500"><FontAwesomeIcon icon={faSnowflake} /> Winter </li>
                                <li>Sunday to Thursday: 11 AM to 4 PM</li>
                                <li>Friday: 11 AM to 3 PM</li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
            <div className="min-h-[5vh] bg-blue-800">
                <section className="text-sm pt-2">All Right Reserve <a
                    href="https://nabinpurbey03.github.io/nabinpurbey.com.np/"
                    target="_blank"
                    className="text-red-500"
                >Nabin Purbey</a> &copy; 2025 <a
                    href="https://tu.edu.np/"
                    className="text-red-500"
                    target="_blank"
                >Tribhuvan University</a> Final Year Project</section>
            </div>
        </>
    )
}

export default Footer;