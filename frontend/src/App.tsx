import "./App.css"
import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Home from "./components/pages/Home.tsx";
import AddUserDetails from "@/components/pages/AddUserDetails.tsx";
import ProfilePage from "@/components/pages/ProfilePage.tsx";

const AuthContext = createContext<{ active: boolean; loggedIn: boolean }>({
    active: false,
    loggedIn: false,
});

function App(): React.ReactElement {
    const [authState, setAuthState] = useState({
        active: Cookies.get("is_active") === "true",
        loggedIn: Cookies.get("loggedIn") === "true",
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setAuthState({
                active: Cookies.get("is_active") === "true",
                loggedIn: Cookies.get("loggedIn") === "true",
            });
        }, 1000); // Check every second

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <AuthContext.Provider value={authState}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/profile"
                        element={authState.active ? <ProfilePage /> : <Navigate to="/" replace />}
                    />
                    <Route
                        path="/add-user-details"
                        element={authState.loggedIn && !authState.active ? <AddUserDetails /> : <Navigate to="/" replace />}
                    />
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;