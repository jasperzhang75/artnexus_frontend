import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../../service/api";
import "./Favourites.css"

function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const getFavourites = async () => {
      try {
        const res = await service.get("/api/favourite/user-favourites");
        setFavourites(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFavourites();
  }, []);

  const getClassByIndex = (index) => {
    if (index % 5 === 0) return "large";
    if (index % 3 === 0) return "medium";
    return "small";
  };

  const handleImageLoad = (artworkId) => {
    setLoadedImages(prev => ({ ...prev, [artworkId]: true }));
  };

  return (
    <div className="favourites-container">
      <h1>Favourite Artworks</h1>
      {favourites.length > 0 ? (
        <div className="favourites-grid">
          {favourites.map((artwork, index) => (
            <div key={artwork.artwork._id} className={`favourite-item ${getClassByIndex(index)}`}>
              <Link to={`/artwork/${artwork.artwork._id}`}>
                <img
                  src={`https://www.artic.edu/iiif/2/${artwork.artwork.image_id}/full/843,/0/default.jpg`}
                  alt={artwork.title}
                  onLoad={() => handleImageLoad(artwork.artwork._id)}
                  className={loadedImages[artwork.artwork._id] ? 'loaded' : ''}
                />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h1>No favourite artworks yet.</h1>
      )}
    </div>
  );
}

export default Favourites;