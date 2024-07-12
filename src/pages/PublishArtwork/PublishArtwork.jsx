import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextWrapper";
import service from "./../../service/api";
import "./PublishArtwork.css";

function PublishArtwork() {
  const { isLoggedIn } = useContext(AuthContext);
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
    <div> 
      <h2>Publish Artwork</h2>
      <hr />
    <div className="publish-artwork-container">
     
      <form onSubmit={handleSubmit} className="publish-artwork-form">
        <p>Fill in the artwork detail</p>
        {error && <p className="error">{error}</p>}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={artworkDetails.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          placeholder="Description"
          value={artworkDetails.description}
          onChange={handleChange}
        />
        <label htmlFor="date_start">Creation Year</label>
        <input
          type="number"
          name="date_start"
          id="date_start"
          placeholder="Creation Year"
          value={artworkDetails.date_start}
          onChange={handleChange}
          min="1000"
          max="9999"
          required
        />
        <label htmlFor="artist_title">Author Name</label>
        <input
          type="text"
          name="artist_title"
          id="artist_title"
          placeholder="Author Name"
          value={artworkDetails.artist_title}
          onChange={handleChange}
          required
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          value={artworkDetails.price}
          onChange={handleChange}
          required
        />
        <label htmlFor="imageUrl">Artwork URL</label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          placeholder="Artwork URL"
          value={artworkDetails.imageUrl}
          onChange={handleChange}
          required
        />
        <button type="submit">Publish</button>
      </form>
    </div>
    </div>
  );
}

export default PublishArtwork;