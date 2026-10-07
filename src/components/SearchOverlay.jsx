import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Search,
  X,
} from "lucide-react";

import { events } from "../data/events";

function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const results = events.filter((event) => {
    const searchable = `
      ${event.title}
      ${event.location}
      ${event.city}
      ${event.category}
    `.toLowerCase();

    return searchable.includes(query.toLowerCase());
  });

  return (
    <div className="search-overlay">
      <button
        className="search-overlay-background"
        onClick={onClose}
        aria-label="Close search"
      ></button>

      <div className="search-panel">
        <div className="search-panel-top">
          <div>
            <span className="section-label">
              FIND YOUR EXPERIENCE
            </span>

            <h2>Search events</h2>
          </div>

          <button
            className="search-close"
            onClick={onClose}
          >
            <X size={23} />
          </button>
        </div>

        <div className="search-input-wrapper">
          <Search size={20} />

          <input
            autoFocus
            type="text"
            placeholder="Try 'Sip & Paint' or 'Nairobi'..."
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
          />
        </div>

        {query && (
          <div className="search-results">
            <p className="search-result-count">
              {results.length}{" "}
              {results.length === 1
                ? "event"
                : "events"}{" "}
              found
            </p>

            {results.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="search-result"
                onClick={onClose}
              >
                <img
                  src={event.image}
                  alt={event.title}
                />

                <div>
                  <strong>{event.title}</strong>

                  <span>
                    <CalendarDays size={13} />
                    {event.shortDate}
                  </span>

                  <span>
                    <MapPin size={13} />
                    {event.location}
                  </span>
                </div>
              </Link>
            ))}

            {results.length === 0 && (
              <div className="no-search-results">
                No matching events found.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchOverlay;