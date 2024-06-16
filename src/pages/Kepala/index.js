import React, { useEffect, useState } from "react";
import "./StyleKepala.css";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { SyncLoader} from "react-spinners";
const Kepala = ({ show }) => {
  const navigate = useNavigate();
  const [dataKepala, setDataKepala] = useState("");
  const [loading, setLoading] = useState(true);
  const organizer = {
    nama: "John Putra",
    email: "john.doe@example.com",
    password: "111234567",
    phone: "083234567890",
    address: "1234 Main St, Anytown, USA",
  };

  const handleEdit = () => {
    navigate(`/kepala/edit_kepala`);
  };
  const handleAdd = () => {
    navigate("/kepala/add_kepala");
  };
  const fetchData = async () => {
    try {
      const dataRef = collection(firestore, "users");
      const q = query(dataRef, where("role", "==", "kepala")); // create a query with a condition
      const querySnapshot = await getDocs(q);
      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log("data List Kepala :", dataList);
      setDataKepala(dataList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`container ${show ? "show" : ""}`}>
      <div className="container-kepala">
        <div className="content">
          <div className="content-header">
            <div>
              <h2>Kepala</h2>
            </div>
            <div>
              <img
                className="size-img"
                alt="uniska"
                src="https://upload.wikimedia.org/wikipedia/id/6/62/Logo-uniska-ok.png"
              ></img>
            </div>
          </div>
          {loading ? (
            <div className="spinner-container">
              <SyncLoader color={"grey"} loading={loading} size={15} />
            </div>
          ) : (
            Array.isArray(dataKepala) &&
            dataKepala.map((item) => (
              <div className="container-text-2" key={item.id}>
                <div className="content-text">
                  <label>Nama</label>
                  <div className="text-area-email">
                    <h5>{item.name}</h5>
                  </div>
                </div>
                <div className="content-text">
                  <label>Email</label>
                  <div className="text-area-email">
                    <h5>{item.email}</h5>
                  </div>
                </div>
                <div className="content-text">
                  <label>Password</label>
                  <div className="text-area-email">
                    <h5>{item.role}</h5>
                  </div>
                </div>
                <div className="content-text">
                  <label>Nomer Telpon</label>
                  <div className="text-area-email">
                    <h5>{item.role}</h5>
                  </div>
                </div>
                <div className="content-text">
                  <label>Alamat</label>
                  <div className="text-area-email">
                    <h5>{item.role}</h5>
                  </div>
                </div>
              </div>
            ))
          )}
          <div>
            <button onClick={handleEdit} className="submit-button">
              Edit
            </button>
            <button onClick={handleEdit} className="submit-button">
              Delete
            </button>
            {dataKepala ? (
              <button onClick={handleAdd} className="submit-button">
                Add
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kepala;
