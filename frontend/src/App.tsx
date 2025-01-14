import './App.css'
import Home from "./components/Home.tsx";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router";
import SignUpPage from "@/components/SignUpPage.tsx";

function App(): React.ReactElement {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
