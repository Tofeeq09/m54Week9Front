import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "./Container";
import { IoMdLogIn } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { GrUserNew } from "react-icons/gr";
import "./NavBar.css";

const NavBar = ({ user, handleLogout }) => {
  return (
    <Container>
      <nav>
        <Link to="/">
          <div className="name">Bookshelf</div>
        </Link>
        {user ? (
          <div>
            <div />
            <h1>{user.username}</h1>
            <button onClick={handleLogout}>
              Logout <AiOutlineLogout />
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login" className="link-button">
              Login
              <IoMdLogIn />
            </Link>
            <Link to="/signup" className="link-button">
              Sign Up <GrUserNew />
            </Link>
          </div>
        )}
      </nav>
    </Container>
  );
};

NavBar.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func,
};

export default NavBar;
