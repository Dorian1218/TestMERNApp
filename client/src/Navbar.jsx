import React, { useState } from 'react'
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { UserAuth } from './AuthContext';
import LogoutModal from './LogoutModal';

function CreateNavbar() {
    const [showLogout, setShowLogout] = useState(false)
    const [isdisabled, setIsDisabled] = useState(false)
    const [logoutBtn, setLogoutBtn] = useState("Logout")
    const { user, logout } = UserAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        try {
            setIsDisabled(true)
            setLogoutBtn("Logging Out...")
            setTimeout(() => {
                logout();
                setShowLogout(false)
                navigate("*")
                setIsDisabled(false)
                setLogoutBtn("Logout")
            }, 1000)
        } catch (e) {
            console.log(e.message);
        }
    }
    const closeModal = () => {
        setShowLogout(false)
    }

    const showLogoutModal = () => {
        setShowLogout(true)
    }
    return (
        <Navbar bg="dark" variant="dark" style={{ display: "flex", alignItems: "center" }}>
            <Container>
                <Nav style={{ paddingTop: "10px" }}>
                    {!user && <Link style={{ color: "#fff", textDecoration: "none" }} to="/"><h3>Notes App</h3></Link>}
                    {user && <Link style={{ color: "#fff", textDecoration: "none" }} to="/home"><h3>Notes App</h3></Link>}
                </Nav>
            </Container>
            <Nav className="ms-auto" style={{ marginRight: "20px", alignItems: "center" }}>
                {!user && (<Link to="/signup">
                    <Button variant="outline-primary" style={{ width: "130px", margin: "10px" }}>
                        Sign up
                    </Button>
                </Link>)}
                {!user && (<Link to="/signin">
                    <Button variant="primary" style={{ width: "130px" }}>
                        Sign in
                    </Button>
                </Link>)}
                {user && <p style={{ color: "white", marginRight: "10px", alignContent: "center", paddingTop: "15px" }}>{user.email}</p>}
                {user && (<Button variant='danger' style={{ width: "130px" }} onClick={showLogoutModal}>Logout</Button>)}
                <LogoutModal show={showLogout} onClose={closeModal} logout={handleLogout} isdisabled={isdisabled} isloggingout={logoutBtn} />
            </Nav>
        </Navbar>
    )
}

export default CreateNavbar