import {Button} from "@/components/ui/button.tsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface Props {
    data: {
        pnr_number: string;
        journey_date: string;
        total_fare: number;
        ticket_status: string;
        class_type: string;
        source_station: string;
        destination_station: string;
        departure_time: string;
        arrival_time: string;
    };
}


const TicketDocument: React.FC<Props> = ({data}) => {
    const [seatsLoading, setSeatsLoading] = useState(true);
    const [seats, setSeats] = useState("");

    const getSeats = async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/get-booked-seats/${data.pnr_number}`);
            if (!response.data.status) {
                return [];
            }
            return response.data.seats;
        }catch(error){
            return [error];
        }
    }
    
    useEffect(() => {
        const fetchSeats = async () => {
            const seatData = await getSeats();
            setSeats(seatData);
        }
        fetchSeats();
        setSeatsLoading(false);
    }, [])

    const printRef = React.useRef(null);

    const handleDownloadPdf = async () => {
        const element = printRef.current;
        if (!element) {
            return;
        }

        const canvas = await html2canvas(element, {
            scale: 2,
        });
        const data = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: "a4",
        });

        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();

        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Ticket_${Cookies.get("first_name")}_${Cookies.get("last_name")}.pdf`);
    };

    return (
        <>
            <div ref={printRef}>
                <div className="flex bg-blue-900 flex-row justify-between h-[150px] p-4">
                    <div>
                        <img
                            alt="Emblem_of_Nepal"
                            src="/assets/images/emblem_of_nepal.svg"
                            className="object-contain h-full cursor-pointer"
                        />
                    </div>
                    <div className="text-white font-bold mt-3 text-center">
                        <p>Government of Nepal</p>
                        <p>Ministry of Physical Infrastructure and Transport</p>
                        <p className="text-3xl">Department of Railways</p>
                        <p>Singha Durbar, Kathmandu</p>
                    </div>
                    <div>
                        <img
                            alt="Waving Nepal Flag"
                            src="/assets/images/nepal_flag.gif"
                            className="object-fill h-full"
                        />
                    </div>
                </div>

                {/*    Ticket data      */}

                <div className="flex justify-around text-black text-lg mt-5">
                    <div className="flex flex-col space-y-1">
                        <p>Booked By</p>
                        <p>PNR Number</p>
                        <p>Journey Date</p>
                        <p>Class Type</p>
                        <p>Seats</p>
                        <p>Source Station | Time</p>
                        <p>Destination Station | Time</p>
                        <p>Ticket Status</p>
                        <p>Total Amount Paid</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <p>{Cookies.get("first_name")} {Cookies.get("last_name")}</p>
                        <p  className="font-bold">{data.pnr_number}</p>
                        <p>{data.journey_date}</p>
                        <p>{data.class_type}</p>
                        <p>{
                            seatsLoading ? "Seats Loading" : seats
                        }</p>
                        <p>{data.source_station} | {data.departure_time}</p>
                        <p>{data.destination_station} | {data.arrival_time}</p>
                        <p>{data.ticket_status}</p>
                        <p  className="font-bold">रु. {data.total_fare}</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <img src="/assets/images/qr-code.jpg" alt="QR" className="h-[100px] w-[100px]"/>
                </div>
            </div>
            <div className="flex justify-end mt-24">
                <Button variant="constructive" onClick={handleDownloadPdf}>Download Ticket</Button>
            </div>
        </>
    );
}

export default TicketDocument;