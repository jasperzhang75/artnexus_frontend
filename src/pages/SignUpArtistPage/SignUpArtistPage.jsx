import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../../service/api";
import "./SignUpArtistPage.css";

function SignUpArtistPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    isArtist: true,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const value = event.currentTarget.value;
    const key = event.currentTarget.id;
    setFormData({ ...formData, [key]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await service.post("/auth/signup", formData);
      console.log(response);
      if (response.status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 200);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  const { username, password, email, firstName, lastName } = formData;
  return (
    <div className="signup-artist-container">
      <h2>Sign Up as an Artist</h2>
      <form onSubmit={handleSubmit} className="signup-artist-form">
        <div className="signup-artist-field">
          <label htmlFor="username" className="signup-artist-label">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleChange}
            className="signup-artist-input"
          />
        </div>
        <div className="signup-artist-field">
          <label htmlFor="email" className="signup-artist-label">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            className="signup-artist-input"
          />
        </div>
        <div className="signup-artist-field">
          <label htmlFor="password" className="signup-artist-label">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            className="signup-artist-input"
          />
        </div>
        <div className="signup-artist-field">
          <label htmlFor="firstName" className="signup-artist-label">First Name: </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleChange}
            className="signup-artist-input"
          />
        </div>
        <div className="signup-artist-field">
          <label htmlFor="lastName" className="signup-artist-label">Last Name: </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleChange}
            className="signup-artist-input"
          />
        </div>

        <p className="signup-artist-error">{errorMessage}</p>

        <p className="signup-artist-login">
          Already have an account? <Link to={"/login"} className="signup-artist-login-link">Login.</Link>
        </p>
        <button className="signup-artist-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpArtistPage;