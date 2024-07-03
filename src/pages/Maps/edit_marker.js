import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore, storage } from "../../firebase";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const EditMarker = ({show}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newImage, setNewImage] = useState(null);
  const [editData, setEditData] = useState({
    namaKampus: "",
    alamat : "",
    status: "",
    akreditas : "",
    jumlahFakultas : "",
    berdiri : "",
    deskripsi : "",
    koordinat : null,
    link_gambar : "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(firestore, "dataKampus", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEditData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };
    fetchData();
  }, [id]);
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setEditData((prevData) => ({
          ...prevData,
          koordinat: [lat , lng]
        }));
      },
    });
    return null;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let updatedData = { ...editData };

      if (newImage) {
        const imageRef = ref(storage, `images/${newImage.name}`);
        await uploadBytes(imageRef, newImage);
        const imgUrl = await getDownloadURL(imageRef);
        updatedData.link_gambar = imgUrl;
      }

      const markerRef = doc(firestore, "dataKampus", id);
      await updateDoc(markerRef, updatedData);
      alert("Data berhasil diperbarui");
      navigate("/maps"); // Redirect after successful update
    } catch (error) {
      console.error("Error memperbarui data:", error);
    }
  };
  const handleCancel = () => {
    navigate(`/maps`);
  };

  return (
    <div className={`container ${show ? "show" : ""}`}>
    <div className="container-maps">
      <div className="side-detail-edit">
        <h4>Edit Data</h4>
        <div className="card-edit">
          <form>
            <div className="form-group-edit">
              <label className="label-input">Nama Kampus</label>
              <input
                type="text"
                value={editData.namaKampus}
                onChange={(e) =>
                  setEditData({ ...editData, namaKampus: e.target.value })
                }
              />
            </div>
            <div className="form-group-edit">
              <label className="label-input">Alamat</label>
              <input
                type="text"
                value={editData.alamat}
                onChange={(e) =>
                  setEditData({ ...editData, alamat: e.target.value })
                }
              />
            </div>
            <div className="form-group-edit">
                <label className="label-input">Status</label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  placeholder="Masukkan Status"
                  value={editData.status}
                  onChange={(e) =>
                    setEditData({ ...editData, status: e.target.value })
                  }
                />
              </div>
              <div className="form-group-edit">
                <label className="label-input">Akreditas</label>
                <input
                  type="text"
                  id="akreditas"
                  name="akreditas"
                  placeholder="Masukkan Akreditasi"
                  value={editData.akreditas}
                  onChange={(e) =>
                    setEditData({ ...editData, akreditas: e.target.value })
                  }
                />
              </div>
              <div className="form-group-edit">
                <label className="label-input">Jumlah Fakultas</label>
                <input
                  type="text"
                  id="jumlahFakultas"
                  name="jumlahFakultas"
                  placeholder="Masukkan Jumlah Fakultas"
                  value={editData.jumlahFakultas}
                  onChange={(e) =>
                    setEditData({ ...editData, jumlahFakultas: e.target.value })
                  }
                />
              </div>
              <div className="form-group-edit">
                <label className="label-input">Berdiri</label>
                <input
                  type="text"
                  id="berdiri"
                  name="berdiri"
                  placeholder="Masukkan Tanggal Berdiri"
                  value={editData.berdiri}
                  onChange={(e) =>
                    setEditData({ ...editData, berdiri: e.target.value })
                  }
                />
              </div>
            <div className="form-group-edit">
              <label className="label-input">Deskripsi</label>
              <textarea
                value={editData.deskripsi}
                onChange={(e) =>
                  setEditData({ ...editData, deskripsi: e.target.value })
                }
              />
            </div>
            <div className="form-group-edit">
              <label className="label-input">Koordinat</label>
              <input
                type="text"
                value={editData.koordinat}
                onChange={(e) =>
                  setEditData({ ...editData, koordinatLat: e.target.value })
                }
              />
            </div>
            <div className="form-group-edit">
              <label className="label-input">Gambar</label>
              <input
                type="file"
                onChange={(e) => setNewImage(e.target.files[0])}
              />
            </div>
            <button
              onClick={handleUpdate}
              type="submit"
              className="submit-button"
            >
              Update
            </button>
            <button onClick={handleCancel} className="submit-button">
              Cancel
            </button>
          </form>
        </div>
      </div>
      <div className="container-peta-add">
        <MapContainer center={[-3.251202, 114.596658]} zoom={12}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler />
        </MapContainer>
      </div>
    </div>
    </div>
  );
};

export default EditMarker;
