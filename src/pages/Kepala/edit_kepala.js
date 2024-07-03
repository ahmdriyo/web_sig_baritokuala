import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StyleKepala.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {firestore } from "../../firebase";
import axios from "axios";

const EditKepala = ({ show }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nama_panjang, setNama_panjang] = useState("");
  const [email, setEmail] = useState("");
  const [kata_sandi, setKata_sandi] = useState("");
  const [telp, setTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRef = collection(firestore, "pengguna");
        const q = query(dataRef, where("peran", "==", "kepala"));
        const querySnapshot = await getDocs(q);
        const dataObject = querySnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data();
          return acc;
        }, {});
        console.log("Data:", dataObject);
        const dataKepala = querySnapshot.docs[0]?.data();
        if (dataKepala) {
          setNama_panjang(dataKepala.nama_panjang);
          setEmail(dataKepala.email);
          setTelp(dataKepala.telp);
          setAlamat(dataKepala.alamat);
          setKata_sandi(dataKepala.kata_sandi);
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Attempting to update document with id:", id);
    try {
      const docRef = doc(firestore, "pengguna", id);
      await updateDoc(docRef, {
        nama_panjang,
        email,
        telp,
        alamat,
      });
      alert("Data updated successfully");
      navigate("/kepala");
    } catch (error) {
      setError(error.message);
      console.error("Error updating document:", error);
    }
  };

  const handleDelete = async () => {
    console.log("Attempting to delete user with id:", id);
    try {
      const docRef = doc(firestore, "pengguna", id);
      await deleteDoc(docRef);
      const response = await axios.delete("http://localhost:5000/deleteKepala", {
        data: { uid: id },
      });
      alert(response.data.message);
      navigate("/kepala");
    } catch (error) {
      console.error("Error deleting user:", error);
      setError(error.response ? error.response.data.message : error.message);
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
            <button
              type="submit"
              onClick={handleUpdate}
              className="submit-button"
            >
              Save
            </button>
            <button onClick={() => handleDelete()} className="submit-button">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditKepala;
