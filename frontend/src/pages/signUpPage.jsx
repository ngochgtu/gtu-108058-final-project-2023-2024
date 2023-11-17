
import "../../src/style/pages.styles.css";
import "../style/signUp.styles.css";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const onSignIn = () => {
    navigate("/sign-in");
  }


  return (
    <div>
      <form
      //   onSubmit={handleSignUp}
      >
        <div className="signUp-container">
          <h3 className="signUp-title">Sign Up</h3>
          <div className="signUp--input__container">
            <label className="signUp-label">User name</label>
            <input
              type="text"
              className="signUp-input"
              placeholder="Username"
            />
          </div>
          <div className="signUp--input__container">
            <label className="signUp-label">Email address</label>
            <input
              type="email"
              className="signUp-input"
              placeholder="Enter email"
            />
          </div>
          <div className="signUp--input__container">
            <label className="signUp-label">Password</label>
            <input
              type="password"
              className="signUp-input"
              placeholder="Password"
            />
          </div>
          <div className="signUp--input__container">
            <label className="signUp-label">Confirm Password</label>
            <input
              type="password"
              className="signUp-input"
              placeholder="Password"
            />
          </div>
          <div className="signUp--button_container">
            <button
              type="submit"
              className="signUp-button"
              onClick={onSignIn}
            >
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <Link to="/sign-in">sign in</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
