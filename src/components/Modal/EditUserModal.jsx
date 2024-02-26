import { useState } from "react";
import { updateUserByUsername } from "../../utils/fetchUsers";
import PropTypes from "prop-types";

const EditUserModal = ({ toggle, action, token, username, triggerUpdate, updateUsername }) => {
  const [error, setError] = useState(null); // Error state

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedUser = { username: username };
    if (event.target.username.value) updatedUser.username = event.target.username.value;
    if (event.target.email.value) updatedUser.email = event.target.email.value;
    if (event.target.password.value) updatedUser.password = event.target.password.value;

    try {
      const { response, data } = await updateUserByUsername(token, username, updatedUser);
      action();

      switch (response.status) {
        case 200:
          triggerUpdate();
          updateUsername(data.username);
          window.alert(data.message);
          break;
        case 400:
        case 401:
        case 404:
          window.alert(data.message);
          break;
        case 500:
        case 501:
          window.alert(`Error: ${data.error.name}, Message: ${data.error.message}`);
          break;
        default:
          window.alert("An unknown error occurred");
          break;
      }
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
          <p>Update your user details below:</p>
          <div className="form-field">
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" className="form-field" placeholder="Username" />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" className="form-field" placeholder="email" />
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
};

EditUserModal.propTypes = {
  token: PropTypes.string,
  username: PropTypes.string,
  toggle: PropTypes.bool,
  action: PropTypes.func,
  triggerUpdate: PropTypes.func,
  updateUsername: PropTypes.func,
};

export default EditUserModal;
