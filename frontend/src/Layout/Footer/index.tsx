import "./index.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <ul className="page-list">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#about">Contact Us</a>
            </li>
          </ul>
          <div className="sosial m-4">
            <ul>
              <li>
                <Link to="https://www.facebook.com/">
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link to="https://www.instagram.com/">
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link to="https://twitter.com/">
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link to="https://www.youtube.com/">
                  <i className="fab fa-youtube"></i>
                </Link>
              </li>
            </ul>
          </div>
          <h2 className="logo">Web_News</h2>
          <div className="app-store">
            <img
              src="https://apa.az/site/assets/images/icons/GooglePlay.svg"
              alt="google"
            />
            <img
              src="https://apa.az/site/assets/images/icons/AppStore.svg"
              alt="apple"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
