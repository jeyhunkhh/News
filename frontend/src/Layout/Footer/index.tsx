import "./index.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <ul className="page-list">
            <li>
              <Link to="#about">About</Link>
            </li>
            <li>
              <Link to="#about">Contact Us</Link>
            </li>
          </ul>
          <div className="sosial m-4">
            <ul>
              <li>
                <Link
                  to={{ pathname: "https://www.facebook.com/" }}
                  target="_blank"
                >
                  <i className="fab fa-facebook-f"></i>
                </Link>
              </li>
              <li>
                <Link
                  to={{ pathname: "https://www.instagram.com/" }}
                  target="_blank"
                >
                  <i className="fab fa-instagram"></i>
                </Link>
              </li>
              <li>
                <Link to={{ pathname: "https://twitter.com/" }} target="_blank">
                  <i className="fab fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link
                  to={{ pathname: "https://www.youtube.com/" }}
                  target="_blank"
                >
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
