import React, { useEffect, useState } from "react";
import "./StyleMaps.css";
import "leaflet/dist/leaflet.css";
import { FaCirclePlus } from "react-icons/fa6";
import { TbFileReport } from "react-icons/tb";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { Icon } from "leaflet";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { Tooltip } from "react-tooltip";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useAuth } from "../../auth/AuthContext";
const Maps = ({ show }) => {
  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate("/maps/add_marker");
  };
  const [dataKampus, setDataKampus] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [role, setRole] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(
            doc(firestore, "users", currentUser.uid)
          );
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setRole(userData);
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
  const fetchData = async () => {
    try {
      const dataRef = collection(firestore, "dataKampus");
      const querySnapshot = await getDocs(dataRef);
      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataKampus(dataList);
    } catch (error) {
      console.error("Error mengambil data:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "dataKampus", id));
      fetchData();
      setSelectedMarker(null);
    } catch (error) {
      console.error("Error menghapus dokumen:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleMarkerClick = (marker) => {
    // console.log("Data", marker);
    setSelectedMarker(marker);
  };
  const handleEditClick = (id) => {
    navigate(`/maps/edit_marker/${id}`);
  };
  const handleReportClick = () => {
    navigate({
      pathname: "/report"
    });

  };
  const customIcon = new Icon({
    iconUrl: require("../../assets/iconLocation.png"),
    iconSize: [35, 35],
  });

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const maxLength = 12;
  return (
    <div className={`container ${show ? "show" : ""}`}>
      <div className={"container-maps"}>
        <div className="side-detail">
          <h4>Detail kampus</h4>
          {selectedMarker ? (
            <div className="card">
              <div className="container-img">
                <img
                  className="size-img"
                  src={selectedMarker.imageUrl}
                  alt={selectedMarker.namaKampus}
                />
              </div>
              <h4>
                Nama Kampus: <p>{selectedMarker.namaKampus}</p>
              </h4>
              <h4>
                Lokasi: <p>{selectedMarker.alamat} </p>
              </h4>
              <h4>
                Status: <p>{selectedMarker.status}</p>
              </h4>
              <h4>
                Akreditasi: <p>{selectedMarker.akreditas}</p>
              </h4>
              <h4>
                Jumlah Fakultas: <p>{selectedMarker.jumlahFakultas}</p>{" "}
              </h4>
              <h4>
                Berdiri: <p>{selectedMarker.berdiri}</p>
              </h4>
              <h4>
                Deskripsi: <p>{selectedMarker.deskripsi}</p>
              </h4>
              {role.role === "kepala" ? (
                <div className="content-btn">
                  <div>
                    <span
                      data-tooltip-id="edit-tooltip"
                      data-tooltip-content="Edit"
                      onClick={() => handleEditClick(selectedMarker.id)}
                    >
                      <FaEdit className="edit-button" size={23} color="green" />
                    </span>
                    <Tooltip id="edit-tooltip" />
                  </div>
                  <div>
                    <span
                      data-tooltip-id="hapus-tooltip"
                      data-tooltip-content="Hapus"
                      onClick={() => handleDelete(selectedMarker.id)}
                    >
                      <MdDeleteForever
                        className="delete-button"
                        size={23}
                        color="red"
                      />
                    </span>
                    <Tooltip id="hapus-tooltip" />
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <div className="second-card">
              <p>Kampus Tidak Tersedia</p>
              <label>Pilih Marker terlebih dahulu</label>
            </div>
          )}
        </div>
        <div>
          <div className="container-peta">
            <MapContainer center={[-3.251202, 114.596658]} zoom={12}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {Array.isArray(dataKampus) &&
                dataKampus.map((item) => (
                  <Marker
                    key={item.id}
                    position={item.koordinat}
                    icon={customIcon}
                    // Panggil fungsi ketika marker diklik
                  >
                    <Popup>
                      <div className="container-popup">
                        <div className="img-popup">
                          <img
                            className="size-img-popup"
                            src={item.imageUrl}
                            alt={item.namaKampus}
                          />
                        </div>
                        <div className="text-popup">
                          <label className="nama-popup">
                            {truncateText(item.namaKampus, maxLength)}
                          </label>
                          <label className="alamat-popup">{item.alamat}</label>
                          <button
                            className="button-popup"
                            onClick={() => handleMarkerClick(item)}
                          >
                            Cek Detail
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
          {role.role === "kepala" ? (
            <div className="container-button">
              <button onClick={handleAddClick} className="button-add">
                Tambah Marker
                <FaCirclePlus className="icon-plus" />
              </button>
              <button onClick={handleReportClick} className="button-report">
                Report
                <TbFileReport className="icon-plus" />
              </button>
            </div>
          ) : (
            <></>
          )}          
        </div>
      </div>
    </div>
  );
};

export default Maps;
