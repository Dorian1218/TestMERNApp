import React from "react";
import "./App.css"
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { AuthContextProvider } from "./AuthContext";
import Signin from "./pages/Signin";

function App() {
  const navigate = useNavigate()

  return (
    <AuthContextProvider>
      <div className="navbar">
          <Link to="*"><li>Notes App</li></Link>
        <div>
        <Link to="/signin">Sign in</Link>
        <Link to="/signup"><button className="signup-button">Sign up</button></Link>
        {/* <button className="modal-button">Sign in</button> */}
        </div>
      </div>
      <Routes>
        <Route path="*" element={<Home/>}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
      </Routes>
      </AuthContextProvider>
  );
}

export default App;
