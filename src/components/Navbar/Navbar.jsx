import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "./../../assets/logo.svg"
import user from "./../../assets/user.svg"

function NavBar() {
  return (
    <div className="nav-container">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>      <nav className="nav-center">
        <Link to="/">Nexus Artworks</Link>
        <Link to="/favourites">Favourites Collection</Link>
        <Link to="/ai-mpressionist">AI Painter</Link>
        <Link to="/shop">Galleria Boutique</Link>
        <Link to="/login">
          <img src={user} alt="Login" className="login-icon" /> {/* Use the SVG icon */}
        </Link>
      </nav>
    </div>
  );
}
export default NavBar;
