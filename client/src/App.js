import React from "react";
import "./App.css";
import { AuthContextProvider } from "./AuthContext";
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
