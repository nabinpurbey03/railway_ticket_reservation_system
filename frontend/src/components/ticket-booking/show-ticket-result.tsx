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
        <Card className="flex flex-col px-6 rounded-none min-h-[63vh]">
            <CardHeader>
                <CardTitle>{`${sourceStation} to ${destinationStation}`}</CardTitle>
                <CardDescription>{journeyDate}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full justify-center items-center space-x-4">
                    {data?.tickets ? (
                        classTypes.map((classType, index) => {
                            const className = Object.keys(classType)[0]; // Get the class type (e.g., "Economy")
                            return (
                                <TicketCard
                                    key={index}
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
                                                   reservedTicket
                                               }) => {
    const handleBook = () => {
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
        };

        console.log("Booking Ticket Data:", ticketData);
    };

    return (
        <Card className="w-1/2 bg-blue-200">
            <CardHeader>
                <CardTitle>{classType || "N/A"}</CardTitle>
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
                <ConfirmationDialog button={<Button variant={"constructive"} onClick={handleBook}
                                                    disabled={availableTickets <= 0}>Book</Button>}/>
            </CardFooter>
        </Card>
    );
};


interface ConfirmationDialogProps {
    button: ReactElement;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({button}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {button}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] sm:max-h-[425px] text-black">
                <DialogHeader>
                    <DialogTitle className="text-center">Ticket Confirmation</DialogTitle>
                    <DialogDescription className="text-center">
                        After confirming the ticket will be in WAITING, will be confirmed after the payment.
                    </DialogDescription>
                </DialogHeader>
                <div className="text-black">
                    <p>Confirmation here</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, eius, laborum. Adipisci animi
                        blanditiis consequuntur corporis earum eveniet ex hic ipsam laboriosam, maxime nostrum quidem
                        quo quod, repudiandae voluptas voluptate.
                    </p>
                </div>
                <DialogFooter>
                    <Button type="submit"> Confirm </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

