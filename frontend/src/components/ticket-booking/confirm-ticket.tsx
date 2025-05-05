import Navbar from "@/components/pages/Navbar.tsx";
import React from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Button} from "@/components/ui/button.tsx";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";

const ConfirmTicket: React.FC = () => {

    const fare = Cookies.get('fare') || "0";
    const pnrNumber = Cookies.get('pnr_number') || "N/A";
    const uid = uuidv4();
    const message = `total_amount=${fare},transaction_uuid=${uid},product_code=EPAYTEST`;
    const hash = CryptoJS.HmacSHA256(message, import.meta.env.VITE_ESEWA_SECRET_KEY);
    const signature = CryptoJS.enc.Base64.stringify(hash);

    async function makePaymentWithStripe() {
        const payload = {
            total_amount: fare,
            pnr_number: pnrNumber,
        }
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/make-payment-with-stripe`, payload);
            if (response.data.status) {
                window.location.href = response.data.payment_url || '/profile';
            }else {
                return;
            }
        }catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Navbar showReg={() => {
            }}/>
            <main>
                <Card className="rounded-none min-h-[85vh] bg-pink-100">
                    <CardHeader>
                        <CardTitle>Your Ticket(s) is in
                            <span className="text-yellow-400"> WAITING </span>
                            Status Make Payment To
                            <span className="text-green-600"> CONFIRM</span>
                        </CardTitle>
                        <Separator/>
                    </CardHeader>
                    <CardContent>
                        <p>Ticket's PNR Number <span
                            className="font-bold text-green-600">{pnrNumber}</span></p>
                        <p>Total Paying Amount <span
                            className="font-bold text-green-600">रु. {fare}</span></p>
                        <div>
                            <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
                                <input type="hidden" id="amount" name="amount" value={fare} required/>
                                <input type="hidden" id="tax_amount" name="tax_amount" value="0" required/>
                                <input type="hidden" id="total_amount" name="total_amount" value={fare}
                                       required/>
                                <input type="hidden" id="transaction_uuid" name="transaction_uuid"
                                       value={uid} required/>
                                <input type="hidden" id="product_code" name="product_code" value="EPAYTEST" required/>
                                <input type="hidden" id="product_service_charge" name="product_service_charge" value="0"
                                       required/>
                                <input type="hidden" id="product_delivery_charge" name="product_delivery_charge"
                                       value="0"
                                       required/>
                                <input type="hidden" id="success_url" name="success_url"
                                       value={import.meta.env.VITE_ESEWA_SUCCESS_URL} required/>
                                <input type="hidden" id="failure_url" name="failure_url"
                                       value={import.meta.env.VITE_ESEWA_FAILURE_URL} required/>
                                <input type="hidden" id="signed_field_names" name="signed_field_names"
                                       value="total_amount,transaction_uuid,product_code" required/>
                                <input type="hidden" id="signature" name="signature"
                                       value={signature} required/>
                                <div className="flex justify-center items-center space-x-5 bg-pink-200">
                                    <div>
                                        <input value="Make Payment With E-sewa" type="submit"
                                               className="bg-[#60bb46] text-white px-4 py-2 my-4 font-bold rounded cursor-pointer hover:bg-[#50a636]"/>
                                    </div>
                                    <div className="h-[50px] w-[100px]"><img src="/assets/images/esewa.png" alt="Esewa"
                                                                             className="w-full"/></div>
                                </div>
                            </form>
                            <div className="flex justify-center items-center space-x-5 bg-pink-200">
                                <Button
                                    className="bg-[#635bff] text-white px-4 mb-2 font-extrabold rounded tracking-wider cursor-pointer hover:bg-[#453fb2]"
                                    onClick={makePaymentWithStripe}
                                >Make Payment With Stripe</Button>
                                <div className="h-[50px] w-[100px]"><img src="/assets/images/stripe_wordmark.png" alt="Esewa"
                                                                         className="w-full"/></div>
                            </div>

                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center flex-col space-y-5">
                        <Button variant="outline" onClick={() => {
                            window.location.href = '/profile';
                        }}>Pay Later</Button>
                    </CardFooter>
                </Card>
            </main>
        </>
    )
}

export default ConfirmTicket;