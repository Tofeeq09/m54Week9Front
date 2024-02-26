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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};
