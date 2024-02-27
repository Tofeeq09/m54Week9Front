export const getAllBooks = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/books", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const addBookToUserLibrary = async (token, username, bookTitle) => {
  try {
    const response = await fetch("http://localhost:5001/api/books/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: username,
        bookTitle: bookTitle,
      }),
    });

    const data = await response.json();

    return { response, data };
  } catch (error) {
    return error;
  }
};

export const getUserBooks = async (token, username) => {
  try {
    const response = await fetch(`http://localhost:5001/api/users/${username}/books`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};
