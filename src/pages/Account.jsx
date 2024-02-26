import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserByUsername, getUserDetailsByUsername } from "../utils/fetchUsers";
import EditUserModal from "../components/EditUserModal";

const Account = ({ loggedInUser }) => {
  const { username } = useParams();
  const [viewedUser, setViewedUser] = useState(null); // The data of the user being viewed
  const [error, setError] = useState(null); // Error state
  const [modalOpen, setModalOpen] = useState(false); // State for modal

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [username, loggedInUser]);

  if (error) {
    return (
      <div>
        <h1>Account</h1>
        <p>{error}</p>
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
      <div>
        <h1>Welcome, {viewedUser.username}!</h1>
        <div>
          <h2>Private Information</h2>
          <p>Username: {viewedUser.username}</p>
          <p>Email: {viewedUser.email}</p>
          <p>Password: ********</p>
          <button onClick={openModal}>Change Information</button>
          <EditUserModal
            show={modalOpen}
            handleClose={closeModal}
            token={loggedInUser.token}
            username={viewedUser.username}
          />
          <button>DELETE ACCOUNT</button>
        </div>
      </div>
    );
  }

  return (
    <div>
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
};

export default Account;
