import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'
import '../styles/Events.css';

const Events = () => {
    const navigate = useNavigate();

    const [selectedEvent, setSelectedEvent] = useState('');

    const handleEventSelection = (eventType) =>{
        navigate('/form', {state: {eventType}});
        //Display more options
    };

    return(
        <div className="events-page">
            <h1>Select Event Type</h1>
            <p>Choose the type of event you want to create:</p>

            <div className="event-options">
                <button onClick={() => handleEventSelection('Funeral')} className="event-button">Funeral</button>
                <button onClick={() => handleEventSelection('Wedding')} className="event-button">Wedding</button>
                <button onClick={() => handleEventSelection('Graduation')} className="event-button">Graduation</button>
            </div>
            {selectedEvent && (
                <div className="selected-event">
                    <h2>{selectedEvent} Details</h2>
                    {/*Display form fields*/}
                    <p>Proceed to create a {selectedEvent} program by filling in the necessary details</p>
                    {/*Navigate to the creation form*/}
                    
                </div>
            )}

        </div>
    );

};

export default Events;

