import React from "react";
import { FaFacebook, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import "../styles/Footer.css";
import logo from "../assets/wia.png";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="company-info">
                    <h2 className="company-logo">
                        <img src= {logo} alt="logo" className="logo" width={50} height={50}/>
                        Web Informatics Pty Ltd
                    </h2>
                    <p> Constitution Road, Maseru, Lesotho</p>
                </div>

                <div className="contact-info">
                    <h3>Contact Us</h3>
                    <div className="social-links">
                        <a
                            href="https://web.facebook.com/webinformatics01"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            <FaFacebook /> Web Informatics 1
                        </a>
                        <a
                            href="https://wa.me/+26659575161"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                        >
                            <FaWhatsapp /> +266 5957 5161
                        </a>
                        <a
                            href="mailto:lepipipaul47.com"
                            className="social-link"
                        >
                            <FaEnvelope /> lepipipaul47@gmail.com
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Web Informatics Pty Ltd. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
