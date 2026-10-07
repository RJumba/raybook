import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  Search,
  Ticket,
  X,
} from "lucide-react";

function Logo() {
  return (
    <Link to="/" className="logo">
      <div className="logo-mark">R</div>

      <div className="logo-copy">
        <span className="logo-name">RAYBOOK</span>
        <span className="logo-tagline">Book. Connect. Celebrate.</span>
      </div>
    </Link>
  );
}

function Header({ onSearchOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <Logo />

        <nav className="desktop-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-active" : ""
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive ? "nav-active" : ""
            }
          >
            Events
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive ? "nav-active" : ""
            }
          >
            Gallery
          </NavLink>

          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive ? "nav-active" : ""
            }
          >
            Account
          </NavLink>
        </nav>

        <div className="header-actions">
          <button
            className="search-button"
            aria-label="Search events"
            onClick={onSearchOpen}
          >
            <Search size={20} />
          </button>

          <Link
            to="/events"
            className="header-ticket-button"
          >
            <Ticket size={18} />
            Get Tickets
          </Link>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      <div
        className={`mobile-menu ${
          menuOpen ? "mobile-menu-open" : ""
        }`}
      >
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/events" onClick={closeMenu}>
          Events
        </NavLink>

        <NavLink to="/gallery" onClick={closeMenu}>
          Gallery
        </NavLink>

        <NavLink to="/account" onClick={closeMenu}>
          Account
        </NavLink>
      </div>
    </header>
  );
}

export default Header;