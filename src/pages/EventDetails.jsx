import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  MapPin,
  Minus,
  Plus,
  Share2,
  Ticket,
} from "lucide-react";

import PageTransition from "../components/PageTransition";
import { events } from "../data/events";

function EventDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const event = events.find((item) => item.id === id);

  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return <div className="not-found-page">Event not found.</div>;
  }

  const total = event.price * quantity;


  return (
    <PageTransition>
      <section className="event-detail-page">
        <div className="section-container">
          <Link to="/events" className="back-button">
            <ArrowLeft size={17} />
            Back to events
          </Link>

          <div className="event-detail-grid">
            <div className="event-detail-content">
              <div className="event-detail-image">
                <img src={event.image} alt={event.title} />

                <div className="event-detail-category">{event.category}</div>
              </div>

              <div className="event-detail-heading">
                <div>
                  <span className="section-label">UPCOMING EXPERIENCE</span>

                  <h1>{event.title}</h1>
                </div>

                <button
                  className="share-button"
                  onClick={async () => {
                    if (navigator.share) {
                      await navigator.share({
                        title: event.title,
                        url: window.location.href,
                      });
                    } else {
                      await navigator.clipboard.writeText(window.location.href);

                      alert("Event link copied to clipboard.");
                    }
                  }}
                >
                  <Share2 size={18} />
                </button>
              </div>

              <div className="event-detail-info">
                <div>
                  <CalendarDays size={21} />

                  <span>
                    <small>Date</small>
                    <strong>{event.date}</strong>
                  </span>
                </div>

                <div>
                  <Clock size={21} />

                  <span>
                    <small>Time</small>
                    <strong>{event.time}</strong>
                  </span>
                </div>

                <div>
                  <MapPin size={21} />

                  <span>
                    <small>Venue</small>
                    <strong>{event.location}</strong>
                  </span>
                </div>
              </div>

              <div className="event-about">
                <h2>About this experience</h2>

                <p>{event.description}</p>

                <h3>What your ticket includes</h3>

                <ul>
                  <li>
                    <Check size={17} />
                    Access to the complete event
                  </li>

                  <li>
                    <Check size={17} />
                    All required activity materials
                  </li>

                  <li>
                    <Check size={17} />
                    Music and entertainment
                  </li>

                  <li>
                    <Check size={17} />
                    Digital ticket confirmation
                  </li>
                </ul>
              </div>

              <div className="event-mini-gallery">
                {event.gallery.map((image) => (
                  <img src={image} key={image} alt={event.title} />
                ))}
              </div>
            </div>

            <aside className="booking-card">
              <span className="booking-label">TICKETS</span>

              <div className="booking-price">
                <small>Price per person</small>

                <strong>KES {event.price.toLocaleString()}</strong>
              </div>

              <div className="booking-divider"></div>

              <div className="ticket-quantity-row">
                <div>
                  <strong>Tickets</strong>
                  <span>Select quantity</span>
                </div>

                <div className="quantity-control">
                  <button
                    onClick={() =>
                      setQuantity((current) => Math.max(1, current - 1))
                    }
                  >
                    <Minus size={16} />
                  </button>

                  <strong>{quantity}</strong>

                  <button
                    onClick={() =>
                      setQuantity((current) => Math.min(10, current + 1))
                    }
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="booking-divider"></div>

              <div className="booking-total">
                <span>Total</span>

                <strong>KES {total.toLocaleString()}</strong>
              </div>

              <button
                className="booking-action"
                onClick={() =>
                  navigate(`/events/${event.slug}/checkout`, {
                    state: {
                      quantity,
                    },
                  })
                }
              >
                <Ticket size={18} />
                Continue to booking
                <ChevronRight size={18} />
              </button>

              <p className="booking-note">
                No payment will be made until you confirm your booking.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default EventDetails;
