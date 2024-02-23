import "./App.css";
import { useEffect, useState } from "react";
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
import { verifyUser } from "./utils/userAuth";

const App = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const [errorName, setErrorName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // For persistent user login, sends request to backend to verify jwt token
    const fetchUser = async () => {
      const data = await verifyUser();

      if (!data.success) {
        return;
      }

      setUser(data.user);
    };

    fetchUser();
  }, [navigate]);

  const handleLogin = async (e, credentials) => {
    e.preventDefault();

    const data = await loginFetch(credentials);

    if (!data.success) {
      setErrorName(data.name);
      setErrorMessage(data.message);
      setTimeout(() => {
        setErrorName("");
        setErrorMessage("");
      }, 3000);
    }

    setUser(data.user);
    cookies.set("authToken", data.token);
    navigate("/");
  };

  const handleSignUp = async (e, credentials) => {
    e.preventDefault();

    const data = await signUpFetch(credentials);

    if (!data.success) {
      console.log(data);
      setErrorName(data.name);
      setErrorMessage(data.message);
      setTimeout(() => {
        setErrorName("");
        setErrorMessage("");
      }, 3000);
      return;
    }

    setUser(data.user);
    cookies.set("token", data.token);
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    cookies.remove("token");
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
