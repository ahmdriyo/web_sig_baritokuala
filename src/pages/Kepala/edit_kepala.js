import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StyleKepala.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
const EditKepala = ({show}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telp, setTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(firestore, "users", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Data :",data)
          setName(data.name);
          setEmail(data.email);
          setTelp(data.telp);
          setAlamat(data.alamat);
          setCurrentPassword(data.password); 
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      if (email.trim() === "" || password.trim() === "") {
        setError("Email and password are required.");
        return;
      }
      const user = auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, password);
      }
      const docRef = doc(firestore, "users", id);
      await updateDoc(docRef, {
        name,
        email,
        telp,
        alamat,
        password,
      });

      alert("Data updated successfully");
      navigate("/kepala");
    } catch (error) {
      setError(error.message);
      console.error("Error updating document:", error);
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
              <h2>Kepala</h2>
            </div>
            <div>
              {/* <img className="size-img" alt="uniska" src={.src}></img> */}
            </div>
          </div>
          <div className="container-text-2">
            <div className="content-text">
              <label>Nama</label>
              <div className="text-border">
                <input
                  type="text"
                  name="nama"
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
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <button onClick={handleUpdate} className="submit-button">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditKepala;
