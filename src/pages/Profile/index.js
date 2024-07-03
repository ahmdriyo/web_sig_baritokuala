import React, { useEffect, useState } from "react";
import "./StyleProfile.css";
import { useAuth } from "../../auth/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase";
const Profile = ({ show }) => {
  const { currentUser } = useAuth();
  const [dataUser, setDataUser] = useState("");
  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(
            doc(firestore, "pengguna", currentUser.uid)
          );
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setDataUser(userData);
            console.log("pengguna",userData)
          } else {
            console.log("Someone not found.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserRole();
  }, [currentUser]);
  return (
    <div className={`container ${show ? "show" : ""}`}>
      <div className="container-profile">
        <div className="container-text-2" key={dataUser.userId}>
          <div className="content-text">
            <label>Nama</label>
            <div className="text-area-email">
              <h5>{dataUser.nama_panjang}</h5>
            </div>
          </div>
          <div className="content-text">
            <label>Email</label>
            <div className="text-area-email">
              <h5>{dataUser.email}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
