import  { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextWrapper";
import "./UserCenter.css";
import shoppingcart from "./../../assets/shoppingcart.svg";
import wishlist from "./../../assets/wishlist.svg";
import purchased from "./../../assets/purchased.svg";
import myartworks from "./../../assets/myartworks.svg";

function UserCenter() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="user-center-container">
      <h2>Welcome, {user?.username}!</h2>
      <hr />
      <div className="user-center-grid">
        <div className="user-center-item" onClick={() => navigate("/artshop/order")}>
          <img src={shoppingcart} alt="My Shopping Cart" className="user-center-icon" />
          <p>My Shopping Cart</p>
        </div>
        <div className="user-center-item" onClick={() => navigate("/wishlist")}>
          <img src={wishlist} alt="My Wishlist" className="user-center-icon" />
          <p>My Wishlist</p>
        </div>
        <div className="user-center-item" onClick={() => navigate("/purchased-artworks")}>
          <img src={purchased} alt="Purchased Artwork" className="user-center-icon" />
          <p>Purchased Artwork</p>
        </div>
        {user?.isArtist && (
          <div className="user-center-item" onClick={() => navigate("/my-artworks")}>
            <img src={myartworks} alt="My Artworks" className="user-center-icon" />
            <p>My Artworks</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCenter;