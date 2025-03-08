import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import "../styles/Memorial.css";

const Memorial = () => {
  const [activeTab, setActiveTab] = useState("Tributes");
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [headerData, setHeaderData] = useState({
    picture: "",
    name: "John Doe",
    dates: "January 1, 1950 - December 31, 2020",
  });

  const [tributes, setTributes] = useState("Tributes content goes here.");
  const [life, setLife] = useState({ message: "Life content goes here.", image: null });
  const [gallery, setGallery] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSave = (data) => {
    if (modalType === "EditHeader") {
      setHeaderData((prev) => ({ ...prev, ...data }));
    } else if (modalType === "EditTributes") {
      setTributes(data.text);
    } else if (modalType === "EditLife") {
      setLife({ message: data.text, image: data.image });
    } else if (modalType === "EditGallery") {
      setGallery((prev) => [...prev, ...data.files]);
    }
    closeModal();
  };

  const renderContent = () => {
    if (activeTab === "Tributes") {
      return <p>{tributes}</p>;
    }
    if (activeTab === "Life") {
      return (
        <div>
          {life.image && <img src={life.image} alt="Life Moment" className="life-image" />}
          <p>{life.message}</p>
        </div>
      );
    }
    if (activeTab === "Gallery") {
      return (
        <div className="gallery">
          {gallery.map((file, index) => (
            <div
              key={index}
              className="gallery-card"
              onClick={() => setSelectedMedia(file)}
            >
              {file.type.startsWith("image/") ? (
                <img src={URL.createObjectURL(file)} alt={`Gallery ${index}`} />
              ) : (
                <video controls={false} src={URL.createObjectURL(file)} />
              )}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="memorial-container">
      {/* Header Section */}
      <div className="memorial-header">
        {headerData.picture ? (
          <img src={headerData.picture} alt="Deceased" className="memorial-picture" />
        ) : (
          <div className="placeholder-picture">No Picture</div>
        )}
        <div className="memorial-info">
          <h1 className="memorial-name">{headerData.name}</h1>
          <p className="memorial-dates">{headerData.dates}</p>
        </div>
        <div className="header-icons">
          <a 
            onClick={() => openModal("EditHeader")}
            className="icon-button"
          >
            <FaEdit/>
          </a>
        </div>
      </div>

      {/* Section Links */}
      <div className="memorial-content">
        <nav className="memorial-links">
          {["Tributes", "Life", "Gallery"].map((tab) => (
            <a
              key={tab}
              href="#"
              className={`memorial-link ${activeTab === tab ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab);
              }}
            >
              {tab}
            </a>
          ))}
        </nav>
        <div className="edit-icon">
          <a 
            onClick={() => openModal(`Edit${activeTab}`)}
            className="icon-button"
          >
            <FaEdit/>
          </a>

        </div>
        <div className="memorial-body">{renderContent()}</div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          type={modalType}
          onClose={closeModal}
          onSave={handleSave}
          existingData={{
            tributes,
            life,
            gallery,
            headerData,
          }}
        />
      )}

      {/* Full Media Modal */}
      {selectedMedia && (
        <div className="media-modal" onClick={() => setSelectedMedia(null)}>
          <div className="media-modal-content" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type.startsWith("image/") ? (
              <img src={URL.createObjectURL(selectedMedia)} alt="Full Media" />
            ) : (
              <video controls src={URL.createObjectURL(selectedMedia)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Modal = ({ type, onClose, onSave, existingData }) => {
  const [formData, setFormData] = useState({
    picture: existingData.headerData.picture || "",
    name: existingData.headerData.name || "",
    dates: existingData.headerData.dates || "",
    text: type === "EditTributes" ? existingData.tributes : "",
    image: null,
    files: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture" && files.length) {
      setFormData((prev) => ({ ...prev, picture: URL.createObjectURL(files[0]) }));
    } else if (name === "image" && files.length) {
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(files[0]) }));
    } else if (name === "files") {
      setFormData((prev) => ({ ...prev, files: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit {type.replace("Edit", "")}</h2>
        {type === "EditHeader" && (
          <>
            <label>
              Picture:
              <input type="file" name="picture" onChange={handleChange} />
            </label>
            <label>
              Name:
              <input
                type="text"
                name="name"
                defaultValue={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Dates:
              <input
                type="text"
                name="dates"
                defaultValue={formData.dates}
                onChange={handleChange}
              />
            </label>
          </>
        )}
        {type === "EditTributes" && (
          <textarea
            name="text"
            defaultValue={formData.text}
            onChange={handleChange}
          />
        )}
        {type === "EditLife" && (
          <>
            <label>
              Picture:
              <input type="file" name="image" onChange={handleChange} />
            </label>
            <textarea
              name="text"
              defaultValue={formData.text}
              onChange={handleChange}
            />
          </>
        )}
        {type === "EditGallery" && (
          <label>
            Upload Files:
            <input type="file" name="files" multiple onChange={handleChange} />
          </label>
        )}
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Memorial;
