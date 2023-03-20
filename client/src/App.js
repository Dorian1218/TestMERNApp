import React from "react";
import "./App.css";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { AuthContextProvider, UserAuth } from "./AuthContext";
import Signin from "./pages/Signin";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import CreateNavbar from "./Navbar";

function App() {
  const navigate = useNavigate();

  // const {user} = UserAuth();

  return (
    <div className="App">
      <AuthContextProvider>
        <CreateNavbar />
      </AuthContextProvider>
      <br />
      <AuthContextProvider>
        <Routes>
          <Route path="/*" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
