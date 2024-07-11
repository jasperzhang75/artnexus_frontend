import  { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContextWrapper";
import "./PurchasedArtworks.css";
import service from "./../../service/api";

function PurchasedArtworks() {
  const [purchasedArtworks, setPurchasedArtworks] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const fetchPurchasedArtworks = async () => {
    try {
      const res = await service.get(`/api/order/purchased`);
      setPurchasedArtworks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchPurchasedArtworks();
    }
  }, [isLoggedIn]);

  return (
    <div className="purchased-artworks-container">
      <h2>My Purchased Artworks</h2>
      <hr />
      <div className="purchased-artworks-grid">
        {purchasedArtworks.map((artwork) => (
          <div key={artwork._id} className="purchased-artwork-item">
            <img src={artwork.imageUrl} alt={artwork.title} className="purchased-artwork-image" />
            <p>{artwork.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchasedArtworks;