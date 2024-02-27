export const getAllUsers = async (token, searchTerm) => {
  try {
    // const response = await fetch("http://localhost:5001/api/users", {
    const response = await fetch(`http://localhost:5001/api/users?username=${searchTerm}`, {
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

export const getUserByUsername = async (username) => {
  try {
    const response = await fetch(`http://localhost:5001/api/users/${username}`, {
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

export const getUserDetailsByUsername = async (token, username) => {
  try {
    const response = await fetch(`http://localhost:5001/api/users/${username}/account`, {
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

export const updateUserByUsername = async (token, username, updatedUser) => {
  try {
    const response = await fetch(`http://localhost:5001/api/users/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    });

    const data = await response.json();
    return { response, data };
  } catch (error) {
    return error;
  }
};

export const deleteUserByUsername = async (token, username, deletedUser) => {
  try {
    const response = await fetch(`http://localhost:5001/api/users/${username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(deletedUser),
    });

    const data = await response.json();
    return { response, data };
  } catch (error) {
    return error;
  }
};
