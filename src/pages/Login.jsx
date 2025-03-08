import React, {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

import '../styles/Login.css';

const Login = () =>{
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{

            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            //Handle successful login
            setSuccess("Login successful");
            console.log("User authenticated:", response.data);
            localStorage.setItem("username", response.data.username);
            window.location.reload();


        } catch (err){
            //handle errors
            setError(err.response?.data?.message || "Login failed. Please try again.");
            console.error("Error during login: ", err);
        }
    };

    return (
        <div className="login-page">
          
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSubmit} className="login-form">
            <h2>Log In</h2>
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div className="remember-forgot">
                <label><input type="checkbox" />Remember me</label>
                <a href="a">Forgot password?</a>

                </div>
                
                <button type="submit" className="login-button">Log in</button>
               <div className="register-link">
               <p>Don't have an account? <a href="/register">Register</a></p>
               </div>
                
            </form>
             
        </div>
    );
};

export default Login;