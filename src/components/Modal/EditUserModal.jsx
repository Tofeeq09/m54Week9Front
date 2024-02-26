import { useState } from "react";
import { updateUserByUsername } from "../../utils/fetchUsers";
import PropTypes from "prop-types";

const EditUserModal = ({ toggle, action, token, username, triggerUpdate, viewedUser, updateUsername }) => {
  const [error, setError] = useState(null); // Error state

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedUser = { username: viewedUser.username };
    if (event.target.username.value) updatedUser.username = event.target.username.value;
    if (event.target.email.value) updatedUser.email = event.target.email.value;
    if (event.target.password.value) updatedUser.password = event.target.password.value;

    try {
      const updatedUserData = await updateUserByUsername(token, username, updatedUser);
      action();
      triggerUpdate();

      // Update the username in the state
      updateUsername(updatedUserData.username);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className={"editDetailsForm"}>
      <div className="modal" style={{ display: toggle ? "block" : "none" }}>
        {error && <p>{error.name}</p>}
        {error && <p>{error.message}</p>}
        <form onSubmit={handleSubmit}>
          <h2>Edit User Details</h2>
          <div className="form-field">
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" placeholder="Username" />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" placeholder="email" />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="form-btn">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

EditUserModal.propTypes = {
  token: PropTypes.string,
  username: PropTypes.string,
  toggle: PropTypes.bool,
  action: PropTypes.func,
  triggerUpdate: PropTypes.func,
  viewedUser: PropTypes.object,
  updateUsername: PropTypes.func,
};

export default EditUserModal;
