import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { UserAuth } from "../AuthContext"
import Alert from "../Alert"
import { GoogleButton } from "react-google-button";
import "../App.css"

function Signin() {
  const navigate = useNavigate()
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [showAlert, setShowAlert] = useState(false)
  let [errorMsg, setErrorMsg] = useState("");

  const { login, user } = UserAuth();

  const handleSignin = async () => {
    try {
      await login(email, password);
      navigate("/home");
    } catch (e) {
      setShowAlert(true)
      setErrorMsg(e.message)
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  }
  return (
    <>
      <Container className='d-flex align-items-center justify-content-center'>
        <div className='w-100' style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className='text-center mb-4'>Sign In</h2>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <GoogleButton style={{ alignContent: "center" }} />
              </div>
              <Alert showAlertMsg={showAlert} message={errorMsg}></Alert>
              <Form>
                <Form.Group id='email'>
                  <Form.Label className='label'>Email</Form.Label>
                  <Form.Control type="email" value={email} onChange={((e) => setEmail(e.target.value))} required></Form.Control>
                </Form.Group>
                <Form.Group id='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={((e) => setPassword(e.target.value))} required></Form.Control>
                </Form.Group>
                <Button variant='primary' className='w-100 mt-3' onClick={handleSignin}>Sign Up</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  )
}

export default Signin