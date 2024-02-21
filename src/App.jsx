import "./App.css";
import { Route, Routes } from "react-router-dom";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/Login";
import Books from "./pages/Books";
import Account from "./pages/Account";

const App = () => (
  <div className="App">
    <NavBar />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/books/:id" element={<Books />} />
      <Route path="/account/:id" element={<Account />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
