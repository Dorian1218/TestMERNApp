import React from "react";
import "./App.css"
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { AuthContextProvider } from "./AuthContext";

function App() {
  const navigate = useNavigate()

  return (
    <AuthContextProvider>
      <div className="navbar">
          <Link to="/"><li>Notes App</li></Link>
        <div>
        <Link to="/signup"><button className="signup-button">Signup</button></Link>
        <button className="modal-button">Signin</button>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
      </AuthContextProvider>
  );
}

export default App;
