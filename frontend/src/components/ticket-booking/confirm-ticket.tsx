import Navbar from "@/components/pages/Navbar.tsx";
import React from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import Cookies from "js-cookie";

const ConfirmTicket: React.FC = () => {

    console.log(Cookies.get('pnr_number'));

    return(
        <>
            <Navbar showReg={() => {
            }}/>
            <main>
                <Card className="rounded-none min-h-[85vh]">
                    <CardHeader>
                        <CardTitle>Your Ticket(s) is in
                            <span className="text-yellow-400"> WAITING </span>
                            Status Make Payment To
                            <span className="text-green-600"> CONFIRM</span>
                        </CardTitle>
                        <Separator />
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        {/*<div className="min-w-[1000px] grid grid-cols-2 font-bold bg-pink-50 py-5">*/}
                        {/*    <div className="text-left pl-40 flex flex-col gap-y-1">*/}
                        {/*        <h1>Ticket Booked By</h1>*/}
                        {/*        <h1>Journey Date</h1>*/}
                        {/*        <h1>Source Destination</h1>*/}
                        {/*        <h1>Destination Station</h1>*/}
                        {/*        <h1>Class Type</h1>*/}
                        {/*        <h1>Total Seats</h1>*/}
                        {/*        <h1>Seat Number(s)</h1>*/}
                        {/*        <h1>Total Fair</h1>*/}
                        {/*    </div>*/}
                        {/*    <div className="text-left pl-40 flex flex-col gap-y-1">*/}
                        {/*        <h1>Nabin Purbey</h1>*/}
                        {/*        <h1>2025/03/15</h1>*/}
                        {/*        <h1>Janakpur | <span className="text-green-600">07:00</span></h1>*/}
                        {/*        <h1>Kathmandu | <span className="text-green-600">11:00</span></h1>*/}
                        {/*        <h1>Ladies</h1>*/}
                        {/*        <h1>5</h1>*/}
                        {/*        <h1>10, 11, 12, 13, 14, 15</h1>*/}
                        {/*        <h1>200</h1>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <table>
                            <tbody className="w-full">
                            <tr>
                                <td>Name</td>
                                <td>Nabin Purbey</td>
                            </tr>
                            </tbody>
                        </table>

                    </CardContent>
                    <CardFooter className="flex justify-end mr-64">
                        <Button variant="constructive">Make Payment</Button>
                    </CardFooter>
                </Card>
            </main>
        </>
    )
}

export default ConfirmTicket;