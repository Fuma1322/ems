import { useState } from 'react';
// import QRCode from 'qrcode';
import { useNavigate } from 'react-router-dom';
import "../styles/FormPage.css";
import axios from 'axios';

function FormPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [dod, setDod] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState(null);
    const [qrCodeImage, setQrCodeImage] = useState('');
    const [speakers, setSpeakers] = useState([{ speakerName: '', speakerTime: '' }]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        const programData = {
            name,
            dob, 
            dod,
            message,
            imageURL: image,
            speakers,
        }
        try {
            //Save the progrma data in MongoDB
            const response = await axios.post('http://localhost:5000/api/programs', programData)
            const programId = response.data._id;

            //Generate the QR code with the program ID
            const programPath = `/program/${programId}`;
            const qrCodeUrl = await QRCode.toDataURL(programPath);
            setQrCodeImage(qrCodeUrl);
        } catch(error){
            console.error('Error saving program', error);
        }
    };

    const handleImageUpload = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleSpeakerChange = (index, event) => {
        const newSpeakers = [...speakers];
        newSpeakers[index][event.target.name] = event.target.value;
        setSpeakers(newSpeakers);
    };

    const addSpeakerField = () => {
        setSpeakers([...speakers, { speakerName: '', speakerTime: '' }]);
    };

    const downloadQRCode = () => {
        const link = document.createElement('a');
        link.href = qrCodeImage;
        link.download = 'funeral_program_qr_code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleGoToProgram = () => {
        navigate('/program', { state: { name, dob, dod, message, speakers } });
    };

    return (
        <div className="app">
            <h2>Events  Memorial QR-Code Generator</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name of the Deceased:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Date of Death:</label>
                    <input
                        type="date"
                        value={dod}
                        onChange={(e) => setDod(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Message or Eulogy:</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Image of Deceased (Optional):</label>
                    <input type="file" onChange={handleImageUpload} />
                    {image && <img src={image} alt="Deceased" className="uploaded-image" />}
                </div>

                <div>
                    <h3>Speakers</h3>
                    {speakers.map((speaker, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                name="speakerName"
                                placeholder="Speaker's Name"
                                value={speaker.speakerName}
                                onChange={(e) => handleSpeakerChange(index, e)}
                                required
                            />
                            <input
                                type="time"
                                name="speakerTime"
                                value={speaker.speakerTime}
                                onChange={(e) => handleSpeakerChange(index, e)}
                                required
                            />
                        </div>
                    ))}
                    
                </div>

                <div className="btns">
                    <button type="button" onClick={addSpeakerField}>Add Another Speaker</button>

                    <button type="submit">Generate QR Code</button>
                </div>

            </form>

            {qrCodeImage && (
                <div>
                    <h2>QR Code for the Funeral Program:</h2>
                    <img src={qrCodeImage} alt="QR Code" />
                    <p>Scan this code to view the funeral program.</p>
                    <button onClick={downloadQRCode}>Download QR Code</button>
                </div>
            )}

            <button onClick={handleGoToProgram} className='button'>Go to Program</button>
        </div>
    );
}

export default FormPage;
