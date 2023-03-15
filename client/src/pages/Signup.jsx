import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { UserAuth } from "../AuthContext"

function Signup() {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");

    const { login } = UserAuth();
    const navigate = useNavigate();
    return (
        <div className='auth-form-container'>
            <form>
                <label form="Email">Email</label>
                <input placeholder="Youremail@gmail.com" type="text" value={email} id="email" onChange={(e) => setEmail(e.target.value)}/>
                <label form="Password">Password</label>
                <input placeholder='Password' value={password} id="password" onChange={(e) => setPassword(e.target.value)}></input>
                <button className="form-submit" type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup