import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { UserAuth } from "../AuthContext"
import "../App.css"

function Signup() {

    let [email, setEmail] = useState("");
    let [username, setUsernamme] = useState("")
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("")
    let [error, setError] = useState("");

    const { login } = UserAuth();
    return (
        <>
            <Container className='d-flex align-items-center justify-content-center'>
                <div className='w-100' style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className='text-center mb-4'>Sign Up</h2>
                            <Form>
                                <Form.Group id='email'>
                                    <Form.Label className='label'>Email</Form.Label>
                                    <Form.Control type="email" value={email} onChange={((e) => setEmail(e.target.value))} required></Form.Control>
                                </Form.Group>
                                <Form.Group id='username'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" value={username} onChange={((e) => setUsernamme(e.target.value))} required></Form.Control>
                                </Form.Group>
                                <Form.Group id='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={((e) => setPassword(e.target.value))} required></Form.Control>
                                </Form.Group>
                                <Form.Group id='confirmpassword'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" value={confirmPassword} onChange={((e) => setConfirmPassword(e.target.value))} required></Form.Control>
                                </Form.Group>
                                <Button variant='primary' className='w-100 mt-3'>Sign Up</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}

export default Signup