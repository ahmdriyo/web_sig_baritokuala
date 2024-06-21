import React, { useEffect, useState } from "react";
import "./StyleKepala.css";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import { SyncLoader } from "react-spinners";
import { useAuth } from "../../auth/AuthContext";
const Kepala = ({ show }) => {
  const navigate = useNavigate();
  const [dataKepala, setDataKepala] = useState("");
  const [loading, setLoading] = useState(true);
  const { role } = useAuth();
  const handleEdit = (id) => {
    navigate(`/kepala/edit_kepala/${id}`);
  };
  const handleAdd = () => {
    navigate("/kepala/add_kepala");
  };
  const fetchData = async () => {
    try {
      const dataRef = collection(firestore, "users");
      const q = query(dataRef, where("role", "==", "kepala"));
      const querySnapshot = await getDocs(q);
      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataKepala(dataList);
      // console.log("datalist", dataList);
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
          {loading ? (
            <div className="spinner-container">
              <SyncLoader color={"grey"} loading={loading} size={15} />
            </div>
          ) : Array.isArray(dataKepala) && dataKepala.length > 0 ? (
            dataKepala.map((item) => (
              <>
                <div className="content-header">
                  <div>
                    <h2>Kepala</h2>
                  </div>
                  <div>
                    <img
                      className="size-img-kepala"
                      alt="uniska"
                      src={item?.imageUrl?.dataImg}
                    ></img>
                  </div>
                </div>
                <div className="container-text-2" key={item.id}>
                  <div className="content-text">
                    <label>Nama</label>
                    <div className="text-area-email">
                      <h5>{item.fullName}</h5>
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
                      <h5>{item.password}</h5>
                    </div>
                  </div>
                  <div className="content-text">
                    <label>Nomer Telpon</label>
                    <div className="text-area-email">
                      <h5>{item.telp}</h5>
                    </div>
                  </div>
                  <div className="content-text">
                    <label>Alamat</label>
                    <div className="text-area-email">
                      <h5>{item.alamat}</h5>
                    </div>
                  </div>
                </div>
                {role === "admin" ? (
                  <div>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="submit-button"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ))
          ) : (
            <div>
              <h3>Kepala Kosong</h3>
              <button onClick={handleAdd} className="submit-button">
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Kepala;
