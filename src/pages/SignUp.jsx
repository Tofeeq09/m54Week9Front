import PropTypes from "prop-types";
import Container from "../components/Container";
import SignUpForm from "../components/SignUpForm";

const SignUp = ({ handleSignUp, errorName, errorMessage, user }) => {
  return (
    <div>
      <Container className="container">
        <h2>Sign Up</h2>
        <p>Please enter your details to create a new account.</p>
        <SignUpForm handleSignUp={handleSignUp} errorName={errorName} errorMessage={errorMessage} user={user} />
      </Container>
    </div>
  );
};

SignUp.propTypes = {
  handleSignUp: PropTypes.func.isRequired,
  errorName: PropTypes.string,
  errorMessage: PropTypes.string,
  user: PropTypes.object,
};

export default SignUp;
