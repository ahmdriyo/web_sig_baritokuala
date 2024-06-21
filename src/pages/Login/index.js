import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import "./LoginStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
const Login = ({ show }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setError("Email and password are required.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role;

        if (userRole === "admin") {
          navigate("/kepala");
        } else if (userRole === "kepala") {
          navigate("/kepala");
        } else {
          navigate("/home");
        }
      } else {
        setError("No such user found.");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`container ${show ? "show" : ""}`}>
      <div className="container-login">
        <div className="login-form">
          <h1 className="login-title">Login</h1>
          <div className="input-container">
            <FaUserAlt />
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <FaLock />
            <input
              type={showPassword ? "text" : "password"}
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <p className="register-link">
            Belum punya akun? <Link to="/register">Registrasi di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
