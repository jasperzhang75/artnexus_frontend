import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../../service/api";
import "./SignUpPage.css";

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
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
    <div className="signup-container">
      <h2>Sign Up</h2>
      <Link to="/signup-artist" className="artist-link">
        I am an artist
      </Link>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-field">
          <label htmlFor="username" className="signup-label">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleChange}
            className="signup-input"
          />
        </div>
        <div className="signup-field">
          <label htmlFor="email" className="signup-label">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            className="signup-input"
          />
        </div>
        <div className="signup-field">
          <label htmlFor="password" className="signup-label">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            className="signup-input"
          />
        </div>
        <div className="signup-field">
          <label htmlFor="firstName" className="signup-label">First Name: </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleChange}
            className="signup-input"
          />
        </div>
        <div className="signup-field">
          <label htmlFor="lastName" className="signup-label">Last Name: </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleChange}
            className="signup-input"
          />
        </div>

        <p className="signup-error">{errorMessage}</p>

        <p className="signup-login">
          Already have an account? <Link to={"/login"} className="signup-login-link">Login.</Link>
        </p>
        <button className="signup-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;