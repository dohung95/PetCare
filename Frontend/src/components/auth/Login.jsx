import { useState } from "react";
import "../Css/Auth_login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  return (
    <div className="body_login">
      <div
        id="container"
        className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      >
        {/* Sign Up */}
        <div className="form-container sign-up-container">
          <form>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="button">Sign Up</button>
          </form>
        </div>

        {/* Sign In */}
        <div className="form-container sign-in-container">
          <form>
            <h1>Login</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button type="button">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setIsRightPanelActive(false)}
              >
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setIsRightPanelActive(true)}
              >
                register
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="btn_home" style={{ textAlign: "center", marginTop: "40px" }}>
        <button><Link to="/">GO BACK HOME</Link></button>
      </div>
    </div>
  );
}
