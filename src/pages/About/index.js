import React from "react";
import { FaReact } from "react-icons/fa";
import { SiOpenstreetmap } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { SiJavascript } from "react-icons/si";
import { SiLeaflet } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import "./AboutStyle.css";
import { Tooltip } from "react-tooltip";
const About = ({ show }) => {
  return (
    <div className={`container ${show ? "show" : ""}`}>
      <div className="container-about">
        <div className="content-about">
          <div className="text-pm">
            <h2>
              Pemanfaatan Augmented Reality Pada Sistem Informasi Geografis
              Kampus Di Barito Kuala
            </h2>
            <p>
              Tujuan dari proyek ini adalah untuk membuat sebuah situs web
              interaktif yang dapat menampilkan lokasi kampus-kampus di sekitar
              Barito Kuala pada sebuah peta. Pengguna dapat melihat marker yang
              menunjukkan lokasi kampus. Ketika marker tersebut diklik, akan
              muncul detail informasi mengenai kampus yang dipilih.
            </p>
          </div>
          <div>
            <h4>Teknologi yang Kami gunakan</h4>
            <div>
              <div className="icons-tekno">
                <span data-tooltip-id="tooltip" data-tooltip-content="JavaScript">
                  <SiJavascript className="icon-tekno" size={45} />
                </span>
                <span data-tooltip-id="tooltip" data-tooltip-content="React Js">
                  <FaReact className="icon-tekno" size={45} />
                </span>
                <span data-tooltip-id="tooltip" data-tooltip-content="Express">
                  <SiExpress className="icon-tekno" size={45} />
                </span>
                <span data-tooltip-id="tooltip" data-tooltip-content="Node Js">
                  <FaNodeJs className="icon-tekno" size={45} />
                </span>
                <span data-tooltip-id="tooltip" data-tooltip-content="Leaflet">
                  <SiLeaflet className="icon-tekno" size={45} />
                </span>
                <span data-tooltip-id="tooltip" data-tooltip-content="Openstreetmap">
                  <SiOpenstreetmap className="icon-tekno" size={45}/>
                </span>
                <span data-tooltip-id="tooltip" data-tooltip-content="Firebase">
                  <IoLogoFirebase className="icon-tekno" size={45} />
                </span>
                <Tooltip id="tooltip" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="members-title">Anggota Kelompok</h2>
            <ul className="members-list">
              <li>Ahmad Jaini (2210010042)</li>
              <li>Muhammad Azhar M. (2210010161)</li>
              <li>Muhammad Huda Mauladi (2210010165)</li>
              <li>Ahmad Riyo Kusuma (2210010085)</li>
              <li>Muhammad Maulana Saputra (2210010682)</li>
              <li>Muhammad Yusuf Karimi (2210010339)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
