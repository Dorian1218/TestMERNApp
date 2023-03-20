import React from 'react'
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { AuthContextProvider, UserAuth } from "./AuthContext";
import Signin from "./pages/Signin";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Welcome from "./pages/Welcome";

function RoutesContext() {

    const navigate = useNavigate();

    const { user } = UserAuth();

    // if (window.location.href.indexOf("home")) {
    //     navigate("/")
    // }

    return (
        <div>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<Welcome />}></Route>
                    {user && <Route path="/home" element={<Home />}></Route>}
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/signin" element={<Signin />}></Route>
                </Routes>
            </AuthContextProvider>
        </div>
    )
}

export default RoutesContext