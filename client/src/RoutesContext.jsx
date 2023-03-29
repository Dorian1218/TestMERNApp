import React from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { AuthContextProvider, UserAuth } from "./AuthContext";
import Signin from "./pages/Signin";
import Welcome from "./pages/Welcome";
import Account from './pages/Account';

function RoutesContext() {
    const navigate = useNavigate()

    const { user } = UserAuth();

    if (user && window.location.href === "http://localhost:3000/") {
        navigate("/home")
    }

    if (!user && window.location.href === "http://localhost:3000/home") {
        navigate("/")
    }
    return (
        <div>
            <AuthContextProvider>
                <Routes>
                    {!user && <Route path="/" element={<Welcome />}></Route>}
                    {user && <Route path="/home" element={<Home />}></Route>}
                    {!user && <Route path="/signup" element={<Signup />}></Route>}
                    {!user && <Route path="/signin" element={<Signin />}></Route>}
                    {user && <Route path="/account" element={<Account />}></Route>}
                </Routes>
            </AuthContextProvider>
        </div>
    )
}

export default RoutesContext