import "./App.css"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./components/pages/Home.tsx";
import AddUserDetails from "@/components/pages/AddUserDetails.tsx";
import ProfilePage from "@/components/pages/ProfilePage.tsx";
import BookTicket from "@/components/ticket-booking/book-ticket.tsx";
import React from "react";
import ConfirmTicket from "@/components/ticket-booking/confirm-ticket.tsx";
import Dashboard from "@/components/admin-panel/dashboard.tsx";
import Inbox from "@/components/admin-panel/inbox.tsx";
import PaymentProcessingAnimation from "@/components/ticket-booking/process-payment.tsx";

function App(): React.ReactElement {
        const active= Cookies.get("is_active") === "true";
        const loggedIn= Cookies.get("loggedIn") === "true";


    console.log('Check render');
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/book-ticket" element={<BookTicket />} />
                    <Route path="/process-payment" element={<PaymentProcessingAnimation />} />
                    <Route
                        path="/profile"
                        element={active ? <ProfilePage /> : <Navigate to="/" replace />}
                    />
                    <Route
                        path="/add-user-details"
                        element={loggedIn && !active ? <AddUserDetails /> : <Navigate to="/" replace />}
                    />
                    <Route path="/confirm-ticket" element={<ConfirmTicket />}/>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/dashboard/inbox" element={<Inbox />} />
                </Routes>
            </BrowserRouter>
    );
}

export default App;