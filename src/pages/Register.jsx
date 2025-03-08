import React, {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

const Register = () =>{
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email:'',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('');
        setSuccess('');

        try{
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            setSuccess(response.data.message);
            setFormData({ username: '', email: '', password: ''});
        } catch (error){
            setError(error.response?.data?.message || 'An error occurred during registration'); 
        }
    };

    return (
        <div className="register-page">

            
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <form onSubmit={handleSubmit} className="register-form">
            <h2>Register</h2>

                <label htmlFor="username">Username:</label>
                <input
                 type="username"
                 id="username"
                 name="username"
                 value={formData.username}
                 onChange={handleChange}
                 required    
                />


                <label htmlFor="email">E-mail:</label>
                <input
                 type="email"
                 id="email"
                 name="email"
                 value={formData.email}
                 onChange={handleChange}
                 required 
                />


                <label htmlFor="password">Password:</label>
                <input
                 type="password"
                 name="password"
                 id="password"
                 value={formData.password}
                 onChange={handleChange}
                 required

                />

                <button type="submit">Register</button>
                <div className="login-link">
                <p>Already have an account? <a href="/login">Login</a></p>
                </div>
                
            </form>
           
        </div>
    );
};

export default Register;