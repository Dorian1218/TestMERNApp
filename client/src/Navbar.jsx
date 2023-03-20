import React from 'react'
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from 'react-router-dom';
import { UserAuth } from './AuthContext';

function CreateNavbar() {
    const { user, logout } = UserAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logout();
        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav style={{paddingTop: "10px"}}>
                    <Link style={{color: "#fff", textDecoration: "none"}} to="/*"><h3>Notes App</h3></Link>
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
                {user && (<Button variant='danger' style={{ width: "130px" }} onClick={handleLogout}>Logout</Button>)}
            </Nav>
        </Navbar>
    )
}

export default CreateNavbar