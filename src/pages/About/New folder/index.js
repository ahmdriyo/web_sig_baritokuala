import React from 'react'
import './AboutStyle.css'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const About = ({show}) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect ke halaman login setelah logout berhasil
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className={`container ${show ? "show" : ""}`}>
      <div className='container-about'>
        <h1 className="title">Pemanfaatan Augmented Reality pada Sistem Informasi Geografis Kampus Barito Kuala</h1>
        <p className="description">
          Augmented Reality (AR) adalah teknologi yang menggabungkan dunia nyata dengan elemen-elemen digital yang 
          memungkinkan pengguna untuk melihat informasi tambahan di lingkungan nyata melalui perangkat seperti smartphone atau kacamata AR. 
          Pada Sistem Informasi Geografis (SIG) Kampus Barito Kuala, AR digunakan untuk memberikan informasi visual 
          yang lebih interaktif dan informatif kepada pengguna mengenai lokasi-lokasi penting di kampus.
        </p>
        <h2 className="members-title">Anggota Kelompok</h2>
        <ul className="members-list">
          <li>Ahmad Jaini (2210010042)</li>
          <li>Muhammad Azhar M. (2210010161)</li>
          <li>Muhammad Huda Mauladi (2210010165)</li>
          <li>Ahmad Riyo Kusuma (2210010085)</li>
          <li>Muhammad Maulana Saputra (2210010682)</li>
          <li>Muhammad Yusuf Karimi (2210010339)</li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default About;
