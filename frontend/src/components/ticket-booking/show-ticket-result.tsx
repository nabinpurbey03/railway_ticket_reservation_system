import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import React from "react";
import {useLocation} from "react-router-dom";
import {addDays} from "date-fns";

const classTypes = [
    {'Economy': 400},
    {'Business': 40},
    {'First Class': 40},
    {'Ladies': 80}
]

interface Props {
    data: object | undefined;
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
        <Card className="flex flex-col px-16 rounded-none min-h-[63vh]">
            <CardHeader>
                <CardTitle>{`${sourceStation} to ${destinationStation}`}</CardTitle>
                <CardDescription>{journeyDate.toLocaleDateString("en-CA")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full justify-center items-center space-x-10">
                    {
                        data?.tickets ?
                            data?.tickets.map((ticket, index) => (
                                <TicketCard
                                    key={index}
                                    ticket={ticket}
                                    classType={ticket}
                                    numberOfTickets={number0fTickets}
                                    availableTickets={ticket}
                                />
                            )) : <TicketCard
                                key={0}
                                ticket={"0"}
                                classType={'economy'}
                                numberOfTickets={number0fTickets}
                                availableTickets={1}
                            />
                    }
                </div>
            </CardContent>
        </Card>
    );
};
export default ShowTicketResult;


interface TicketCardProps {
    ticket: string;
    classType: string;
    numberOfTickets: number;
    availableTickets: number;
}

const TicketCard: React.FC<TicketCardProps> = ({ticket, classType, numberOfTickets, availableTickets}) => {
    return (
        <Card className="w-1/3 bg-red-50">
            <CardHeader>
                <CardTitle>{classType}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between text-gray-600">
                <div className="text-left">
                    <ul>
                        <li>Total Seats</li>
                        <li>Reserved Seats</li>
                        <li>Available Seats</li>
                        <li>Selected Seats</li>
                        <li>Price Per Seat</li>
                        <li className="font-bold text-right text-black">Total Price</li>
                    </ul>
                </div>
                <div className="text-right">
                    <ul>
                        <li>{ticket}</li>
                        <li>500</li>
                        <li>{availableTickets}</li>
                        <li>{numberOfTickets}</li>
                        <li>30</li>
                        <li className="font-bold text-black">150</li>
                    </ul>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant={"constructive"}>Book</Button>
            </CardFooter>
        </Card>
    )
}