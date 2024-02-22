import PropTypes from "prop-types";
import Container from "../components/Container";
import LoginForm from "../components/LoginForm";

const Login = ({ handleLogin, errorName, errorMessage, user }) => {
  return (
    <div>
      <Container className="container">
        <h2>Login</h2>
        <p>Please enter your credentials to login.</p>
        <LoginForm handleLogin={handleLogin} errorName={errorName} errorMessage={errorMessage} user={user} />
      </Container>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  errorName: PropTypes.string,
  errorMessage: PropTypes.string,
  user: PropTypes.object,
};

export default Login;
