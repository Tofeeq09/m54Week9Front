import PropTypes from "prop-types";

const BookCard = () => {
  return (
    <div>
      <h1>BookCard</h1>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookCard;
