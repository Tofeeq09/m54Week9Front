import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserByUsername } from "../utils/fetchUsers";

const Account = ({ loggedInUser }) => {
  const { username } = useParams();
  const [viewedUser, setViewedUser] = useState(null); // The data of the user being viewed

  useEffect(() => {
    const fetchUser = async () => {
      console.log(username); // log the username
      const data = await getUserByUsername(username);
      console.log(data); // log the user data
      setViewedUser(data);
    };

    fetchUser();
  }, [username]);

  if (!viewedUser) {
    return (
      <div>
        <h1>Account</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (username === loggedInUser.username) {
    return (
      <div>
        <h1>Welcome, {viewedUser.username}!</h1>
        <div>
          <h2>Private Information</h2>
          <p>Username: {loggedInUser.username}</p>
          <p>Email: {loggedInUser.email}</p>
          <p>Password: *****</p>
          <button>Change Information</button>
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
  }),
};

export default Account;
