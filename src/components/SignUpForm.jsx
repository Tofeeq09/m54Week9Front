import { useState } from "react";
import PropTypes from "prop-types";

const SignUpForm = ({ handleSignUp, errorName, errorMessage }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp(e, credentials);
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      {errorName && <p>{errorName}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <div className="form-field">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="user@example.com"
          value={credentials.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Create a password"
          value={credentials.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="form-btn">
        Sign Up
      </button>
    </form>
  );
};

SignUpForm.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
  errorName: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default SignUpForm;
