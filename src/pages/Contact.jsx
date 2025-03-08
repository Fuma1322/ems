import React from "react";
import {FaWhatsapp, FaFacebook, FaEnvelope } from "react-icons/fa";
import "../styles/Contact.css"

const Contact = () =>{
    return(
        <div className="contact-page">
            <h1>Contact us</h1>
            <p>We would love to hear from you. Reach out to us through any of the following platforms</p>
            <p>Otherwise you can visit our offices located at LEAP near Lesotho Housing Maseru Lesotho</p>
            <div className="contact-methods">
                {/*Whatsapp*/}
                <a 
                    href="https://wa.me/+26669371394"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item"
                >
                    <FaWhatsapp className="contact-icon whatsapp"/>
                    <span>+266 69371394</span>
                </a>

                {/*Facebook*/}
                <a

                 href="https://web.facebook.com/webinformatics01"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="contact-item"
                >
                 <FaFacebook className="contact-icon facebook"/>
                 <span>Web Informatics1 </span>
                 </a>

                 {/*Email*/}
                 <a
                  href="mailto:kelanetsele@gmail.com"
                  className="contact-item"

                 >
                    <FaEnvelope className="contact-icon email"/>
                    <span>lepipipaul47@gmail.com</span>
        
                 </a>
            </div>
        </div>
    );
};

export default Contact;