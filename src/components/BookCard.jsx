import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { addBookToUserLibrary, removeBookFromUserLibrary, getUserBooks } from "../utils/fetchBooks";

const BookCard = ({ book, token, username }) => {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const fetchUserBooks = async () => {
      if (username) {
        const userBooks = await getUserBooks(token, username);
        setIsAdded(userBooks.some((b) => b.title === book.title));
      }
    };

    fetchUserBooks();
  }, [book, token, username]);

  const addBook = async () => {
    const { response, data } = await addBookToUserLibrary(token, username, book.title);
    switch (response.status) {
      case 200:
        setIsAdded(true);
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
  };

  const removeBook = async () => {
    try {
      const { response, data } = await removeBookFromUserLibrary(token, username, book.title);
      switch (response.status) {
        case 200:
          setIsAdded(false);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "5px", padding: "10px", margin: "10px" }}>
      <h2>{book.title}</h2>
      <h3>{book.author}</h3>
      <p>{book.genre}</p>
      <p>Created at: {new Date(book.createdAt).toLocaleDateString()}</p>
      <p>Last updated: {new Date(book.updatedAt).toLocaleDateString()}</p>
      {username &&
        (!isAdded ? (
          <button onClick={addBook}>Add to library</button>
        ) : (
          <button onClick={removeBook}>Remove from library</button>
        ))}
      {!username && (
        <Link to="/login" className="link-button">
          <p>Please log in to add books to your library</p>
        </Link>
      )}
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string,
    genre: PropTypes.string,
    author: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }),
  token: PropTypes.string,
  username: PropTypes.string,
};

export default BookCard;
