import React from "react";
import "./App.css";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { AuthContextProvider, UserAuth } from "./AuthContext";
import Signin from "./pages/Signin";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import CreateNavbar from "./Navbar";
import RoutesContext from "./RoutesContext";

function App() {

  return (
    <div className="App">
      <AuthContextProvider>
        <CreateNavbar />
        <br />
        <RoutesContext />
      </AuthContextProvider>
    </div>
  );
}

export default App;
