import {Button} from "@/components/ui/button.tsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";

const TicketDocument = () => {

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
        pdf.save("examplepdf.pdf");
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
                        <p>Booked Date</p>
                        <p>Journey Date</p>
                        <p>Class Type</p>
                        <p>Seats</p>
                        <p>Source Station | Time</p>
                        <p>Destination Station | Time</p>
                        <p>Ticket Status</p>
                        <p>Total Amount Paid</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <p>Nabin Purbey</p>
                        <p>123456-GDRT-HAHS-587896</p>
                        <p>2025-02-25</p>
                        <p>2365-98-65</p>
                        <p className="font-bold">Economy</p>
                        <p className="font-bold">A1, A2, A2, A2, AS, AS, SD, ED, SE, DF, DG</p>
                        <p className="font-bold">Janakpur | 07:00</p>
                        <p className="font-bold">Kathmandu | 02:00</p>
                        <p className="font-bold">Confirmed</p>
                        <p>Rs. 2000</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <img src="/assets/images/qr-code.jpg" alt="QR" className="h-[100px] w-[100px]"/>
                </div>
            </div>
            <div className="flex justify-end mt-24">
                <Button variant="constructive" onClick={handleDownloadPdf}>Print Ticket</Button>
            </div>
        </>
    );
}

export default TicketDocument;