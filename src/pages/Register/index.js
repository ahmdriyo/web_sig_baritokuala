import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import "./RegisterStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { auth, firestore } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
const Register = ({ show }) => {
  const [nama_panjang, setNama_panjang] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (email.trim() === "" || password.trim() === "") {
        setError("Email and password are required.");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "pengguna", userCredential?.user?.uid),{
        email,
        nama_panjang,
        id_pengunjung : userCredential?.user?.uid,
        peran: "pengunjung"
      });
      setNama_panjang("");
      setEmail("");
      setPassword("");
      setError("");

      alert("Pendaftaran Berhasi");
      navigate("/home")
    } catch (error) {
      setError(error.message);
      console.error("Error registering user:", error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`container ${show ? "show" : ""}`}>
      <div className="container-register">
        <div className="register-form">
          <h1 className="register-title">Register</h1>
          <div className="input-container">
            <FaUserAlt />
            <input
              type="text"
              className="register-input"
              placeholder="Full Name"
              value={nama_panjang}
              onChange={(e) => setNama_panjang(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <MdEmail />
            <input
              type="email"
              className="register-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <FaLock />
            <input
              type={showPassword ? "text" : "password"}
              className="register-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <button className="register-button" onClick={handleRegister}>
            Register
          </button>
          <p className="register-link">
            Sudah punya akun? <Link to="/login">login di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
