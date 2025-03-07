import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import React, {ReactElement} from "react";
import {useLocation} from "react-router-dom";
import {addDays} from "date-fns";
import {Separator} from "@/components/ui/separator.tsx";
import {
    Dialog,
    DialogContent, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import Cookies from "js-cookie";
import {destinations} from "@/components/ticket-booking/destinations.ts";

const classTypes = [
    {Economy: 200},
    {Ladies: 80},
    {"First Class": 80},
    {Business: 40}
];

interface TicketData {
    distance: number;
    train_name: string;
    ticket_prices: Record<string, number>[]; // Array of objects with classType as key and price as value
    tickets: Record<string, number>[]; // Array of objects with classType as key and available ticket count as value
    total_ticket?: number;
    ticket_price?: number;
    ticket?: Record<string, number>;
}

interface Props {
    data?: TicketData;
    numberOfTickets: number;
}

const ShowTicketResult: React.FC<Props> = ({data, numberOfTickets}) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const journeyDate = new Date(
        params.get("journeyDate") || addDays(new Date(), 1)
    ).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    const sourceStation = params.get("sourceStation") || "Janakpur";
    const destinationStation = params.get("destinationStation") || "Kathmandu";

    return (
        <Card className="flex flex-col px-6 rounded-none min-h-[63vh] bg-transparent border-0">
            <CardHeader>
                <CardTitle className="text-blue-700 text-3xl">{`${sourceStation} to ${destinationStation}`}</CardTitle>
                <CardDescription className="text-blue-500">{journeyDate}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full justify-center items-center space-x-4">
                    {data?.tickets ? (
                        classTypes.map((classType, index) => {
                            const className = Object.keys(classType)[0]; // Get the class type (e.g., "Economy")
                            return (
                                <TicketCard
                                    key={index}
                                    journeyDate={journeyDate}
                                    classType={className}
                                    numberOfTickets={numberOfTickets}
                                    distance={data.distance}
                                    trainName={data.train_name}
                                    pricePerTicket={data.ticket_prices?.[index]?.[className] || 0}
                                    availableTickets={data.tickets?.[index]?.[className] || 0}
                                    totalTicket={classType[className]}
                                    reservedTicket={classType[className] - (data.tickets?.[index]?.[className] || 0)}
                                    totalPrice={parseFloat(((data.ticket_prices?.[index]?.[className] || 0) * numberOfTickets).toFixed(2))}
                                />
                            );
                        })
                    ) : data?.ticket ? (
                        <TicketCard
                            journeyDate={journeyDate}
                            numberOfTickets={numberOfTickets}
                            classType={Object.keys(data.ticket)[0]}
                            distance={data.distance}
                            trainName={data.train_name}
                            pricePerTicket={data.ticket_price || 0}
                            totalPrice={parseFloat(((data.ticket_price || 0) * numberOfTickets).toFixed(2))}
                            availableTickets={data.ticket[Object.keys(data.ticket)[0]] || 0}
                            totalTicket={data.total_ticket || 0}
                            reservedTicket={(data.total_ticket || 0) - (data.ticket[Object.keys(data.ticket)[0]] || 0)}
                        />
                    ) : (
                        <p className="text-red-500">No ticket data available.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ShowTicketResult;

interface TicketCardProps {
    classType?: string;
    trainName?: string;
    distance?: number;
    totalTicket?: number;
    reservedTicket?: number;
    availableTickets?: number;
    numberOfTickets?: number;
    pricePerTicket?: number;
    totalPrice?: number;
    journeyDate?: string;
}

const TicketCard: React.FC<TicketCardProps> = ({
                                                   totalTicket,
                                                   classType,
                                                   numberOfTickets,
                                                   availableTickets,
                                                   totalPrice,
                                                   distance,
                                                   trainName,
                                                   pricePerTicket,
                                                   reservedTicket,
                                                   journeyDate
                                               }) => {
    const ticketData = {
        classType,
        trainName,
        distance,
        totalTicket,
        reservedTicket,
        availableTickets,
        numberOfTickets,
        pricePerTicket,
        totalPrice,
        journeyDate
    };

    return (
        <Card className="w-1/2 bg-blue-200">
            <CardHeader>
                <CardTitle className="text-blue-600">{classType || "N/A"}</CardTitle>
            </CardHeader>
            <Separator/>
            <CardContent className="flex justify-between text-gray-600">
                <div className="text-left basis-1/2">
                    <ul>
                        <li>Train Name</li>
                        <li>Total Distance</li>
                        <li>Total Ticket</li>
                        <li>Reserved Ticket</li>
                        <li>Available Ticket</li>
                        <li>Selected Ticket</li>
                        <li>Price Per Ticket</li>
                        <Separator/>
                        <li className="font-bold text-right text-black">Total Price</li>
                    </ul>
                </div>
                <div className="text-right basis-1/2 text-blue-950">
                    <ul>
                        <li>{trainName || "N/A"}</li>
                        <li>{distance ? `${distance} KM` : "N/A"}</li>
                        <li>{totalTicket || "N/A"}</li>
                        <li>{reservedTicket || 0}</li>
                        <li>{availableTickets || "N/A"}</li>
                        <li>{numberOfTickets || "N/A"}</li>
                        <li>{pricePerTicket ? `रु. ${pricePerTicket}` : "N/A"}</li>
                        <Separator/>
                        <li className="font-bold text-black">{totalPrice ? `रु. ${totalPrice}` : "N/A"}</li>
                    </ul>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <ConfirmationDialog
                    button={<Button variant={"constructive"}
                                    disabled={availableTickets <= numberOfTickets}>Book</Button>}
                    data={ticketData}
                />
            </CardFooter>
        </Card>
    );
};


interface ConfirmationDialogProps {
    button: ReactElement;
    data: TicketCardProps;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({button, data}) => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const sourceStation = params.get("sourceStation") || "Janakpur";
    const destinationStation = params.get("destinationStation") || "Kathmandu";

    const departure = destinations.find(s => s.place === sourceStation);
    const arrival = destinations.find(d => d.place === destinationStation);
    const departureTime = data.trainName === "DORE-WNPL" ? departure?.ew_time : departure?.we_time;
    const arrivalTime = data.trainName === "DORE-WNPL" ? arrival?.ew_time : arrival?.we_time;

    return (
        <Dialog>
            <DialogTrigger asChild>
                {button}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] sm:max-h-[425px] text-black">
                <DialogHeader>
                    <DialogTitle className="text-center">Ticket Confirmation</DialogTitle>
                    <DialogDescription className="text-center">
                        After confirming the ticket will be in WAITING, will be confirmed after the payment.
                    </DialogDescription>
                    <DialogTitle
                        className="text-center">{data.journeyDate}</DialogTitle>
                </DialogHeader>
                <Separator />
                <DialogTitle className="text-center">{data.classType} Class</DialogTitle>
                <div className="text-black flex justify-between">
                    <div>
                        <p>Source Station</p>
                        <p className="font-bold">{sourceStation}</p>
                        <p>Arrival Time <span className="font-bold">{departureTime}</span></p>
                    </div>
                    <div>
                        <p>Destination Station</p>
                        <p className="font-bold">{destinationStation}</p>
                        <p>Departure Time <span className="font-bold">{arrivalTime}</span></p>
                    </div>
                </div>
                <p className="text-center">Selected Tickets &nbsp; &nbsp; <span className="font-bold">{data.numberOfTickets}</span></p>
                <p className="text-center">Total Amount &nbsp; &nbsp; <span className="font-bold">{data.totalPrice}</span></p>

                <DialogFooter>
                    <Button type="submit" disabled={Cookies.get('is_active') !== 'true'}> Confirm </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

