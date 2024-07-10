import  { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextWrapper";
import "./Wishlist.css";
import service from "./../../service/api";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchWishlistItems = async () => {
    try {
      const res = await service.get(`/api/wish`);
      setWishlistItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      await service.delete(`/api/wish/${id}`);
      fetchWishlistItems(); // Refresh wishlist items after deletion
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToArtwork = (id) => {
    navigate(`/uploadedartworks/${id}`);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchWishlistItems();
    }
  }, [isLoggedIn]);

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item.artwork._id} className="wishlist-item">
            <img 
              src={item.artwork.imageUrl} 
              alt={item.artwork.title} 
              className="wishlist-item-image" 
              onClick={() => navigateToArtwork(item.artwork._id)} 
            />
            <button onClick={() => removeFromWishlist(item.artwork._id)} className="remove-item-button">×</button>
            <p>{item.artwork.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;