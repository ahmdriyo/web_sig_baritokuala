import React, { useEffect, useState } from "react";
import "./StyleMaps.css";
import "leaflet/dist/leaflet.css";

import { FaCirclePlus } from "react-icons/fa6";
import { TbFileReport } from "react-icons/tb";
import { MapContainer, Marker, TileLayer, Popup, GeoJSON } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { Icon } from "leaflet";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
// import geos from './BaritoKuala.geojson';
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
  const [peran, setPeran] = useState("");
  // const [geoJsonBarito, setGeoJsonBarito] = useState("");
  const { currentUser } = useAuth();
  const [isSatellite, setIsSatellite] = useState(true);

  const DataGeoJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          GID_2: "IDN.13.5_1",
          GID_0: "IDN",
          COUNTRY: "Indonesia",
          GID_1: "IDN.13_1",
          NAME_1: "KalimantanSelatan",
          NL_NAME_1: "NA",
          NAME_2: "BaritoKuala",
          VARNAME_2: "NA",
          NL_NAME_2: "NA",
          TYPE_2: "Kabupaten",
          ENGTYPE_2: "Regency",
          CC_2: "6304",
          HASC_2: "ID.KS.BK",
        },
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [114.4979, -3.4236],
                [114.5126, -3.4607],
                [114.5119, -3.4693],
                [114.5153, -3.4965],
                [114.5117, -3.5362],
                [114.509, -3.5447],
                [114.4852, -3.5002],
                [114.4811, -3.5029],
                [114.4451, -3.5029],
                [114.4439, -3.5042],
                [114.4306, -3.5015],
                [114.4279, -3.4966],
                [114.4266, -3.4981],
                [114.4203, -3.4959],
                [114.4179, -3.4942],
                [114.4175, -3.4918],
                [114.4159, -3.4934],
                [114.4078, -3.4889],
                [114.4062, -3.4859],
                [114.4014, -3.4854],
                [114.3973, -3.4815],
                [114.3942, -3.4823],
                [114.3933, -3.4804],
                [114.3898, -3.4806],
                [114.3879, -3.4781],
                [114.3821, -3.4757],
                [114.3825, -3.4736],
                [114.3789, -3.4755],
                [114.3634, -3.4685],
                [114.3649, -3.4648],
                [114.3596, -3.4655],
                [114.3489, -3.4618],
                [114.3536, -3.4426],
                [114.3492, -3.4408],
                [114.3469, -3.4363],
                [114.3476, -3.426],
                [114.3463, -3.4194],
                [114.3483, -3.4166],
                [114.3529, -3.4152],
                [114.3555, -3.4108],
                [114.3589, -3.3864],
                [114.3505, -3.3688],
                [114.3463, -3.3513],
                [114.3685, -3.326],
                [114.3716, -3.3204],
                [114.3716, -3.3076],
                [114.3798, -3.3004],
                [114.3835, -3.2675],
                [114.4028, -3.252],
                [114.4066, -3.2573],
                [114.421, -3.2478],
                [114.4366, -3.2182],
                [114.4502, -3.21],
                [114.4375, -3.1914],
                [114.4294, -3.1743],
                [114.4454, -3.1621],
                [114.4538, -3.15],
                [114.4563, -3.143],
                [114.5458, -3.0678],
                [114.4962, -3.015],
                [114.5056, -3.0014],
                [114.5067, -2.9976],
                [114.5462, -2.9474],
                [114.5241, -2.9268],
                [114.5416, -2.9239],
                [114.5678, -2.8664],
                [114.6073, -2.8874],
                [114.6177, -2.8834],
                [114.5987, -2.8155],
                [114.635, -2.8053],
                [114.6615, -2.8022],
                [114.6662, -2.7993],
                [114.6789, -2.7817],
                [114.6798, -2.7736],
                [114.6784, -2.7679],
                [114.6731, -2.7611],
                [114.6712, -2.7521],
                [114.6777, -2.7395],
                [114.6832, -2.7367],
                [114.6911, -2.7354],
                [114.7066, -2.7403],
                [114.7183, -2.7401],
                [114.7334, -2.7342],
                [114.7514, -2.7241],
                [114.7604, -2.7213],
                [114.7714, -2.6971],
                [114.7864, -2.6835],
                [114.7907, -2.67],
                [114.7934, -2.6512],
                [114.7917, -2.6305],
                [114.7927, -2.6146],
                [114.7968, -2.5923],
                [114.8023, -2.5831],
                [114.8066, -2.5791],
                [114.837, -2.5587],
                [114.8517, -2.5296],
                [114.8604, -2.5216],
                [114.8616, -2.5241],
                [114.8541, -2.5452],
                [114.8042, -2.7423],
                [114.8116, -2.8069],
                [114.8403, -2.8707],
                [114.8153, -2.93],
                [114.8026, -2.9406],
                [114.8023, -2.9434],
                [114.8044, -2.9683],
                [114.8086, -2.9745],
                [114.8072, -2.9778],
                [114.8151, -2.99],
                [114.8148, -3.0071],
                [114.8241, -3.0111],
                [114.8275, -3.0151],
                [114.8314, -3.1287],
                [114.8217, -3.189],
                [114.8226, -3.1993],
                [114.8109, -3.2011],
                [114.792, -3.1777],
                [114.79, -3.2016],
                [114.7864, -3.2143],
                [114.7895, -3.2203],
                [114.7822, -3.2253],
                [114.7796, -3.2297],
                [114.7757, -3.2302],
                [114.7682, -3.2269],
                [114.7634, -3.2325],
                [114.7534, -3.2347],
                [114.7044, -3.2536],
                [114.6913, -3.2559],
                [114.6395, -3.2748],
                [114.6354, -3.2728],
                [114.6326, -3.2778],
                [114.6263, -3.2799],
                [114.6236, -3.2859],
                [114.6158, -3.2814],
                [114.6096, -3.2803],
                [114.606, -3.2809],
                [114.6063, -3.2863],
                [114.6011, -3.2894],
                [114.5967, -3.2875],
                [114.5951, -3.2816],
                [114.5921, -3.279],
                [114.583, -3.2736],
                [114.5771, -3.277],
                [114.5752, -3.2701],
                [114.5681, -3.2683],
                [114.566, -3.2725],
                [114.5673, -3.2993],
                [114.5646, -3.3104],
                [114.5526, -3.3342],
                [114.5427, -3.3439],
                [114.5338, -3.3417],
                [114.5237, -3.3528],
                [114.5286, -3.3554],
                [114.5108, -3.3792],
                [114.5064, -3.3901],
                [114.5023, -3.3893],
                [114.4969, -3.4142],
                [114.4979, -3.4236],
              ],
            ],
          ],
        },
      },
    ],
  };
  const handleToggleMapType = () => {
    setIsSatellite(!isSatellite);
  };

  // useEffect(() => {
  //   fetch(geos)
  //     .then((response) => response.json())
  //     .then((data) => setGeoJsonBarito(data))
  //     .catch((error) => console.error("Error fetching GeoJSON data:", error));

  // }, []);
  // const setColor = ({ properties }) => {
  //   return { weight: 1 };
  // };
  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(
            doc(firestore, "pengguna", currentUser.uid)
          );
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setPeran(userData);
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
      pathname: "/report",
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
  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiaXlvb285OCIsImEiOiJjbHg3Z3QzdTIweno0MmtzY25sN3VqczN1In0.d4DBhHPhV_GkB_iAXIoa8A";
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
                  src={selectedMarker.link_gambar}
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
                Jumlah Fakultas: <p>{selectedMarker.jumlahFakultas}</p>
              </h4>
              <h4>
                Berdiri: <p>{selectedMarker.berdiri}</p>
              </h4>
              <h4 className="card-container">
                Deskripsi: <p>{selectedMarker.deskripsi}</p>
              </h4>
              {peran.peran === "kepala" ? (
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
            <MapContainer center={[-3.251202, 114.596658]} zoom={10}>
              {isSatellite ? (
                <TileLayer
                  attribution='&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
                  url={`https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`}
                />
              ) : (
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              )}
              <GeoJSON data={DataGeoJson} />
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
                            src={item.link_gambar}
                            alt={item.namaKampus}
                          />
                        </div>
                        <div className="text-popup">
                          <label className="nama-popup">
                            {truncateText(item.namaKampus, maxLength)}
                          </label>
                          <label className="alamat-popup">
                            {truncateText(item.alamat, maxLength)}
                          </label>
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
          {peran.peran === "kepala" ? (
            <div className="container-button">
              <button onClick={handleAddClick} className="button-add">
                Tambah Marker
                <FaCirclePlus className="icon-plus" />
              </button>
              <button onClick={handleReportClick} className="button-report">
                Report
                <TbFileReport className="icon-plus" />
              </button>
              <button className="button-report" onClick={handleToggleMapType}>
                {isSatellite
                  ? "Switch to OpenStreetMap"
                  : "Switch to Satellite"}
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
