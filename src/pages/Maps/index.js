import { useEffect, useState } from "react";
import "./StyleMaps.css";
import "leaflet/dist/leaflet.css";
import { FaCirclePlus } from "react-icons/fa6";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { Icon } from "leaflet";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase";
const Maps = () => {
  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate("/maps/add_marker");
  };

  const [dataKampus, setDataKampus] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  

  const fetchData = async () => {
    try {
      const dataRef = collection(firestore, "dataKampus");
      const querySnapshot = await getDocs(dataRef);
      const dataList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("data List :", dataList);
      setDataKampus(dataList);
    } catch (error) {
      console.error("Error mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleMarkerClick = (marker) => {
    console.log("Data",marker)
    setSelectedMarker(marker);
  };

  const customIcon = new Icon({
    iconUrl: require("../../assets/iconLocation.png"),
    iconSize: [35, 35],
  });

  return (
    <div className="container-maps">
    <div className="side-detail">
      {selectedMarker && ( // Hanya tampilkan card jika marker telah dipilih
        <div className="card">
          <p>{selectedMarker.namaKampus}</p>
          <p>{selectedMarker.alamat}</p>
          <p>{selectedMarker.deskripsi}</p>
          <img
            className="size-img"
            src={selectedMarker.imgUrl}
            alt={selectedMarker.namaKampus}
          />
        </div>
      )}
    </div>
    <div>
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
              <Popup>{item.namaKampus}
                <button onClick={() => handleMarkerClick(item)}>klik</button>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
      <div className="container-button">
        <button onClick={handleAddClick} className="button-add">
          Add
          <FaCirclePlus />
        </button>
      </div>
    </div>
  </div>
  );
};

export default Maps;
