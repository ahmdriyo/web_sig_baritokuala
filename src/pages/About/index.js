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
        
      <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default About