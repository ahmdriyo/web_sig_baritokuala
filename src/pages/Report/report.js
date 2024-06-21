import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "../../firebase";
import ReactToPrint from "react-to-print";
import { FaPrint } from "react-icons/fa";
import "./Report.css";
import { Tooltip } from "react-tooltip";
const Report = ({ show }) => {
  const [dataKampus, setDataKampus] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

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
      console.error("Error fetching data:", error);
    }
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
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
      <div className="container-maps">
        <div className="side-detail">
          <h4>Detail Kampus</h4>
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
                Lokasi: <p>{selectedMarker.alamat}</p>
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
          <div>
            <ReactToPrint
              trigger={() => (
                <button
                  className="button-print"
                  data-tooltip-id="print-tooltip"
                  data-tooltip-content="print"
                >
                  <FaPrint size={23} style={{ marginTop: 5 }} />
                  <Tooltip id="print-tooltip" />
                </button>
              )}
              content={() => document.getElementsByClassName("container-maps")[0]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
