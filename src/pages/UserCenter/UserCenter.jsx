import  { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextWrapper";
import "./UserCenter.css";

function UserCenter() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="user-center-container">
      <h2>Welcome, {user?.name}!</h2>
      <div className="user-center-grid">
        <div className="user-center-item" onClick={() => navigate("/artshop/order")}>
          <img src="/path/to/shopping-cart-icon.png" alt="My Shopping Cart" className="user-center-icon" />
          <p>My Shopping Cart</p>
        </div>
        <div className="user-center-item" onClick={() => navigate("/wishlist")}>
          <img src="/path/to/wishlist-icon.png" alt="My Wishlist" className="user-center-icon" />
          <p>My Wishlist</p>
        </div>
        <div className="user-center-item" onClick={() => navigate("/purchased-artworks")}>
          <img src="/path/to/purchased-artworks-icon.png" alt="Purchased Artwork" className="user-center-icon" />
          <p>Purchased Artwork</p>
        </div>
        {user?.isArtist && (
          <div className="user-center-item" onClick={() => navigate("/my-artworks")}>
            <img src="/path/to/my-artworks-icon.png" alt="My Artworks" className="user-center-icon" />
            <p>My Artworks</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCenter;