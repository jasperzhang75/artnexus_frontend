import  { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextWrapper";
import service from "./../../service/api";
import "./PublishArtwork.css";

function PublishArtwork() {
  const {  isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [artworkDetails, setArtworkDetails] = useState({
    title: "",
    description: "",
    date_start: "",
    artist_title: "",
    price: "",
    imageUrl: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtworkDetails({ ...artworkDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    try {
      const res = await service.post("/api/uploadedartworks", artworkDetails);
      navigate(`/artshop/${res.data._id}`);
    } catch (error) {
      setError("Error publishing artwork. Please try again.");
    }
  };

  return (
    <div className="publish-artwork-container">
      <h2>Publish Artwork</h2>
      <form onSubmit={handleSubmit} className="publish-artwork-form">
        <h3>Fill in the artwork detail</h3>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={artworkDetails.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={artworkDetails.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="date_start"
          placeholder="Creation Year"
          value={artworkDetails.date_start}
          onChange={handleChange}
          min="1000"
          max="9999"
          required
        />
        <input
          type="text"
          name="artist_title"
          placeholder="Author Name"
          value={artworkDetails.artist_title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={artworkDetails.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Artwork URL"
          value={artworkDetails.imageUrl}
          onChange={handleChange}
          required
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}

export default PublishArtwork;