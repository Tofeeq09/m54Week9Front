import { useState } from "react";
// import PropTypes from "prop-types";

const SignUpForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  console.log(form, setForm);

  return (
    <form className="sign-up-form">
      <div className="form-field">
        <label id="username" name="username">
          Username:
        </label>
        <input type="text" name="username" id="username" placeholder="Username" />
      </div>

      <div className="form-field">
        <label id="email" name="email">
          Email:
        </label>
        <input type="email" name="email" id="email" placeholder="user@example.com" />
      </div>
      <div className="form-field">
        <label id="password" name="password">
          Password:
        </label>
        <input type="password" name="password" id="password" placeholder="Create a password" />
      </div>
      <button type="submit" className="form-btn"></button>
    </form>
  );
};

// SignUpForm.propTypes = {};

export default SignUpForm;
