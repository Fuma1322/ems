import React, { useState } from "react";
import axios from "axios";
import "../styles/Memories.css";

const Memories = () => {
    const [activeTab, setActiveTab] = useState("life"); // State to track active tab
    const [eulogy, setEulogy] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [lifeStory, setLifeStory] = useState({ eulogy: "", image: null }); // State for life story
    const [images, setImages] = useState([]); // State for uploaded images
    const [videos, setVideos] = useState([]); // State for uploaded videos

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("eulogy", eulogy);
        if (image) formData.append("image", image);
        if (video) formData.append("video", video);

        try {
            const response = await axios.post("http://localhost:5000/api/memories", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSuccessMessage(response.data.message);

            // Update Life Story
            setLifeStory({ eulogy, image: image ? URL.createObjectURL(image) : null });

            // Update Images and Videos
            if (image) setImages((prevImages) => [...prevImages, URL.createObjectURL(image)]);
            if (video) setVideos((prevVideos) => [...prevVideos, URL.createObjectURL(video)]);

            // Clear the form
            setEulogy("");
            setImage(null);
            setVideo(null);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Error submitting memory.");
        }
    };

    return (
        <div className="memories-page">
            <h1>Memories</h1>
            {successMessage && <p className="success">{successMessage}</p>}
            {errorMessage && <p className="error">{errorMessage}</p>}

            {/* Tabs */}
            <div className="tabs">
                <button
                    className={activeTab === "life" ? "active" : ""}
                    onClick={() => handleTabClick("life")}
                >
                    Life
                </button>
                <button
                    className={activeTab === "life-story" ? "active" : ""}
                    onClick={() => handleTabClick("life-story")}
                >
                    Life Story
                </button>
                <button
                    className={activeTab === "gallery" ? "active" : ""}
                    onClick={() => handleTabClick("gallery")}
                >
                    Gallery
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === "life" && (
                    <form onSubmit={handleSubmit} className="memories-form">
                        <label htmlFor="eulogy">Eulogy:</label>
                        <textarea
                            id="eulogy"
                            value={eulogy}
                            onChange={(e) => setEulogy(e.target.value)}
                            required
                            placeholder="Write your eulogy here..."
                        />

                        <label htmlFor="image">Upload Image:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                        <label htmlFor="video">Upload Video:</label>
                        <input
                            type="file"
                            id="video"
                            accept="video/*"
                            onChange={(e) => setVideo(e.target.files[0])}
                        />

                        <button type="submit">Submit Memory</button>
                    </form>
                )}

                {activeTab === "life-story" && (
                    <div className="life-story">
                        {lifeStory.image && <img src={lifeStory.image} alt="Life Story" className="life-story-image" />}
                        <p>{lifeStory.eulogy || "No eulogy submitted yet."}</p>
                    </div>
                )}

                {activeTab === "gallery" && (
                    <div className="gallery">
                        <h2>Images</h2>
                        <div className="gallery-section">
                            {images.length > 0 ? (
                                images.map((img, index) => (
                                    <img key={index} src={img} alt={`Gallery Image ${index + 1}`} className="gallery-item" />
                                ))
                            ) : (
                                <p>No images uploaded yet.</p>
                            )}
                        </div>

                        <h2>Videos</h2>
                        <div className="gallery-section">
                            {videos.length > 0 ? (
                                videos.map((vid, index) => (
                                    <video key={index} src={vid} controls className="gallery-item" />
                                ))
                            ) : (
                                <p>No videos uploaded yet.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Memories;
