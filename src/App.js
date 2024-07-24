import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home/index";
import Maps from "./pages/Maps/index";
import Kepala from "./pages/Kepala/index";
import About from "./pages/About/index";
import AddMarker from "./pages/Maps/add_marker";
import EditMarker from "./pages/Maps/edit_marker";
import EditKepala from "./pages/Kepala/edit_kepala";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import { AuthProvider } from "./auth/AuthContext";
import RoleRoute from "./Routes/RoleRoute";
import AddKepala from "./pages/Kepala/add_kepala";
import Profile from "./pages/Profile";
import NotFound from "./components/NotFound";
import Report from "./pages/Report/report";
function App() {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setShow(false);
      } else {
        setShow(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    document.title = "Web Pencarian Kampus di Batola";
  }, []);
  return (
    <AuthProvider>
      <div className="container">
        <Router>
          <Navbar
            show={show}
            handleShow={handleShow}
            handleClose={handleClose}
          />
          <div className="container">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/login" element={<Login show={show} />} />
              <Route path="/register" element={<Register show={show} />} />
              <Route path="/notFound" element={<NotFound show={show} />} />
              <Route path="/home" element={<Home show={show} />} />
              <Route path="/maps" element={<Maps show={show} />} />
              <Route path="/report" element={<Report show={show} />} />
              <Route path="/about" element={<About show={show}/>} />
              <Route element={<RoleRoute allowedRoles={["pengunjung"]} />}>
                <Route path="/profile" element={<Profile show={show} />} />
              </Route>
              <Route element={<RoleRoute allowedRoles={["kepala"]} />}>
                <Route path="/maps/add_marker" element={<AddMarker  show={show}/>} />
                <Route path="/maps/edit_marker/:id" element={<EditMarker  show={show}/>} />
              </Route>
              <Route element={<RoleRoute allowedRoles={["admin","kepala"]} />}>
                <Route path="/kepala" element={<Kepala show={show} />} />
              </Route>
              <Route element={<RoleRoute allowedRoles={["admin"]} />}>
                <Route path="/kepala/edit_kepala/:id" element={ <EditKepala show={show} />}/>
                <Route path="/kepala/add_kepala" element={ <AddKepala show={show} />}/>
              </Route>
            </Routes>
          </div>
        </Router>
      </div>
    </AuthProvider>
  );
}
export default App;
