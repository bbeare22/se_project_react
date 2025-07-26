import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer">
        <p className="footer__text">Developed by Brett Beare</p>
        <p className="footer__text">{currentYear}</p>
      </div>
    </footer>
  );
}

export default Footer;
