import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextWrapper";
import service from "./../../service/api";
import "./MyArtworks.css";
import uploadanartwork from "./../../assets/add.svg";

function MyArtworks() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);

  const fetchArtworks = async () => {
    try {
      const res = await service.get(`/api/user/uploadedartworks`);
      setArtworks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await service.delete(`/api/uploadedartworks/${id}`);
      fetchArtworks(); // Refresh artworks after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/modify-artwork/${id}`);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchArtworks();
    }
  }, [isLoggedIn]);

  return (
    <div className="my-artworks-container">
      <div className="my-artworks-header">
      <h2>My Artworks</h2>
      <img src={uploadanartwork} alt="Upload an artwork" className="upload-an-artwork" onClick={() => navigate("/publish-artwork")} />
      </div>
      <hr />
      <div className="my-artworks-grid">
        {artworks.map((artwork) => (
          <div key={artwork._id} className="my-artwork-item">
            <img 
              src={artwork.imageUrl} 
              alt={artwork.title} 
              className="my-artwork-image" 
              onClick={() => navigate(`/uploadedartworks/${artwork._id}`)}
            />
            <div className="my-artwork-buttons">
              <button className="my-artwork-delete-button" onClick={() => handleDelete(artwork._id)}>Delete</button>
              <button className="my-artwork-edit-button" onClick={() => handleEdit(artwork._id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyArtworks;