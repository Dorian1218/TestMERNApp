import React, { useState } from 'react'
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { AuthContextProvider, UserAuth } from './AuthContext';
import LogoutModal from './LogoutModal';
import { MdOutlineAccountCircle } from "react-icons/md"
import { NavDropdown } from "react-bootstrap"

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
                navigate("/")
                setIsDisabled(false)
                setLogoutBtn("Logout")
            }, 1000)
        } catch (e) {

        }
    }
    const closeModal = () => {
        setShowLogout(false)
    }

    const showLogoutModal = () => {
        setShowLogout(true)
    }

    return (
        <AuthContextProvider>
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
                    {user && <NavDropdown
                        id="nav-dropdown-dark-example"
                        title={<MdOutlineAccountCircle size={35} />}
                        menuVariant="dark"
                        style={{ transform: "translateX(-120%)" }}
                    >
                        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                            <NavDropdown.Item style={{ width: "auto" }} onClick={() => {navigate("/account")}}>Account</NavDropdown.Item>
                            <NavDropdown.Item>{user && (<Button variant='danger' style={{ width: "126px" }} onClick={showLogoutModal}>Logout</Button>)}</NavDropdown.Item>
                        </div>
                    </NavDropdown>}
                    <LogoutModal show={showLogout} onClose={closeModal} logout={handleLogout} isdisabled={isdisabled} isloggingout={logoutBtn} />
                </Nav>
            </Navbar>
        </AuthContextProvider>
    )
}

export default CreateNavbar