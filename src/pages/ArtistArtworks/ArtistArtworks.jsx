import { useParams, Link} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ArtistArtworks.css";

const ARTIST_API = "https://tastedive-proxy.onrender.com/wikiart?artistUrl=";

function ArtistArtworks() {
  const { artistUrl } = useParams();
  const [artworks, setArtworks] = useState([]);

  const getArtistArtworks = async () => {
    try {
      const res = await axios.get(
        `${ARTIST_API}${artistUrl}&json=2&authSessionKey=8bcee2b1e162`
      );
      setArtworks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtistArtworks();
  }, [artistUrl]);

const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };


  return (
    <div className="artistartworks-container">
      <h1>Artworks by {capitalizeWords(artistUrl.replace("-", " "))}</h1>
      <p>Powered by WikiArt</p>
      <div className="artwork-grid">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="artwork-item">
           <Link to={`/artist-artwork/${artwork.contentId}`}>
              <img src={artwork.image} alt={artwork.title} />
            </Link>
            <p>{artwork.title}</p>
            <p>{artwork.yearAsString}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtistArtworks;
