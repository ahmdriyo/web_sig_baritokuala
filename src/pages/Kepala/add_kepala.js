import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StyleKepala.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore, storage } from "../../firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
const AddKepala = ({ show }) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telp, setTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");



  const handleImageChange = async (e) => {
    const img = ref(storage, `Imgs/${v4()}`);
    const file = e.target.files[0];
    if (file) {
      try {
        const data = await uploadBytes(img, file);
        // console.log("Data:", data);
        const dataImg = await getDownloadURL(data.ref);
        setImageUrl((prevData) => ({ ...prevData, dataImg }));
      } catch (error) {
        console.error("Error mengunggah gambar:", error);
      }
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (email.trim() === "" || password.trim() === "") {
        setError("Email and password are required.");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(firestore, "users", userCredential?.user?.uid), {
        email,
        password,
        fullName,
        alamat,
        telp,
        imageUrl,
        userId: userCredential?.user?.uid,
        role: "kepala",
      });
      await signOut(auth);
      navigate('/login')
      alert("Pendaftaran Berhasil Silahkan Login Kepala");

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
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
            <div className="content-text">
              <label htmlFor="gambar">Gambar</label>
              <div className="text-border">
                <input
                  type="file"
                  id="gambar"
                  name="gambar"
                  style={{ paddingTop: 15 }}
                  onChange={handleImageChange}
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
