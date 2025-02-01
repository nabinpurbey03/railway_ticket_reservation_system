import './App.css'
import Home from "./components/Home.tsx";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router";
import AddUserDetails from "@/components/AddUserDetails.tsx";
import Cookies from "js-cookie";
import {Navigate} from "react-router-dom";

function App(): React.ReactElement {

    const active = Cookies.get("is_active") === "true";
    const loggedIn = Cookies.get("loggedIn") === "true";

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route
                        path="/add-user-details"
                        element={loggedIn && !active ? <AddUserDetails/> : <Navigate to="/" replace/>}
                    />
                    {/*<Route path="/add-user-details" element={<AddUserDetails/>}/>*/}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
