import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { getAllUsers } from "../utils/fetchUsers";
import PropTypes from "prop-types";

const Dashboard = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // add a state variable for the search term

  useEffect(() => {
    const getUsers = async () => {
      if (user) {
        const data = await getAllUsers(user.token, searchTerm); // pass the token and the search term
        const usersWithImages = data.map((user) => ({
          ...user,
          image: `https://picsum.photos/seed/${user.id}/200`, // add a random image URL to each user
        }));
        setUsers(usersWithImages);
      }
    };

    getUsers();
  }, [user, searchTerm]); // add searchTerm to the dependency array

  if (!user) {
    return <h1>Dashboard</h1>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />{" "}
      {/* add an input field for the search term */}
      {!users.length ? <div>Loading...</div> : users.map((user) => <UserCard key={user.id} user={user} />)}
    </div>
  );
};

Dashboard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    token: PropTypes.string,
  }),
};

export default Dashboard;
