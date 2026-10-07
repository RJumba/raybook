import { Link } from "react-router-dom";

function FooterLogo() {
  return (
    <Link to="/" className="logo">
      <div className="logo-mark">R</div>

      <div className="logo-copy">
        <span className="logo-name">RAYBOOK</span>
        <span className="logo-tagline">
          Book. Connect. Celebrate.
        </span>
      </div>
    </Link>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="section-container footer-grid">
        <div>
          <FooterLogo />

          <p className="footer-description">
            Discover memorable experiences and book
            your next great moment.
          </p>
        </div>

        <div className="footer-links">
          <strong>Explore</strong>

          <Link to="/events">Events</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/account">Account</Link>
        </div>

        <div className="footer-links">
          <strong>Company</strong>

          <Link to="/">About us</Link>
          <Link to="/">Contact</Link>
          <Link to="/">FAQs</Link>
        </div>

        <div className="footer-links">
          <strong>Follow</strong>

          <a href="#instagram">Instagram</a>
          <a href="#tiktok">TikTok</a>
          <a href="#twitter">X / Twitter</a>
        </div>
      </div>

      <div className="section-container copyright">
        <span>
          © 2026 Raybook. All rights reserved.
        </span>

        <span>Book. Connect. Celebrate.</span>
      </div>
    </footer>
  );
}

export default Footer;