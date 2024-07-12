import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextWrapper";
import service from "./../../service/api";
import "./ModifyArtwork.css";

function ModifyArtwork() {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const res = await service.get(`/api/uploadedartworks/${id}`);
        setArtworkDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (isLoggedIn) {
      fetchArtwork();
    }
  }, [id, isLoggedIn]);

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
      await service.put(`/api/uploadedartworks/${id}`, artworkDetails);
      navigate(`/uploadedartworks/${id}`);
    } catch (error) {
      setError("Error modifying artwork. Please try again.");
    }
  };

  return (
    <div> 
      <h2>Modify Artwork</h2>
      <hr />
    <div className="modify-artwork-container">
     
      <form onSubmit={handleSubmit} className="modify-artwork-form">
        <div className="form-title">
        <p>Fill in the artwork detail</p>
        </div>
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
        <button type="submit">Modify</button>
      </form>
    </div>
    </div>
  );
}

export default ModifyArtwork;