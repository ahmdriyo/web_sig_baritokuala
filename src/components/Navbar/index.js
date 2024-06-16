import { TiThMenu } from "react-icons/ti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoMapSharp, IoInformationCircle } from "react-icons/io5";
import { IoIosPerson } from "react-icons/io";
import "../../index.css"
const Navbar = ({ show, handleShow, handleClose }) => {
  const navigate = useNavigate();
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
    case "/login":
      title = "Login";
      break;
    case "/register":
      title = "Register";
      break;
    case "/about":
      title = "About";
      break;
    default:
      title = "";
  }
  const handleLogin = () => {
    navigate("/login")
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
        <div onClick={handleLogin} className="navbar-brand">Login</div>
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
      </div>
      {/* Akhir Sidebar */}
    </div>
  );
};
export default Navbar;
