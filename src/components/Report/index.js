// src/components/Report.js
import React from "react";
import "./Report.css";

const Report = React.forwardRef(({ dataKampus, mapContainerRef }, ref) => {
  return (
    <div ref={ref}>
      <h2>Laporan Kampus</h2>
      <div ref={mapContainerRef} />
      {dataKampus.map((kampus) => (
        <div key={kampus.id} className="report-item">
          <h3>{kampus.namaKampus}</h3>
          <p>Lokasi: {kampus.alamat}</p>
          <p>Status: {kampus.status}</p>
          <p>Akreditasi: {kampus.akreditas}</p>
          <p>Jumlah Fakultas: {kampus.jumlahFakultas}</p>
          <p>Berdiri: {kampus.berdiri}</p>
          <p>Deskripsi: {kampus.deskripsi}</p>
        </div>
      ))}
    </div>
  );
});

export default Report;
