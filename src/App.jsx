import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signUpFetch, loginFetch } from "./utils/userAuth";
import Cookies from "universal-cookie";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
import Books from "./pages/Books";
import Account from "./pages/Account";

const App = () => {
  const [user, setUser] = useState(null);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [errorName, setErrorName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e, credentials) => {
    e.preventDefault();

    const data = await loginFetch(credentials);

    if (data.error) {
      console.log(data);
      setErrorName(data.error.name);
      setErrorMessage(data.error.message);
      setTimeout(() => {
        setErrorName("");
        setErrorMessage("");
      }, 3000);
      return;
    }

    setUser(data.user);
    cookies.set("authToken", data.user.token);
    navigate("/");
  };

  const handleSignUp = async (e, credentials) => {
    e.preventDefault();

    const data = await signUpFetch(credentials);

    if (data.error) {
      console.log(data);
      setErrorName(data.error.name);
      setErrorMessage(data.error.message);
      setTimeout(() => {
        setErrorName("");
        setErrorMessage("");
      }, 3000);
      return;
    }

    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    cookies.remove("authToken");
    navigate("/");
  };

  return (
    <div className="App">
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/signup"
          element={<SignUp errorName={errorName} errorMessage={errorMessage} handleSignUp={handleSignUp} user={user} />}
        />
        <Route
          path="/login"
          element={<LogIn errorName={errorName} errorMessage={errorMessage} handleLogin={handleLogin} user={user} />}
        />
        <Route path="/books/:id" element={<Books />} />
        <Route path="/users" element={<Account />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
