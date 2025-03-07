import "./App.css"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./components/pages/Home.tsx";
import AddUserDetails from "@/components/pages/AddUserDetails.tsx";
import ProfilePage from "@/components/pages/ProfilePage.tsx";
import BookTicket from "@/components/ticket-booking/book-ticket.tsx";
import React from "react";
import ConfirmTicket from "@/components/ticket-booking/confirm-ticket.tsx";

function App(): React.ReactElement {
        const active= Cookies.get("is_active") === "true";
        const loggedIn= Cookies.get("loggedIn") === "true";


    console.log('Check render');
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/book-ticket" element={<BookTicket />} />
                    <Route
                        path="/profile"
                        element={active ? <ProfilePage /> : <Navigate to="/" replace />}
                    />
                    <Route
                        path="/add-user-details"
                        element={loggedIn && !active ? <AddUserDetails /> : <Navigate to="/" replace />}
                    />
                    <Route path="/confirm-ticket" element={<ConfirmTicket />}/>
                </Routes>
            </BrowserRouter>
    );
}

export default App;