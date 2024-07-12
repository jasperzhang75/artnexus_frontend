import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContextWrapper";
import { Link } from "react-router-dom";
import service from "../../service/api";
import "./LoginPage.css";

function LoginPage() {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(event) {
    const value = event.currentTarget.value;
    const key = event.currentTarget.id;
    setFormData({ ...formData, [key]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await service.post("/auth/login", formData);
      console.log(response);
      if (response.status === 200) {
        storeToken(response.data.accessToken);
        await authenticateUser();
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  }

  const { password, email } = formData;
  return (

    <div className="login-form-container">
      
    <form onSubmit={handleSubmit} className="login-form">
      <p>Sign in to access personalized content</p>
      <div className="login-field">
        <label htmlFor="email" className="login-label">Email: </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
          className="login-input"
        />
      </div>
      <div className="login-field">
        <label htmlFor="password" className="login-label">Password: </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
          className="login-input"
        />
      </div>

     
<button className="login-button">Login</button>
      <p className="login-signup">
        No account? <Link to={"/signup"} className="login-signup-link">Sign up now!</Link>
      </p>
       <p className="login-error">{errorMessage}</p>
    </form></div>
  );
}

export default LoginPage;