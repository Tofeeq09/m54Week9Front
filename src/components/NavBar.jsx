import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import Container from "./Container";

const NavBar = () => {
  return (
    <Container>
      <nav>
        <Link to="/">
          <div className="name">Bookshelf</div>
        </Link>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </nav>
    </Container>
  );
};

// NavBar.PropTypes = {};

export default NavBar;
