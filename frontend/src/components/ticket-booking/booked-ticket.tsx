import React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import axios from "axios";
import {Toaster} from "@/components/ui/toaster";
import {toast} from "@/hooks/use-toast";
import TicketDocument from "@/components/ticket-booking/ticket-document.tsx";
import {setPaymentCookies} from "@/cookies/handle_cookie.ts";

interface BookedTicketProps {
    data: [object];
}

const BookedTicket: React.FC<BookedTicketProps> = ({data}) => {
    const cancelTicket = async (pnr: string) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cancel-ticket/${pnr}`);
            if (!response.data.status) {
                toast({title: response.data.message, description: response.data.message, variant: 'destructive'});
            }
            toast({title: response.data.message});
            window.location.reload();
        } catch (error) {
            toast({title: "Server Error", description: error.message, variant: 'destructive'});
        }
    }

    const makePayment = async (pnr: string, fare: string) => {
        setPaymentCookies(pnr, fare);
        window.location.href = '/confirm-ticket';
    }

    return (
        <>
            <Toaster/>
            <Table>
                {/*<TableCaption>A list of your recent tickets and their status.</TableCaption>*/}
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">PNR Number</TableHead>
                        <TableHead>Class Type</TableHead>
                        <TableHead>Journey Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Total Tickets</TableHead>
                        <TableHead>Total Fare</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-bold text-slate-800">{item.pnr_number}</TableCell>
                                <TableCell>{item.class_type}</TableCell>
                                <TableCell>{item.journey_date}</TableCell>
                                <TableCell><Badge variant={
                                    item.ticket_status === 'Waiting' ? 'secondary'
                                        : item.ticket_status === 'Canceled' ? 'destructive' : 'outline'
                                }>{item.ticket_status}</Badge>
                                </TableCell>
                                <TableCell>{item.total_ticket}</TableCell>
                                <TableCell className="font-bold">रु. {item.total_fare}</TableCell>
                                <TableCell className="text-right">
                                    {
                                        item.ticket_status === 'Waiting' ? (
                                            <div className="flex flex-col gap-y-5">
                                                <Button variant="constructive"
                                                        onClick={() => makePayment(item.pnr_number, item.total_fare)}>Make
                                                    Payment</Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger
                                                        className="border-gray-500 border rounded bg-red-500 py-2"
                                                    >Cancel</AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle className="text-black">Are you absolutely
                                                                sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently
                                                                cancel your ticket
                                                                and remove data from our servers. The seats wil be
                                                                allocated to other passengers.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel
                                                                className="bg-blue-700">Hide</AlertDialogCancel>
                                                            <AlertDialogAction className="bg-red-700"
                                                                               onClick={() => cancelTicket(item.pnr_number)}
                                                            >Cancel Ticket</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        ) : item.ticket_status === 'Canceled' ?
                                            (<></>) : (
                                                <Dialog>
                                                    <DialogTrigger
                                                        className="border-gray-500 border rounded py-2 px-2 shadow-2xl"
                                                    >Show Ticket</DialogTrigger>
                                                    <DialogContent className="min-w-[1280px] min-h-[90vh]">
                                                        <DialogHeader>
                                                            <DialogTitle
                                                                className="text-black text-center rounded-none">Ticket
                                                                Preview</DialogTitle>
                                                            <DialogDescription>
                                                                <TicketDocument data={item}/>
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                    </DialogContent>
                                                </Dialog>
                                            )
                                    }
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

export default BookedTicket;
