
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StyleKepala.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import {  doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
const AddKepala = ({show}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telp, setTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [error, setError] = useState("");
  const handleAdd = async () => {
    try {
      if (email.trim() === "" || password.trim() === "") {
        setError("Email and password are required.");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "users", userCredential?.user?.uid),{
        email,
        password,
        name,
        alamat,
        telp,
        userId : userCredential?.user?.uid,
        role: "kepala"
      });
      alert("Pendaftaran Berhasil Silahkan");
      navigate("/kepala")
    } catch (error) {
      setError(error.message);
      console.error("Error registering user:", error);
    }
  };

  const handeleBack = () => {
    navigate("/kepala");
  };
  return (
    <div className={`container ${show ? "show" : ""}`}>
      <div className="container-kepala">
        <div className="content">
          <div className="content-header-edit">
            <div>
              <div onClick={handeleBack} className="arrow-icon">
                <FaArrowLeftLong size={16} />
                <h3>Kembali</h3>
              </div>
              <h2>Create Kepala</h2>
            </div>
          </div>
          <div className="container-text-2">
            <div className="content-text">
              <label>Nama</label>
              <div className="text-border">
                <input
                  type="text"
                  name="nama"
                  placeholder="Masukan Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="content-text">
              <label>Email</label>
              <div className="text-border">
                <input
                  type="email"
                  name="email"
                  placeholder="Masukan Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="content-text">
              <label>Password</label>
              <div className="text-border">
                <input
                  type="password"
                  name="password"
                  placeholder="Masukan Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="content-text">
              <label>Nomer Telpon</label>
              <div className="text-border">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Masukan Nomer Telepon"
                  value={telp}
                  onChange={(e) => setTelp(e.target.value)}
                />
              </div>
            </div>
            <div className="content-text">
              <label>Alamat</label>
              <div className="text-border">
                <input
                  type="text"
                  name="address"
                  placeholder="Masukan Alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <button onClick={handleAdd} className="submit-button">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddKepala;
