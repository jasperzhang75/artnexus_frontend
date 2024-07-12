import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContextWrapper";
import { useBackgroundColor } from "../../context/BackgroundColorContext"; // Import the background color context
import "./Navbar.css";
import logo from "./../../assets/logo.svg";
import usericon from "./../../assets/user.svg";

function NavBar() {
  const { user, isLoggedIn, disconnect } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { backgroundColor } = useBackgroundColor(); // Use the context to get the background color

  const handleMouseEnter = () => {
    if (isLoggedIn) {
      setShowDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  const handleUserIconClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    disconnect();
  };

  return (
    <div className="nav-container" style={{ backgroundColor: backgroundColor || 'transparent' }}>
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <nav className="nav-center">
        <Link to="/">Nexus Artworks</Link>
        <Link to="/favourites">Favourites Collection</Link>
        <Link to="/aipainter">AI Painter</Link>
        <Link to="/artshop">Galleria Boutique</Link>
      </nav>
      <div
        className="user-menu"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleUserIconClick}
      >
        <Link to={isLoggedIn ? "/user-center" : "/login"}>
          <img src={usericon} alt="usercenter" className="login-icon" />
        </Link>
        {isLoggedIn && showDropdown && (
          <div className="dropdown-menu">
            <Link to="/artshop/order">Shopping Cart</Link>
            <Link to="/wishlist">Wish List</Link>
            <Link to="/purchased-artworks">Purchased Art</Link>
            {user?.isArtist && <Link to="/my-artworks">My Artworks</Link>}
            <p onClick={handleLogout} className="logout-button">Log Out</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;