export const signUpFetch = async (credentials) => {
  try {
    const response = await fetch("http://localhost:5001/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

export const loginFetch = async (credentials) => {
  try {
    const response = await fetch("http://localhost:5001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};
