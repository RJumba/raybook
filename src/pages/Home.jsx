import { useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  CalendarDays,
  Images,
  MapPin,
  Search,
  Sparkles,
  Ticket,
} from "lucide-react";

import EventCard from "../components/EventCard";
import PageTransition from "../components/PageTransition";

import { events } from "../data/events";

const categories = [
  "All Events",
  "Sip & Paint",
  "Music",
  "Lifestyle",
  "Campus",
  "Creative",
];
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>

      <div className="hero-container hero-container-centered">
        <div className="hero-content hero-content-centered">
          <h1 className="hero-welcome-title">
            <span className="hero-welcome-top">
              WELCOME TO
            </span>

            <span className="hero-brand-line">
              <span
                className="hero-brand-mark"
                aria-hidden="true"
              >
                R
              </span>

              <span className="hero-brand-word">
                RAYBOOK
              </span>
            </span>
          </h1>

          <p className="hero-description">
            Discover memorable events, book your place and
            turn ordinary days into experiences worth remembering.
          </p>

          <div className="hero-buttons">
            <Link
              to="/events"
              className="primary-button"
            >
              Explore Events
              <ArrowRight size={19} />
            </Link>

            <a
              href="#experience"
              className="secondary-button"
            >
              How it works
            </a>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <span>SCROLL</span>
        <div></div>
      </div>
    </section>
  );
}


function FeaturedEvent() {
  const featuredEvent = events.find(
    (event) => event.slug === "sip-paint-connect"
  );

  if (!featuredEvent) return null;

  return (
    <section className="featured-section" id="featured">
      <div className="section-container">

        <div className="featured-section-heading">
          <span className="section-label">
            FEATURED EXPERIENCE
          </span>

          <h2>Don't miss this experience</h2>

          <p>
            Handpicked moments worth showing up for.
          </p>
        </div>

        <div className="featured-showcase">

          <div className="featured-image">
            <img
              src={featuredEvent.image}
              alt={featuredEvent.title}
              loading="lazy"
            />

            <div className="featured-price">
              <span>ONLY</span>
              <strong>
                {featuredEvent.price.toLocaleString("en-KE")}/-
              </strong>
            </div>
          </div>

          <div className="featured-copy">

            <span className="featured-category">
              {featuredEvent.category}
            </span>

            <h3>{featuredEvent.title}</h3>

            <p className="featured-tagline">
              Paint something. Meet someone.
              <span> Make a memory.</span>
            </p>

            <p className="featured-description">
              {featuredEvent.description}
            </p>

            <div className="featured-details">
              <div className="detail">
                <CalendarDays size={19} />
                <div>
                  <span>Date</span>
                  <strong>{featuredEvent.date}</strong>
                </div>
              </div>

              <div className="detail">
                <MapPin size={19} />
                <div>
                  <span>Venue</span>
                  <strong>{featuredEvent.location}</strong>
                </div>
              </div>
            </div>

            <div className="featured-footer">
              <div className="featured-from-price">
                <span>STARTING FROM</span>
                <strong>
                  KES {featuredEvent.price.toLocaleString("en-KE")}
                </strong>
              </div>

              <Link
                to={`/events/${featuredEvent.slug}`}
                className="featured-view-button"
              >
                View experience
                <ArrowRight size={19} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}



function EventsSection() {
  const [activeCategory, setActiveCategory] = useState("All Events");

  const filteredEvents =
    activeCategory === "All Events"
      ? events
      : events.filter(
          (event) => event.category === activeCategory
        );

  const hasEvents = filteredEvents.length > 0;

  // Two identical groups make a seamless continuous carousel.
  const eventGroups = hasEvents
    ? [filteredEvents, filteredEvents]
    : [];

  return (
    <section
      className="events-section rb-upcoming"
      id="events"
      aria-label="Upcoming experiences"
    >
      <div className="rb-upcoming-container">
        <div className="rb-upcoming-heading">
          <div>
            <span className="section-label">
              WHAT'S HAPPENING
            </span>

            <h2>
              Upcoming <span>Experiences.</span>
            </h2>

            <p>
              Discover what's coming. Find your next
              unforgettable experience.
            </p>
          </div>

          <Link
            to="/events"
            className="rb-upcoming-view-all"
          >
            View all events
            <ArrowRight size={19} />
          </Link>
        </div>

        <div
          className="rb-upcoming-categories"
          aria-label="Filter events by category"
        >
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              aria-pressed={activeCategory === category}
              className={
                activeCategory === category
                  ? "rb-category-active"
                  : ""
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {hasEvents ? (
          <div
            className="rb-upcoming-viewport"
            aria-label="Upcoming events carousel"
          >
            <div
              key={activeCategory}
              className="rb-upcoming-track"
            >
              {eventGroups.map((group, groupIndex) => (
                <div
                  className="rb-upcoming-group"
                  key={groupIndex}
                  aria-hidden={groupIndex === 1}
                  inert={groupIndex === 1}
                >
                  {group.map((event, index) => (
                    <div
                      className="rb-floating-card"
                      key={`${groupIndex}-${event.id}`}
                      style={{
                        "--float-delay": `${index * -0.65}s`,
                      }}
                    >
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rb-upcoming-empty">
            <Sparkles size={25} />
            <h3>No experiences in this category yet</h3>
            <p>
              Explore another category or browse all events.
            </p>
          </div>
        )}

        <div className="rb-upcoming-bottom">
          <span>
            <span className="rb-live-dot" />
            Explore events at your own pace
          </span>

          <Link to="/events">
            Explore all experiences
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="experience-section" id="experience">
      <div className="section-container">
        <div className="experience-heading">
          <div className="section-label light-label">SIMPLE BOOKING</div>

          <h2>
            Your next event
            <br />
            is only <span>3 steps</span> away.
          </h2>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>

            <div className="step-icon">
              <Search size={24} />
            </div>

            <h3>Discover</h3>

            <p>Browse carefully curated events and experiences around you.</p>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>

            <div className="step-icon">
              <Ticket size={24} />
            </div>

            <h3>Book</h3>

            <p>
              Reserve your ticket quickly through a simple booking experience.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">03</span>

            <div className="step-icon">
              <Sparkles size={24} />
            </div>

            <h3>Experience</h3>

            <p>
              Show up, connect with people and create moments worth keeping.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const galleryImages = events
    .flatMap((event) => event.gallery || [])
    .slice(0, 4);

  return (
    <section className="gallery-section" id="gallery">
      <div className="section-container">
        <div className="gallery-heading">
          <div>
            <div className="section-label">
              THE MEMORIES
            </div>

            <h2>Past moments</h2>
          </div>

          <p>
            A glimpse at the people, colours, laughter and experiences
            that make every event different.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div
              className={`gallery-item gallery-item-${index + 1}`}
              key={`${image}-${index}`}
            >
              <img
                src={image}
                alt={`Raybook event moment ${index + 1}`}
              />

              <div className="gallery-overlay">
                <Images size={23} />

                <span>View moment</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="cta-section">
      <div className="cta-overlay"></div>

      <div className="cta-content">
        <span>DON'T JUST HEAR ABOUT IT</span>

        <h2>
          Be part of the
          <br />
          next experience.
        </h2>

        <Link to="/events" className="cta-button">
          Find your event
          <ArrowRight size={19} />
        </Link>
      </div>
    </section>
  );
}

function Home() {
  return (
    <PageTransition>
      <>
        <Hero />

        <EventsSection />

        <FeaturedEvent />

        <ExperienceSection />

        <GalleryPreview />

        <FinalCTA />
      </>
    </PageTransition>
  );
}

export default Home;