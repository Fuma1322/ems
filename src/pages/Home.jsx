import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import Footer from '../components/Footer';
import Contact from './Contact';

const Home = () =>{

    const navigate = useNavigate();

    const handleGetStarted = () =>{
        const token = localStorage.getItem('token');

        if (token){
            //If logged in, navigate to the events pages
            navigate('/events');
        }
        else {
            //If not logged in, navigate to the login page 
            navigate('/events');
        }
    }

    return(
        <div className="home">
            <header className="home-header">
                <h1>Welcome to the Event Memorial System</h1>
                <p>Create a memorable digital programs for your events, easily accessible through QR codes</p>
                <Link to="/login" className='home-cta'>Get Started</Link>
            </header>

            <section className="about-section">
                <h2>About Us</h2>
                <p>The Event Memorial System (EMS) allows organizers to create digital event programs, making events accesible and memorable. Organizers can upload photos, videos, and more
                    while attendees can leave messages of remembrance.
                </p>
                <Link to="/about" className='learn-more'>Learn More</Link>
            </section>

            <section className="contact-section">
                <h2>Contact us</h2>
                <p>We’re here to help and answer any question you might have, We look forward to hearing from you .</p>
                <Link to="/contact" className='contact-reach-out'>Reach out</Link>
            </section>
            <Footer/>
        </div>

    );

};

export default Home;