import Cookies from "universal-cookie";

const cookies = new Cookies();

export const signUpFetch = async (credentials) => {
  const response = await fetch("http://localhost:5001/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  cookies.set("token", data.token); // Set the token in the cookies
  return data;
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
    cookies.set("token", data.token); // Set the token in the cookies
    return data;
  } catch (error) {
    return error;
  }
};

export const verifyUser = async () => {
  const token = cookies.get("token");

  if (!token) {
    return { success: false, error: "No token found" };
  }

  try {
    const response = await fetch("http://localhost:5001/login/verify", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5001",
        Authorization: `Bearer ${token}`, // Add this line
      },
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    return { success: false, error: error.message };
  }
};
