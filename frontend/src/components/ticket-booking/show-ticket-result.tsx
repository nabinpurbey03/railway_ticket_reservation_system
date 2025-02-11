import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import React from "react";

const classTypes = [
    'Economy',
    'Business',
    'First Class',
    'Ladies'
]

interface Props {
    tickets: [],
    numberOfSeats: number;
}

const ShowTicketResult:React.FC<Props> = ({tickets, numberOfSeats}) => {

    return (
        <Card className="flex flex-col px-16 rounded-none min-h-[63vh]">
            <CardHeader>
                <CardTitle>Janakpur to Kathmandu</CardTitle>
                <CardDescription>{new Date().toDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex w-full justify-center items-center space-x-10">
                {
                    tickets.length > 1 ?
                    tickets.map((ticket, index) => (
                        <TicketCard
                            key={index}
                            ticket={ticket[classTypes[index]]}
                            classType={classTypes[index]}
                            numberOfSeats={numberOfSeats}
                        />
                    )) : <TicketCard
                            key={0}
                            ticket={tickets[0]}
                            classType={'economy'}
                            numberOfSeats={numberOfSeats}
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
    numberOfSeats: number;
}

const TicketCard:React.FC<TicketCardProps> = ({ticket, classType, numberOfSeats}) => {
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
                        <li>500</li>
                        <li>{numberOfSeats}</li>
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