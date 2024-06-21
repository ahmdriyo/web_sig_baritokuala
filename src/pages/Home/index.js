import "./StyleHome.css";
import imgKampus from "../../assets/svg/imgKampus.svg";
import iconKam from "../../assets/svg/iconKam.svg";
import { useNavigate } from "react-router-dom";
const Home = ({ show }) => {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate("/maps");
  };
  return (
    <div className={`container ${show ? "show" : ""}`}>
      <div className="container-home">
        <div className="container-img-home">
          <img className="content-img-home" alt="kampus" src={imgKampus} />
        </div>
        <div className="content-text-home">
          <h3>
            Jelajahi Kampus-Kampus di Barito Kuala <br />
            dengan Augmented Reality
          </h3>
          <p>
            Manfaatkan peta interaktif kami untuk menemukan lokasi kampus
            terdekat dengan mudah. Jelajahi setiap kampus yang Anda temui dan
            dapatkan informasi lengkap mengenai fasilitas, program studi, dan
            lingkungan sekitarnya. Temukan kampus impian Anda hanya dengan
            beberapa klik. Dengan peta interaktif kami, Anda dapat melihat
            detail kampus dan membandingkan berbagai pilihan.
          </p>
          <h4>
            Jangan hanya mencari kampus bagus,
            <br />
            Namun carilah tempat yang dapat membentuk masa depanmu !
          </h4>
          <button onClick={() => handleNav()} className="btn-mulai">
            Mulai Sekarang
          </button>
        </div>
          <div className="icon-lembaga">
            <img alt="" src={iconKam} />
          </div>
      </div>
    </div>
  );
};

export default Home;
