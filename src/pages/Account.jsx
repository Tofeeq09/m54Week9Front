import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserByUsername, getUserDetailsByUsername } from "../utils/fetchUsers";
import EditUserModal from "../components/Modal/EditUserModal";
import DeleteUserModal from "../components/Modal/DeleteUserModal";

const Account = ({ loggedInUser, updateUsername }) => {
  const { username } = useParams();
  const [viewedUser, setViewedUser] = useState(null); // The data of the user being viewed
  const [error, setError] = useState(null); // Error state
  const [editModalState, setEditModalState] = useState(false); // State for the modal
  const [deleteModalState, setDeleteModalState] = useState(false); // State for the modal
  const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger a re-fetch of the user data

  const openEditModal = () => {
    setEditModalState(!editModalState);
  };

  const openDeleteModal = () => {
    setDeleteModalState(!deleteModalState);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let data;
        if (username === loggedInUser.username) {
          data = await getUserDetailsByUsername(loggedInUser.token, username);
        } else {
          data = await getUserByUsername(username);
        }
        setViewedUser(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchUser();
  }, [username, loggedInUser, updateTrigger]);

  if (error) {
    return (
      <div>
        <h1>Account</h1>
        {error && <p>{error.name}</p>}
        {error && <p>{error.message}</p>}
      </div>
    );
  }

  if (!viewedUser) {
    return (
      <div>
        <h1>Account</h1>
        <p>Loading user...</p>
      </div>
    );
  }

  if (username === loggedInUser.username) {
    return (
      <div className="account">
        <h1>Welcome, {viewedUser.username}!</h1>
        <div>
          <h2>Private Information</h2>
          <p>Username: {viewedUser.username}</p>
          <p>Email: {viewedUser.email}</p>
          <p>Password: ********</p>
          <button className="toggleEditModal" onClick={openEditModal}>
            Change Information
          </button>
          <EditUserModal
            toggle={editModalState}
            action={openEditModal}
            token={loggedInUser.token}
            username={viewedUser.username}
            triggerUpdate={() => setUpdateTrigger(!updateTrigger)}
            updateUsername={updateUsername}
          />
          <button className="toggleDeleteModal" onClick={openDeleteModal}>
            DELETE ACCOUNT
          </button>
          <EditUserModal
            toggle={deleteModalState}
            action={openDeleteModal}
            token={loggedInUser.token}
            username={viewedUser.username}
            updateUsername={updateUsername}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="account">
      <h1>{viewedUser.username}</h1>
      <p>Username: {viewedUser.username}</p>
    </div>
  );
};

Account.propTypes = {
  loggedInUser: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    token: PropTypes.string,
  }),
  updateUsername: PropTypes.func,
};

export default Account;
