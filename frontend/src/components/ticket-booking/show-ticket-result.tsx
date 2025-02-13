import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import React from "react";
import {useLocation} from "react-router-dom";
import {addDays} from "date-fns";
import {Separator} from "@/components/ui/separator.tsx";

const classTypes = [
    {'Economy': 200},
    {'Business': 40},
    {'First Class': 80},
    {'Ladies': 80}
]

interface Props {
    data?: object;
    number0fTickets: number;
}

const ShowTicketResult: React.FC<Props> = ({data, number0fTickets}) => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const journeyDate = new Date(params.get("journeyDate") || addDays(new Date(), 1));
    const sourceStation = params.get("sourceStation") || "Janakpur";
    const destinationStation = params.get("destinationStation") || "Kathmandu";

    console.log(data);

    return (
        <Card className="flex flex-col px-6 rounded-none min-h-[63vh]">
            <CardHeader>
                <CardTitle>{`${sourceStation} to ${destinationStation}`}</CardTitle>
                <CardDescription>{journeyDate.toLocaleDateString("en-CA")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full justify-center items-center space-x-4">
                    {
                        "tickets" in data ?
                            classTypes.map((classType, index) => {
                                return (
                                    <TicketCard
                                        key={index}
                                        classType={Object.keys(classType)[0]}
                                        numberOfTickets={number0fTickets}
                                        distance={data.distance}
                                        trainName={data.train_name}
                                        pricePerTicket={data.ticket_prices[index][Object.keys(classType)[0]]}
                                        availableTickets={data.tickets[index][Object.keys(classType)[0]]}
                                        totalTicket={classType[Object.keys(classType)[0]]}
                                        reservedTicket={classType[Object.keys(classType)[0]] - data.tickets[index][Object.keys(classType)[0]]}
                                        totalPrice={parseFloat((data.ticket_prices[index][Object.keys(classType)[0]] * number0fTickets).toFixed(2))}
                                    />
                                )
                            })


                            : <TicketCard
                                numberOfTickets={number0fTickets}
                                classType={Object.keys(data.ticket)[0]}
                                distance={data.distance}
                                trainName={data.train_name}
                                pricePerTicket={data.ticket_price}
                                totalPrice={parseFloat((data.ticket_price * number0fTickets).toFixed(2))}
                                availableTickets={data.ticket[Object.keys(data.ticket)[0]]}
                                totalTicket={data.ticket[Object.keys(data.ticket)[0]]}
                                reservedTicket={data.ticket[Object.keys(data.ticket)[0]]}

                            />
                    }
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
    return (
        <Card className="w-1/2 bg-red-50">
            <CardHeader>
                <CardTitle>{classType}</CardTitle>
            </CardHeader>
            <Separator/>
            <CardContent className="flex justify-between text-gray-600">
                <div className="text-left">
                    <ul>
                        <li>Train Name</li>
                        <li>Total Distance</li>
                        <li>Total Ticket</li>
                        <li>Reserved Ticket</li>
                        <li>Available Ticket</li>
                        <li>Selected Ticket</li>
                        <li>Price Per Ticket</li>
                        <li className="font-bold text-right text-black">Total Price</li>
                    </ul>
                </div>
                <div className="text-right">
                    <ul>
                        <li>{trainName}</li>
                        <li>{distance || "N/A"} KM</li>
                        <li>{totalTicket || "N/A"}</li>
                        <li>{reservedTicket || "N/A"}</li>
                        <li>{availableTickets || "N/A"}</li>
                        <li>{numberOfTickets || "N/A"}</li>
                        <li>{pricePerTicket || "N/A"}</li>
                        <li className="font-bold text-black">{totalPrice || "N/A"}</li>
                    </ul>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant={"constructive"}>Book</Button>
            </CardFooter>
        </Card>
    )
}