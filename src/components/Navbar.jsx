import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const username = localStorage.getItem("username");
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("username");
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">Event Management System</Link>
            </div>

            <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
                <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
                <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About us</Link></li>
                <li><Link to="/events" className={location.pathname === "/events" ? "active" : ""}>Events</Link></li>
                <li><Link to="/memorial" className={location.pathname === "/memorial" ? "active" : ""}>Memorial</Link></li>
                <li><Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link></li>
            </ul>

            <button className="navbar-login">
                {username ? (
                    <div>
                        <span>Welcome, {username}!</span>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </button>

            <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>
            
        </nav>
    );
};

export default Navbar;