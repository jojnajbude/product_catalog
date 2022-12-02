import './Footer.scss';

import logo from '../../images/Logo-footer.svg';
import vector from '../../images/Vector.svg';

export const Footer: React.FC = () => {
    return (
      <footer className="footer">
        <div className="footer__wrapper">
          <div className="footer__logo">
            <a href="*">
              <img src={logo} alt="img" />
            </a>
          </div>
          <nav className="footer__nav">
            <a href="*" className="footer__nav-link">
              Github
            </a>
            <a href="*" className="footer__nav-link">
              Contacts
            </a>
            <a href="*" className="footer__nav-link">
              rights
            </a>
          </nav>
          <div className="footer__back">
            <label className="footer__back-article" htmlFor="back">
              Back to top
            </label>
            <button className="footer__back-link" id="back">
              <img className="footer__back-img" src={vector} alt="img" />
            </button>
          </div>
        </div>
      </footer>
    ); 
}