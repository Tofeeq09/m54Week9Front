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

  const clearError = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const handleLogin = async (e, credentials) => {
    e.preventDefault();

    const data = await login(credentials);

    if (!data.success) {
      setError(data);
      clearError();
      return;
    }

    setUser(data.user);
    setCookie("token", data.token);
    navigate("/");
  };

  const handleSignUp = async (e, credentials) => {
    e.preventDefault();

    const data = await signUp(credentials);

    if (!data.success) {
      setError(data);
      clearError();
      return;
    }

    setUser(data.user);
    setCookie("token", data.token);
    navigate("/");
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
        <Route path="/users/:username" element={<Account loggedInUser={user} />} />
        <Route path="/books/:id" element={<Books />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
