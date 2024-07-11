import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Artwork.css";
import service from "./../../service/api";
import { AuthContext } from "../../context/AuthContextWrapper";
import heartIcon from "./../../assets/heart.svg";
import heartFilledIcon from "./../../assets/heart-filled.svg";

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function Artwork() {
  const [artworks, setArtworks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [likedArtworks, setLikedArtworks] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const getArtwork = async () => {
    try {
      const res = await service.get("api/normalartworks/");
      const shuffledArtworks = shuffleArray(res.data); // Shuffle the artworks
      setArtworks(shuffledArtworks);
    } catch (error) {
      console.log(error);
    }
  };

  const getLikedArtworks = async () => {
    try {
      if (isLoggedIn) {
        const res = await service.get("api/favourite/user-favourites");
        setLikedArtworks(res.data.map(fav => fav.artwork._id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtwork();
    getLikedArtworks();
  }, [isLoggedIn]);

  const handleFilterChange = (type) => {
    setFilterType((prevFilters) =>
      prevFilters.includes(type)
        ? prevFilters.filter((filter) => filter !== type)
        : [...prevFilters, type]
    );
  };

  const toggleLike = async (id) => {
    try {
      if (likedArtworks.includes(id)) {
        await service.delete(`api/favourite/${id}`);
        setLikedArtworks((prevLiked) => prevLiked.filter((artworkId) => artworkId !== id));
      } else {
        await service.post(`api/normalartworks/${id}/favourite`);
        setLikedArtworks((prevLiked) => [...prevLiked, id]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredArtworks = artworks.filter((artwork) => {
    const matchesSearchTerm = artwork.artist_display.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilterType = filterType.length === 0 || filterType.includes(artwork.type);
    return matchesSearchTerm && matchesFilterType;
  });

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
      <div className="filter-bar" onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
        <p>Filter</p>
        {isDropdownVisible && (
          <div className="dropdown-menu">
            <label>
              <input
                type="checkbox"
                checked={filterType.includes('impressionism')}
                onChange={() => handleFilterChange('impressionism')}
              />
              Impressionism
            </label>
            <label>
              <input
                type="checkbox"
                checked={filterType.includes('modernism')}
                onChange={() => handleFilterChange('modernism')}
              />
              Modernism
            </label>
          </div>
        )}
      </div>
      <div className="artwork-grid">
        {filteredArtworks.map((artwork) => (
          <div key={artwork._id} className="artwork-item">
            <Link to={`/artwork/${artwork._id}`}>
              <img
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                alt={artwork.title}
                loading="lazy"
              />
            </Link>
            <div className="artwork-info">
              <p>{artwork.title}</p>
              <p>{artwork.artist_title}</p>
              <p className="like-button" onClick={() => toggleLike(artwork._id)}>
                <img src={likedArtworks.includes(artwork._id) ? heartFilledIcon : heartIcon} alt="like button" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Artwork;