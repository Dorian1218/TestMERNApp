import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"
import {UserAuth} from "../AuthContext"

function Signup() {

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");

    const { login } = UserAuth();
    const navigate = useNavigate();
    return (
        <div>Signup Now</div>
    )
}

export default Signup