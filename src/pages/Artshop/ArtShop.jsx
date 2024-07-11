import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./Artshop.css"
import service from "./../../service/api"
import "./ArtShop.css"


function ArtshopPage() {
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
    <div className="artshop-container">
      <input
        type="text"
        placeholder="Search Artist"
        className="artshop-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="artshop-grid">
        {filteredArtworks.map((artwork) => (
          <div key={artwork._id} className="artshop-item">
            <Link to={`/uploadedartworks/${artwork._id}`}>
              <img
                src={`${artwork.imageUrl}`}
                alt={artwork.title}
                loading="lazy"
              />
            </Link>
            <p className="artshop-title">{artwork.title}</p>
            <p className="artshop-artist">{artwork.artist_title}</p>
            <p className="artshop-price">{artwork.price} $</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtshopPage;