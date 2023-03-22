import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { UserAuth } from "../AuthContext"
import Alert from "../Alert"
import { GoogleButton } from "react-google-button";
import "../App.css"

function Signup() {
    const navigate = useNavigate()
    let [email, setEmail] = useState("");
    let [username, setUsernamme] = useState("")
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("")
    let [showAlert, setShowAlert] = useState(false)
    let [errorMsg, setErrorMsg] = useState("");

    const { createUser, user, signInWithGoogle} = UserAuth();

    const handleGoogleSignIn = async () => {
        await signInWithGoogle();
        if (user !== undefined) {
            setTimeout(() => {
                navigate("/home");
            }, 1000);
        }
        else {
            navigate("/signup")
        }
      };

    const handleSignup = async () => {
        try {
            await createUser(email, password);
            navigate("/home");
        } catch (e) {
            setErrorMsg(e.message)
            console.log(e.message)
            if (password !== confirmPassword) {
                setErrorMsg("Passwords no not match")
            }
            if (e.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                setErrorMsg("Password should be at least 6 characters")
            }
            if (e.message === "Firebase: Error (auth/internal-error).") {
                setErrorMsg("Email is invalid")
            }
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
        }
    }
    return (
        <>
            <Container className='d-flex align-items-center justify-content-center'>
                <div className='w-100' style={{ maxWidth: "400px"}}>
                    <Card style={{ display: "flex", justifyContent: "center"}}>
                        <Card.Body>
                            <h2 className='text-center mb-4'>Sign Up</h2>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <GoogleButton style={{ alignContent: "center" }} onClick={handleGoogleSignIn}/>
                            </div>
                            <Alert showAlertMsg={showAlert} message={errorMsg} style={{marginTop: "10px"}}></Alert>
                            <Form>
                                <Form.Group id='email'>
                                    <Form.Label className='label'>Email</Form.Label>
                                    <Form.Control autoComplete="on" type="email" value={email} onChange={((e) => setEmail(e.target.value))} required></Form.Control>
                                </Form.Group>
                                <Form.Group id='username'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control autoComplete="on" type="text" value={username} onChange={((e) => setUsernamme(e.target.value))} required></Form.Control>
                                </Form.Group>
                                <Form.Group id='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control autoComplete="on" type="password" value={password} onChange={((e) => setPassword(e.target.value))} required></Form.Control>
                                </Form.Group>
                                <Form.Group id='confirmpassword'>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control autoComplete="on" type="password" value={confirmPassword} onChange={((e) => setConfirmPassword(e.target.value))} required></Form.Control>
                                </Form.Group>
                                <Button variant='primary' className='w-100 mt-3' onClick={handleSignup}>Sign Up</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </>
    )
}

export default Signup