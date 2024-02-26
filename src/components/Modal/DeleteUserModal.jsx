import PropTypes from "prop-types";
import { useState } from "react";
import { deleteUserByUsername } from "../../utils/fetchUsers";
// import { handleLogout } from "../../../src/App";

function DeleteUserModal({ toggle, action, token, username, handleLogout }) {
  const [error, setError] = useState(null); // Error state

  const handleSubmit = async (event) => {
    event.preventDefault();

    const deletedUser = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      await deleteUserByUsername(token, username, deletedUser);
      action();
      handleLogout();
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className={"deleteUserForm"}>
      <div className="modal" style={{ display: toggle ? "block" : "none" }}>
        {error && <p>{error.name}</p>}
        {error && <p>{error.message}</p>}
        <form onSubmit={handleSubmit}>
          <h2>Delete User</h2>
          <p>
            Are you sure you want to delete your account? This action cannot be undone. <br />
            Please enter your email and password to confirm.
          </p>

          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" className="form-field" placeholder="user@example.com" />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" className="form-field" placeholder="Password" />
          </div>
          <button type="submit" className="form-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

DeleteUserModal.propTypes = {
  toggle: PropTypes.bool,
  action: PropTypes.func,
  token: PropTypes.string,
  username: PropTypes.string,
  handleLogout: PropTypes.func,
};

export default DeleteUserModal;
