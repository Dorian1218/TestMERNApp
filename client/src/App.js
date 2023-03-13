import React from "react";
import "./App.css"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { AuthContextProvider } from "./AuthContext";

function App() {

  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
      </AuthContextProvider>
  );
}

export default App;
