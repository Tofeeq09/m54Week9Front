export const signUp = async (credentials) => {
  try {
    const response = await fetch("http://localhost:5001/api/signup", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
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

export const login = async (credentials) => {
  try {
    const response = await fetch("http://localhost:5001/api/login", {
      method: "POST",
      mode: "cors",
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

export const verifyUser = async (cookies) => {
  try {
    const response = await fetch("http://localhost:5001/login/verify", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5001",
        Authorization: "Bearer " + cookies.get("token"),
      },
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};
