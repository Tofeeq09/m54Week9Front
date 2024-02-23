import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { fetchAllUsers } from "../utils/fetchUsers";

const Dashboard = () => {
  const [users, setUsers] = useState([]); // create a state variable to store the users

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchAllUsers(); // fetch the users
      const usersWithImages = data.map((user) => ({
        ...user,
        image: `https://picsum.photos/seed/${user.id}/200`, // add a random image URL to each user
      }));
      setUsers(usersWithImages); // update the state with the fetched users
    };

    getUsers(); // call the function to fetch the users
  }, []); // pass an empty dependency array to run the effect once on mount

  return (
    <div>
      <h1>Dashboard</h1>
      {!users ? <div>Loading...</div> : users.map((user) => <UserCard key={user.id} user={user} />)}
    </div>
  );
};

export default Dashboard;
