import PropTypes from "prop-types";

const UserBookCard = ({ book }) => {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "5px", padding: "10px", margin: "10px" }}>
      <h2>{book.title}</h2>
      <h3>{book.author}</h3>
      <p>{book.genre}</p>
    </div>
  );
};

UserBookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
    author: PropTypes.string,
  }),
};

export default UserBookCard;
