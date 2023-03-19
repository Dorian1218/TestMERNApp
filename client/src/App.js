import React from "react";
import "./App.css";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { AuthContextProvider } from "./AuthContext";
import Signin from "./pages/Signin";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function App() {
  const navigate = useNavigate();

  return (
    <AuthContextProvider>
      <div className="App">
        {/* <div className="navbar">
          <Link to="/*">
            <li>Notes App</li>
          </Link>
          <div>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">
              <button className="signup-button">Sign up</button>
            </Link>
            <button className="modal-button">Sign in</button>
          </div>
        </div> */}
        <Navbar bg="dark" variant="dark">
          <Container>
            <Nav>
              <Navbar.Brand href="/*">Notes App</Navbar.Brand>
            </Nav>
          </Container>
            <Nav className="ms-auto">
              <Nav.Link href="/signup">
                <Button variant="outline-primary" style={{width: "130px" }}>Sign up</Button>
              </Nav.Link>
              <Nav.Link href="/signin">
                <Button variant="primary" style={{width: "130px" }}>Sign in</Button>
              </Nav.Link>
            </Nav>
        </Navbar>
        <br />
        <Routes>
          <Route path="/*" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
