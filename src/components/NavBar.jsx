import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Container from "./Container";
import { MdOutlineLogin } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
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
              Logout <MdOutlineLogout />
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login" className="link-button">
              Login
              <MdOutlineLogin />
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
