import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { signUp, login, verifyUser } from "./utils/userAuth";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
import Books from "./pages/Books";
import Account from "./pages/Account";

const App = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const clearError = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const updateUsername = (newUsername) => {
    setUser((prevState) => ({ ...prevState, username: newUsername }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      const data = await verifyUser(cookies);
      if (!data.success) {
        return;
      }
      setUser(data.user);
    };

    fetchUser();
  }, [navigate, cookies]);

  const handleLogin = async (e, credentials) => {
    e.preventDefault();
    const { response, data } = await login(credentials);
    if (!response.ok) {
      setError({ name: data.name, message: data.message });
      clearError();
    }
    setUser(data.user);
    setCookie("token", data.user.token);
    navigate("/");
  };

  const handleSignUp = async (e, credentials) => {
    e.preventDefault();
    const result = await signUp(credentials);
    const { response, data } = result;

    switch (response.status) {
      case 201:
        setUser(data.user);
        setCookie("token", data.user.token);
        navigate("/");
        break;
      case 400:
      case 401:
      case 404:
        window.alert(data.message);
        setError({ message: data.message });
        clearError();
        break;
      case 500:
      case 501:
        window.alert(`Error: ${data.error.name}, Message: ${data.error.message}`);
        setError({ name: data.error.name, message: data.error.message });
        clearError();
        break;
      default:
        setError({ name: "Unknown error", message: "An unknown error occurred" });
        clearError();
        break;
    }
  };

  const handleLogout = () => {
    setUser(null);
    removeCookie("token");
    navigate("/");
  };

  return (
    <div className="App">
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/signup" element={<SignUp error={error} handleSignUp={handleSignUp} user={user} />} />
        <Route path="/login" element={<LogIn error={error} handleLogin={handleLogin} user={user} />} />
        <Route
          path="/users/:username"
          element={<Account loggedInUser={user} updateUsername={updateUsername} handleLogout={handleLogout} />}
        />
        <Route path="/books" element={<Books user={user} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
