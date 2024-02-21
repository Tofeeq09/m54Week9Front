import { useState } from "react";

const LoginForm = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  console.log(form, setForm);

  return (
    <form className="Login-form">
      <div className="flex flex-col gap-1">
        <label id="email" name="email">
          Email:
        </label>
        <input type="email" name="email" id="email" placeholder="user@example.com" />
      </div>

      <div className="form-field">
        <label id="password" name="password">
          Password:
        </label>
        <input type="password" name="password" id="password" placeholder="Enter your password" />
      </div>
      <button type="submit" className="form-btn"></button>
    </form>
  );
};

export default LoginForm;
