import { useState } from "react";
import PropTypes from "prop-types";

const LoginForm = ({ handleLogin, errorName, errorMessage }) => {
  const [credentials, setCredentials] = useState({
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
    handleLogin(e, credentials);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {errorName && <p>{errorName}</p>}
      {errorMessage && <p>{errorMessage}</p>}
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
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="form-btn">
        Login
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  errorName: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default LoginForm;
