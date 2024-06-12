import { useState } from "react";
import "./StyleMaps.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { firestore, storage } from "../../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
const AddMarker = () => {
  const [koordinat, setKoordinat] = useState(null);
  const [namaKampus, setNamaKampus] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [alamat, setAlamat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setKoordinat([lat, lng]);
      },
    });
    console.log(koordinat)
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
        console.log("Url:", dataImg);
        setImageUrl(dataImg);
      } catch (error) {
        console.error("Error mengunggah gambar:", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (imageUrl && namaKampus && alamat && deskripsi && koordinat) {
      try {
        const dataRef = collection(firestore, "dataKampus");
        await addDoc(dataRef, {
          namaKampus: namaKampus,
          alamat: alamat,
          deskripsi: deskripsi,
          koordinat: koordinat,
          imgUrl: imageUrl,
        });
        alert(`Data berhasil disimpan `);
        window.location.href = '/maps';
        setAlamat("");
        setDeskripsi("");
        setNamaKampus("");
        setKoordinat("");
        setImageUrl(undefined);
      } catch (error) {
        console.error("Error menambahkan dokumen:", error);
      }
    } else {
      alert("Silakan Lengkapi Inputan Data Kampus.");
    }
  };

  return (
    <div className="container-maps">
      <div className="side-detail">
        <div className="card">
          <h3 className="card-title">Input Data Kampus</h3>
          <form className="card-form">
            <div className="form-group">
              <label className="label-input">Nama Kampus</label>
              <input
                type="text"
                id="namaKampus"
                name="namaKampus"
                placeholder="Masukkan Nama Kampus"
                value={namaKampus}
                onChange={(e) => setNamaKampus(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="label-input">Alamat</label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                placeholder="Masukkan Alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="label-input">Deskripsi</label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                rows="3"
                placeholder="Masukkan Deskripsi"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label className="label-input">Koordinat</label>
              <input
                type="text"
                id="koordinat"
                name="koordinat"
                placeholder="Masukkan koordinat"
                value={koordinat}
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
                onChange={(e) => handleImageChange(e)}
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
      <div>
        <MapContainer center={[-3.251202, 114.596658]} zoom={12}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler />
        </MapContainer>
      </div>
    </div>
  );
};

export default AddMarker;
