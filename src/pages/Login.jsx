import PropTypes from "prop-types";
import Container from "../components/Container";
import LogInForm from "../components/LogInForm";

const Login = ({ handleLogin, error, user }) => {
  return (
    <div>
      <Container className="container">
        <h2>Login</h2>
        <p>Please enter your credentials to login.</p>
        <LogInForm handleLogin={handleLogin} error={error} user={user} />
      </Container>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  error: PropTypes.object,
  user: PropTypes.object,
};

export default Login;
