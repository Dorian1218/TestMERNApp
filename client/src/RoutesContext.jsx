import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { AuthContextProvider, UserAuth } from "./AuthContext";
import Signin from "./pages/Signin";
import Welcome from "./pages/Welcome";

function RoutesContext() {

    const { user } = UserAuth();
    return (
        <div>
            <AuthContextProvider>
                <Routes>
                    <Route exact path="/*" element={<Welcome />}></Route>
                    {user && <Route path="/home/*" element={<Home />}></Route>}
                    <Route path="/signup" element={<Signup />}></Route>
                    <Route path="/signin" element={<Signin />}></Route>
                </Routes>
            </AuthContextProvider>
        </div>
    )
}

export default RoutesContext