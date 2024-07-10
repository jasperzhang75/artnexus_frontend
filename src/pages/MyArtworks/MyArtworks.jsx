import  { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextWrapper";
import service from "./../../service/api";
import "./MyArtworks.css";

function MyArtworks() {
  const {  isLoggedIn } = useContext(AuthContext);
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
      <h2>My Artworks</h2>
      <div className="artworks-grid">
        {artworks.map((artwork) => (
          <div key={artwork._id} className="artwork-item">
            <img 
              src={artwork.imageUrl} 
              alt={artwork.title} 
              className="artwork-image" 
              onClick={() => navigate(`/uploadedartworks/${artwork._id}`)}
            />
            <div className="artwork-actions">
              <button className="delete-button" onClick={() => handleDelete(artwork._id)}>Delete</button>
              <button className="edit-button" onClick={() => handleEdit(artwork._id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyArtworks;