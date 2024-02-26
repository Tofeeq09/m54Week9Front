import PropTypes from "prop-types";

const UserCard = ({ user }) => {
  const date = new Date(user.createdAt);
  const formattedDateTime = date.toLocaleString([], { hour12: false });

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "5px", padding: "10px", margin: "10px" }}>
      <img src={user.image} alt={user.username} style={{ width: "100%", height: "200px", objectFit: "cover" }} />{" "}
      {/* display the image */}
      <h2 style={{ margin: "10px 0" }}>{user.username}</h2>
      <p>{formattedDateTime}</p>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
