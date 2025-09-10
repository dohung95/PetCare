// import { useState } from "react";
// import "../Css/Auth_login.css";
// import { Link } from "react-router-dom";

// export default function Login() {
//   const [isRightPanelActive, setIsRightPanelActive] = useState(false);

//   return (
//     <div className="body_login">
//       <div
//         id="container"
//         className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
//       >
//         {/* Sign Up */}
//         <div className="form-container sign-up-container">
//           <form>
//             <h1>Create Account</h1><input type="text" placeholder="Full Name" required />
//             <input type="email" placeholder="Email" required />
//             <input type="tel" placeholder="Phone Number" required />
//             <textarea
//               placeholder="Address"
//               rows={3}
//               style={{
//                 width: "100%",
//                 resize: "vertical",
//                 background: "#eee",
//                 border: "none",
//                 padding: "12px 15px",
//                 margin: "8px 0",
//                 borderRadius: 6,
//                 fontFamily: "inherit",
//                 height: 50,
//               }}
//               required
//             />
//             <button type="button">Sign Up</button>
//           </form>
//         </div>

//         {/* Sign In */}
//         <div className="form-container sign-in-container">
//           <form>
//             <h1>Login</h1>
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="Password" />
//             <a href="/auth/forgot_password">Forgot your password?</a>
//             <button type="button">Sign In</button>
//           </form>
//         </div>

//         {/* Overlay */}
//         <div className="overlay-container">
//           <div className="overlay">
//             <div className="overlay-panel overlay-left">
//               <h1>Welcome Back!</h1>
//               <p>To keep connected with us please login with your personal info</p>
//               <button
//                 className="ghost"
//                 id="signIn"
//                 onClick={() => setIsRightPanelActive(false)}
//               >
//                 Login
//               </button>
//             </div>
//             <div className="overlay-panel overlay-right">
//               <h1>Hello, Friend!</h1>
//               <p>Enter your personal details and start journey with us</p>
//               <button
//                 className="ghost"
//                 id="signUp"
//                 onClick={() => setIsRightPanelActive(true)}
//               >
//                 register
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="btn_home" style={{ textAlign: "center", marginTop: "40px" }}>
//         <button><Link to="/" style={{ color: "rgba(255, 255, 255, 1)" }}>GO BACK HOME</Link></button>
//       </div>
//     </div>
//   );
// }









import { useState } from "react";
import "../Css/Auth_login.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  // ========== SIGN IN state ==========
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginShake, setLoginShake] = useState(false);

  // ========== SIGN UP state ==========
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupAddress, setSignupAddress] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupShake, setSignupShake] = useState(false);

  // Helpers
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  const isValidPhone = (v) => /^\d{9,12}$/.test(v.trim());

  const shake = (setter) => {
    setter(true);
    setTimeout(() => setter(false), 500);
  };

  // Validate Login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");

    if (!isValidEmail(loginEmail)) {
      setLoginError("Please enter a valid email 🐾");
      shake(setLoginShake);
      return;
    }
    if (!loginPassword || loginPassword.length < 6) {
      setLoginError("Password must be at least 6 characters 🐶");
      shake(setLoginShake);
      return;
    }
    console.log("LOGIN payload:", { email: loginEmail, password: loginPassword });
  };

  // Validate Sign Up
  const handleSignup = (e) => {
    e.preventDefault();
    setSignupError("");

    if (!signupName || signupName.trim().length < 3) {
      setSignupError("Full name must be at least 3 characters 🐾");
      shake(setSignupShake);
      return;
    }
    if (!isValidEmail(signupEmail)) {
      setSignupError("Please enter a valid email address 🐱");
      shake(setSignupShake);
      return;
    }
    if (!isValidPhone(signupPhone)) {
      setSignupError("Phone number must be 9–12 digits 🐶");
      shake(setSignupShake);
      return;
    }
    if (!signupAddress || signupAddress.trim().length < 10) {
      setSignupError("Address must be at least 10 characters 🐾");
      shake(setSignupShake);
      return;
    }

    console.log("SIGNUP payload:", {
      name: signupName,
      email: signupEmail,
      phone: signupPhone,
      address: signupAddress,
    });
  };

  return (
    <div className="body_login">
      <div
        id="container"
        className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      >
        {/* ================= Sign Up ================= */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSignup} className={signupShake ? "form-shake" : ""} noValidate>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Full Name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              className={!signupName || signupName.length >= 3 ? "" : "is-invalid"}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className={!signupEmail || isValidEmail(signupEmail) ? "" : "is-invalid"}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={signupPhone}
              onChange={(e) => setSignupPhone(e.target.value)}
              className={!signupPhone || isValidPhone(signupPhone) ? "" : "is-invalid"}
              required
            />
            <textarea
              placeholder="Address"
              rows={3}
              style={{
                width: "100%",
                resize: "vertical",
                background: "#eee",
                border: "none",
                padding: "12px 15px",
                margin: "8px 0",
                borderRadius: 6,
                fontFamily: "inherit",
                height: 50,
              }}
              value={signupAddress}
              onChange={(e) => setSignupAddress(e.target.value)}
              className={!signupAddress || signupAddress.length >= 10 ? "" : "is-invalid"}
              required
            />
            {signupError && <div className="form-error">{signupError}</div>}
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* ================= Sign In ================= */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin} className={loginShake ? "form-shake" : ""} noValidate>
            <h1>Login</h1>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className={!loginEmail || isValidEmail(loginEmail) ? "" : "is-invalid"}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className={!loginPassword || loginPassword.length >= 6 ? "" : "is-invalid"}
              required
            />
            {loginError && <div className="form-error">{loginError}</div>}
            <Link to="/auth/forgot_password">Forgot your password?</Link>
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* ================= Overlay ================= */}
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
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back home */}
      <div className="btn_home" style={{ textAlign: "center", marginTop: "40px" }}>
        <button>
          <Link to="/" style={{ color: "rgba(255, 255, 255, 1)" }}>GO BACK HOME</Link>
        </button>
      </div>
    </div>
  );
}
