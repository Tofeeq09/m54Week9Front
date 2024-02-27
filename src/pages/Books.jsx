import { useState, useEffect } from "react";
import { getAllBooks } from "../utils/fetchBooks";
import BookCard from "../components/BookCard";

const Books = (user) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getAllBooks();
      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <div>
      {books.map((book) => (
        <BookCard key={book.title} book={book} token={user.token} username={user.username} />
      ))}
    </div>
  );
};

export default Books;
