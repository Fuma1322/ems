// src/pages/About.jsx
import React from 'react';
import '../styles/About.css';

const About = () => {
    return (
        <div className="about">
            <div className="about-content">
                <h1>About the Event Memorial System</h1>
                <p>
                    The <strong>Event Memorial System (EMS)</strong> is a cutting-edge platform designed to enhance event experiences by providing digital, shareable, and interactive programs. 
                    Our mission is to make events more <strong>memorable, accessible, and engaging</strong> for attendees, ensuring that every important detail is preserved and easily accessible.
                </p>
                <p>
                    With EMS, event organizers can create <strong>customized digital programs</strong> that guests can view from any device, eliminating the need for printed materials while 
                    offering a more eco-friendly and convenient alternative. Whether it’s a <em>corporate gathering, wedding, memorial service, conference, or community event</em>, EMS ensures 
                    that attendees have instant access to schedules, speaker details, special moments, and important announcements—all in one centralized platform.
                </p>
                
                <h3>Why Choose EMS?</h3>
                <ul className="about-list">
                    <li><strong>✔ Seamless Accessibility:</strong> Attendees can access event details anytime, anywhere, using their smartphones, tablets, or computers.</li>
                    <li><strong>✔ Eco-Friendly Solution:</strong> Say goodbye to paper waste—our platform helps reduce environmental impact.</li>
                    <li><strong>✔ Enhanced Engagement:</strong> Create interactive and visually appealing programs to keep attendees informed and engaged.</li>
                    <li><strong>✔ Easy Updates & Customization:</strong> Make real-time changes to event details without the hassle of reprinting programs.</li>
                    <li><strong>✔ Memorable Experiences:</strong> Preserve event highlights, speeches, and tributes, ensuring cherished moments are always available.</li>
                </ul>

                <p className="about-closing">
                    At EMS, we believe that every event should be a lasting memory. Our platform is here to help you <strong>bring people together, honor special occasions,</strong> and create a 
                    seamless experience for all attendees.  
                </p>

                <p className="about-join">Join us in revolutionizing the way events are remembered!</p>
            </div>
        </div>
    );
};

export default About;