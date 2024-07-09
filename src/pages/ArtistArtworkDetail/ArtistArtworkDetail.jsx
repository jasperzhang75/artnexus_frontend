import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ArtistArtworkDetail.css"

const ARTIST_API = "https://tastedive-proxy.onrender.com/paintings";

function ArtistArtworkDetail() {
  const { contentId } = useParams();
  const [artwork, setArtwork] = useState({});

  const getArtworkDetail = async () => {
    try {
      const res = await axios.get(`${ARTIST_API}/${contentId}`);
      setArtwork(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getArtworkDetail();
  }, [contentId]);

  return (
    <div>
      <hr></hr>
    <div className="artist-artwork-detail-container">
      {artwork.image && <img src={artwork.image} alt={artwork.title} />} 
      </div >
      <div className="artist-artwork">
      <h3>{artwork.title}</h3>
      <p>{artwork.yearAsString}</p>
</div>
   </div>
  );
}

export default ArtistArtworkDetail;
