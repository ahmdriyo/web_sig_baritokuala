import { TiThMenu } from "react-icons/ti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoMapSharp, IoInformationCircle } from "react-icons/io5";
import { IoIosPerson } from "react-icons/io";
import "../../index.css";
import { useAuth } from "../../auth/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { TbLogout } from "react-icons/tb";
import { signOut } from "firebase/auth";
const Navbar = ({ show, handleShow, handleClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, role } = useAuth();
  const [dataUser, setDataUser] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  let title = "";
  useEffect(() => {
    const fetchUserRole = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setDataUser(userData.fullName);
            console.log(userData)
            
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
    case "/login":
      title = "Login";
      break;
    case "/register":
      title = "Register";
      break;
    case "/profile":
      title = "Profile";
      break;
    case "/about":
      title = "About";
      break;
    case "/report":
      title = "Report";
      break;
    default:
      title = "";
  }
  const dataRole = dataUser ? dataUser.charAt(0).toUpperCase() + dataUser.slice(1) : "";
  const handleLogin = () => {
    navigate("/login");
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }
  return (
    <div className={`App ${show ? "show" : ""}`}>
      <nav className="navbar">
        {/* HamburgerMenu */}
        <div
          className="navbar-toggler"
          onClick={show ? handleClose : handleShow}
        >
          <TiThMenu />
        </div>
        <div className="navbar-brand">{title}</div>
        {currentUser ? (
          <div className="navbar-brand" onClick={togglePopup}>
            Halo {dataRole}
            {isOpen && (
              <div onClick={handleLogout} className="popup-content">
                <p>Logout</p>
                <TbLogout/>
              </div>
            )}
          </div>
        ) : (
          <div onClick={handleLogin} className="navbar-brand">
            Login
          </div>
        )}
      </nav>
      {/* Akhir HamburgerMenu */}
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
          {(role === "kepala") | (role === "admin") ? (
            <Link className="nav-link" to="/kepala">
              <div className="icon-menu">
                <IoIosPerson />
              </div>
              Kepala
            </Link>
          ) : role === "pengunjung" ? (
            <Link className="nav-link" to="/profile">
              <div className="icon-menu">
                <IoIosPerson />
              </div>
              Profile
            </Link>
          ) : (
            <></>
          )}
          <Link className="nav-link" to="/about">
            <div className="icon-menu">
              <IoInformationCircle />
            </div>
            About
          </Link>
        </div>
      </div>
      {/* Akhir Sidebar */}
    </div>
  );
};
export default Navbar;
