import { useState } from "react";
import "./StyleMaps.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { firestore, storage } from "../../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const AddMarker = ({show}) => {
  const [addData, setAddData] = useState({
    namaKampus: "",
    alamat : "",
    status: "",
    akreditas : "",
    jumlahFakultas : "",
    berdiri : "",
    deskripsi : "",
    koordinat : null,
    imageUrl : "",
  });
  const navigate = useNavigate();
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setAddData((prevData) => ({
          ...prevData,
          koordinat: [lat,lng],
        }))
      },
    });
    return null;
  };

  const handleImageChange = async (e) => {
    const img = ref(storage, `Imgs/${v4()}`);
    const file = e.target.files[0];
    if (file) {
      try {
        const data = await uploadBytes(img, file);
        console.log("Data:", data);
        const dataImg = await getDownloadURL(data.ref);
        setAddData((prevData) => ({ ...prevData, imageUrl: dataImg }));
      } catch (error) {
        console.error("Error mengunggah gambar:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (addData) {
      try {
        let addDataAll = {...addData};
        const dataRef = collection(firestore, "dataKampus");
        await addDoc(dataRef, addDataAll)
        alert(`Data berhasil disimpan `);
        window.location.href = "/maps";
      } catch (error) {
        console.error("Error menambahkan dokumen:", error);
      }
    } else {
      alert("Silakan Lengkapi Inputan Data Kampus.");
    }
  };
  const handleBack = () => {
    navigate(`/maps`);
  }

  return (
    <div className={`container ${show ? "show" : ""}`}>
    <div className="container-maps">
      <div>
        <div onClick={handleBack} className="goBack">
          <FaArrowLeftLong size={27}/>
          <h3>Kembali</h3>
        </div>
        <div className="side-detail-add">
          <div className="card-add">
            <h3 className="card-title">Input Data Kampus</h3>
            <form className="card-form">
              <div className="form-group">
                <label className="label-input">Nama Kampus</label>
                <input
                  type="text"
                  id="namaKampus"
                  name="namaKampus"
                  placeholder="Masukkan Nama Kampus"
                  value={addData.namaKampus}
                  onChange={(e) =>
                    setAddData({ ...addData, namaKampus: e.target.value })
                  }
                  />
              </div>
              <div className="form-group">
                <label className="label-input">Alamat</label>
                <input
                  type="text"
                  id="alamat"
                  name="alamat"
                  placeholder="Masukkan Alamat"
                  value={addData.alamat}
                  onChange={(e) =>
                    setAddData({ ...addData, alamat: e.target.value })
                  }
                  />
              </div>
              <div className="form-group">
                <label className="label-input">Status</label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  placeholder="Masukkan Status"
                  value={addData.status}
                  onChange={(e) =>
                    setAddData({ ...addData, status: e.target.value })
                  }
                  />
              </div>
              <div className="form-group">
                <label className="label-input">Akreditas</label>
                <input
                  type="text"
                  id="akreditas"
                  name="akreditas"
                  placeholder="Masukkan Akreditasi"
                  value={addData.akreditas}
                  onChange={(e) =>
                    setAddData({ ...addData, akreditas: e.target.value })
                  }
                  />
              </div>
              <div className="form-group">
                <label className="label-input">Jumlah Fakultas</label>
                <input
                  type="text"
                  id="jumlahFakultas"
                  name="jumlahFakultas"
                  placeholder="Masukkan Jumlah Fakultas"
                  value={addData.jumlahFakultas}
                  onChange={(e) =>
                    setAddData({ ...addData, jumlahFakultas: e.target.value })
                  }
                  />
              </div>
              <div className="form-group">
                <label className="label-input">Berdiri</label>
                <input
                  type="text"
                  id="berdiri"
                  name="berdiri"
                  placeholder="Masukkan Tanggal Berdiri"
                  value={addData.berdiri}
                  onChange={(e) =>
                    setAddData({ ...addData, berdiri: e.target.value })
                  }
                  />
              </div>
              <div className="form-group">
                <label className="label-input">Deskripsi</label>
                <textarea
                  id="deskripsi"
                  name="deskripsi"
                  rows="3"
                  placeholder="Masukkan Deskripsi"
                  value={addData.deskripsi}
                  onChange={(e) =>
                    setAddData({ ...addData, deskripsi: e.target.value })
                  }
                  />
              </div>
              <div className="form-group">
                <label className="label-input">Koordinat</label>
                <input
                  type="text"
                  id="koordinat"
                  name="koordinat"
                  placeholder="Pilih di Maps"
                  value={addData.koordinat}
                  onChange={(e) =>
                    setAddData({ ...addData, koordinat: e.target.value })
                  }
                  />
              </div>
              <div className="form-group" style={{ width: 215 }}>
                <label htmlFor="gambar" className="label-input">
                  Gambar
                </label>
                <input
                  type="file"
                  id="gambar"
                  name="gambar"
                  onChange={handleImageChange}
                  />
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="submit-button"
                >
                Simpan
              </button>
            </form>
          </div>
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

export default AddMarker;
