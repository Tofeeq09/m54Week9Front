export const fetchAllUsers = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/users", {
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
