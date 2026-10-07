import {
  Home,
  Images,
  Ticket,
  UserRound,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "mobile-nav-active" : ""
        }
      >
        <Home size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/events"
        className={({ isActive }) =>
          isActive ? "mobile-nav-active" : ""
        }
      >
        <Ticket size={20} />
        <span>Events</span>
      </NavLink>

      <NavLink
        to="/gallery"
        className={({ isActive }) =>
          isActive ? "mobile-nav-active" : ""
        }
      >
        <Images size={20} />
        <span>Gallery</span>
      </NavLink>

      <NavLink
        to="/account"
        className={({ isActive }) =>
          isActive ? "mobile-nav-active" : ""
        }
      >
        <UserRound size={20} />
        <span>Account</span>
      </NavLink>
    </nav>
  );
}

export default MobileBottomNav;