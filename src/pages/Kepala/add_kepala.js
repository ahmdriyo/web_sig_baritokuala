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
  const [nama_panjang, setNama_panjang] = useState("");
  const [email, setEmail] = useState("");
  const [kata_sandi, setKata_sandi] = useState("");
  const [telp, setTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [error, setError] = useState("");
  
  
  
  const [link_gambar, setLink_gambar] = useState(null);
  
  const handleImageChange = async (e) => {
    const img = ref(storage, `Imgs/${v4()}`);
    console.log("img:", img);

    const file = e.target.files[0];
    console.log("file:", file);

    if (file) {
      try {
        const data = await uploadBytes(img, file);
        console.log("Data:", data.ref);
        const dataImg = await getDownloadURL(data.ref);
        setLink_gambar(dataImg);
        console.log("data link ", dataImg)

      } catch (error) {
        console.error("Error mengunggah gambar:", error);
      }
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      if (email.trim() === "" || kata_sandi.trim() === "") {
        setError("Email and kata sandi are required.");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        kata_sandi
      );
      await setDoc(doc(firestore, "pengguna", userCredential?.user?.uid), {
        email,
        kata_sandi,
        nama_panjang,
        alamat,
        telp,
        link_gambar,
        id_kepala: userCredential?.user?.uid,
        peran: "kepala",
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
                  value={nama_panjang}
                  onChange={(e) => setNama_panjang(e.target.value)}
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
                  value={kata_sandi}
                  onChange={(e) => setKata_sandi(e.target.value)}
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
