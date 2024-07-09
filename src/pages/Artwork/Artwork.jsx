import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Artwork.css"
import service from "./../../service/api"


function Artwork() {
  const [artworks, setArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getArtwork = async () => {
    try {
      const res = await service.get("api/normalartworks/");
      setArtworks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtwork();
  }, []);

  const filteredArtworks = artworks.filter((artwork) =>
    artwork.artist_display.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="artwork-container">
      <p>Featured Artworks</p>
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
          
          <Link to={`/artwork/${artwork._id}`}>
            <img
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.title}
              loading="lazy"
            /></Link>
            <p>{artwork.title}</p>
            <p>{artwork.artist_title}</p>
          
        </div>
      ))}
    </div>
    </div>
  );
}

export default Artwork;
