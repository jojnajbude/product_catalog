import './Footer.scss';

import logo from '../../images/Logo-footer.svg';
import vector from '../../images/Vector.svg';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    const handleScrollToTop = () => {
      window.scrollBy({ top: -100000, behavior: 'smooth' });
    };

    return (
      <footer className="footer">
        <div className="footer__wrapper">
          <div className="footer__logo">
            <Link to="/home">
              <img src={logo} alt="img" />
            </Link>
          </div>
          <nav className="footer__nav">
            <a href="*" target="blanc" className="footer__nav-link">
              Github
            </a>
            <a href="*" className="footer__nav-link">
              Contacts
            </a>
            <a href="*" className="footer__nav-link">
              Rights
            </a>
          </nav>

          <div
            className="footer__back"
            onClick={handleScrollToTop}
          >
            <p className="footer__back-article">
              Back to top
            </p>
            <div
              className="footer__back-link"
              id="back"
            >
              <img className="footer__back-img" src={vector} alt="img" />
            </div>
          </div>
        </div>
      </footer>
    );
}
