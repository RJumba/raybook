import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  CalendarDays,
  Heart,
  MapPin,
} from "lucide-react";

function EventCard({ event }) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="event-card">
      <div className="event-image-wrapper">
        <Link to={`/events/${event.id}`}>
          <img
            src={event.image}
            alt={event.title}
          />
        </Link>

        <button
          className={`heart-button ${
            liked ? "heart-liked" : ""
          }`}
          aria-label={
            liked
              ? "Remove from favourites"
              : "Save event"
          }
          onClick={() => setLiked((current) => !current)}
        >
          <Heart
            size={18}
            fill={liked ? "currentColor" : "none"}
          />
        </button>

        <div className="event-category">
          {event.category}
        </div>
      </div>

      <div className="event-card-body">
        <div className="event-meta">
          <span>
            <CalendarDays size={15} />
            {event.shortDate}
          </span>

          <span>
            <MapPin size={15} />
            {event.location}
          </span>
        </div>

        <Link
          to={`/events/${event.id}`}
          className="event-title-link"
        >
          <h3>{event.title}</h3>
        </Link>

        <div className="event-card-footer">
          <div className="event-price">
            <small>FROM</small>
            <strong>
              KES {event.price.toLocaleString()}
            </strong>
          </div>

          <Link
            to={`/events/${event.id}`}
            className="event-arrow"
            aria-label={`View ${event.title}`}
          >
            <ArrowRight size={19} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default EventCard;