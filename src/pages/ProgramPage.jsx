import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Modal from "../components/Modal";
import "../styles/FormPage.css";

function ProgramPage() {
  const { id } = useParams(); // Get the program ID from the URL
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: "" });
  const [programData, setProgramData] = useState({
    name: '',
    dob: '',
    dod: '',
    message: '',
    imageURL: '',
    speakers: [], // Default to an empty array
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/programs/recent');
        console.log("Fetched Program Data:", response.data);
        setProgramData(response.data);
      } catch (error) {
        console.error("Error fetching program data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgram();
  }, [id]);

  const handleServiceClick = (title, time, content) => {
    setModalContent({ title: `${title} at ${time}`, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //must add a loading animation
  if (isLoading) {
    return <div>Loading program data...</div>;
  }

  return (
    <div className="program">
      <div className="cover">
        <h1>In Loving Memory of {programData.name}</h1>
        <p>Date of Birth: {programData.dob}</p>
        <p>Date of Death: {programData.dod}</p>
        <img src={programData.imageURL || "https://via.placeholder.com/200"} alt="Deceased" className="cover-image" />
      </div>

      <div className="message">
        <h2>Message:</h2>
        <p>{programData.message}</p>
      </div>

      <div className="order-of-service">
        <h2>Order of Service</h2>
        {Array.isArray(programData?.speakers) && programData.speakers.length > 0 ? (
          <ul>
            {programData.speakers.map((speaker, index) => (
              <li
                key={index}
                onClick={() =>
                  handleServiceClick(speaker.speakerName, speaker.speakerTime, `Content for ${speaker.speakerName}`)
                }
              >
                {speaker.speakerName} - {speaker.speakerTime}
              </li>
            ))}
          </ul>
        ) : (
          <p>No speakers available for this program.</p>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalContent.title} content={modalContent.content} />
    </div>
  );
}

export default ProgramPage;
