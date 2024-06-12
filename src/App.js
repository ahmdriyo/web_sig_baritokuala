import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import "./index.css";
import { FaHome } from "react-icons/fa";
import { IoMapSharp, IoInformationCircle } from "react-icons/io5";
import { IoIosPerson } from "react-icons/io";
import Home from "./pages/Home/index";
import Maps from "./pages/Maps/index";
import Kepala from "./pages/Kepala/index";
import About from "./pages/About/index";
import AddMarker from "./pages/Maps/add_marker";

function App() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container">
      <Router>
        <div className={`App ${show ? "show" : ""}`}>
        <nav className="navbar">
          {/* HamburgerMenu */}
            <div
              className="navbar-toggler"
              onClick={show ? handleClose : handleShow}
            >
              <TiThMenu />
            </div>
            <PageTitle />
            <div className="navbar-brand">Login</div>
          </nav>
          {/* Akhir HamburgerMenu  */}
          {/* Router */}
          <div className="container">
            <Routes>
              <Route path="/" element={<Home to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/maps" element={<Maps />} />
              <Route path="/kepala" element={<Kepala />} />
              <Route path="/about" element={<About />} />
              <Route path="/maps/add_marker" element={<AddMarker />} />
            </Routes>
          </div>
          {/* Akhir Router */}
          {/* Sidebar */}
          <div className={`offcanvas ${show ? "show" : ""}`}>
            <div className="offcanvas-header">
              <div className="offcanvas-title">
                <p>Menu</p>
              </div>
            </div>
            <div className="offcanvas-body">
              <Link className="nav-link" to="/home">
                <div className="icon-menu">
                  <FaHome />
                </div>
                Home
              </Link>
              <Link className="nav-link" to="/maps">
                <div className="icon-menu">
                  <IoMapSharp />
                </div>
                Maps
              </Link>
              <Link className="nav-link" to="/kepala">
                <div className="icon-menu">
                  <IoIosPerson />
                </div>
                Kepala
              </Link>
              <Link className="nav-link" to="/about">
                <div className="icon-menu">
                  <IoInformationCircle />
                </div>
                About
              </Link>
            </div>
            {/* Akhir Sidebar */}
          </div>
        </div>
      </Router>
    </div>
  );
}

function PageTitle() {
  const location = useLocation();
  let title = "";

  switch (location.pathname) {
    case "/home":
      title = "Home";
      break;
    case "/maps":
      title = "Maps";
      break;
    case "/kepala":
      title = "Kepala";
      break;
    case "/about":
      title = "About";
      break;
    default:
      title = "Home";
  }

  return <div className="navbar-brand">{title}</div>;
}

export default App;
