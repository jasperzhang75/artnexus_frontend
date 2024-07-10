import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ArtShop.css"
import service from "./../../service/api"


function Artshop() {
  const [artworks, setArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getArtwork = async () => {
    try {
      const res = await service.get("api/uploadedartworks/");
      setArtworks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtwork();
  }, []);

  const filteredArtworks = artworks.filter((artwork) =>
    artwork.artist_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="artwork-container">
      <input
        type="text"
        placeholder="Search Artist"
        className="artwork-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="artwork-grid">
      {filteredArtworks.map((artwork) => (
          <div key={artwork._id} className="artwork-item">
          
          <Link to={`/uploadedartworks/${artwork._id}`}>
            <img
              src={`${artwork.imageUrl}`}
              alt={artwork.title}
              loading="lazy"
            /></Link>
            <p>{artwork.title}</p>
            <p>{artwork.artist_title}</p>
            <p>{artwork.price}</p>
          
        </div>
      ))}
    </div>
    </div>
  );
}

export default Artshop;
