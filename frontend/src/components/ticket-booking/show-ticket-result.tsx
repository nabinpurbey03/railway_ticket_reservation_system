import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import React from "react";

const ShowTicketResult:React.FC = () => {

    return (
        <Card className="flex flex-col px-16 rounded-none min-h-[63vh]">
            <CardHeader>
                <CardTitle>Janakpur to Kathmandu</CardTitle>
                <CardDescription>{new Date().toDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex w-full justify-center items-center space-x-10">
                <Card className="w-1/3 bg-red-50">
                    <CardHeader>
                        <CardTitle>General</CardTitle>
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
                                <li>1000</li>
                                <li>1000</li>
                                <li>500</li>
                                <li>500</li>
                                <li>5</li>
                                <li>30</li>
                                <li className="font-bold text-black">150</li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button variant={"constructive"}>Book</Button>
                    </CardFooter>
                </Card>
                <Card className="w-1/3 bg-red-50">
                    <CardHeader>
                        <CardTitle>General</CardTitle>
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
                                <li>1000</li>
                                <li>1000</li>
                                <li>500</li>
                                <li>500</li>
                                <li>5</li>
                                <li>30</li>
                                <li className="font-bold text-black">150</li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button variant={"constructive"}>Book</Button>
                    </CardFooter>
                </Card>
                <Card className="w-1/3 bg-red-50">
                    <CardHeader>
                        <CardTitle>General</CardTitle>
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
                                <li>1000</li>
                                <li>1000</li>
                                <li>500</li>
                                <li>500</li>
                                <li>5</li>
                                <li>30</li>
                                <li className="font-bold text-black">150</li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button variant={"constructive"}>Book</Button>
                    </CardFooter>
                </Card>
            </div>
            </CardContent>
        </Card>
    );
};
export default ShowTicketResult;