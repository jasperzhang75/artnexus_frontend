import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "./../service/api";

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
    <div>
      <h2>Sign Up as an Artist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" value={email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name (optional): </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name (optional): </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={handleChange}
          />
        </div>

        <p className="error">{errorMessage}</p>

        <p>
          Already have an account? <Link to={"/login"}>Login.</Link>
        </p>
        <button>Signup</button>
      </form>
    </div>
  );
}

export default SignUpArtistPage;