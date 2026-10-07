import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Heart,
  Home,
  Images,
  MapPin,
  Menu,
  Search,
  Sparkles,
  Ticket,
  UserRound,
  X,
} from "lucide-react";

import "./App.css";

const events = [
  {
    id: 1,
    title: "Sip, Paint & Connect",
    date: "31 Oct 2026",
    location: "Lelesan Resort",
    price: "KES 1,200",
    category: "Art & Social",
    image:
      "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "Sunset Rooftop Sessions",
    date: "07 Nov 2026",
    location: "Nairobi",
    price: "KES 1,500",
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "Weekend Creative Social",
    date: "14 Nov 2026",
    location: "The Social House",
    price: "KES 1,000",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=85",
  },
];

const categories = [
  "All Events",
  "Sip & Paint",
  "Music",
  "Lifestyle",
  "Campus",
  "Creative",
];

const galleryImages = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=85",
];

function Logo() {
  return (
    <a href="#home" className="logo">
      <div className="logo-mark">R</div>

      <div className="logo-copy">
        <span className="logo-name">RAYBOOK</span>
        <span className="logo-tagline">Book. Connect. Celebrate.</span>
      </div>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-container">
        <Logo />

        <nav className="desktop-nav">
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#experience">Experience</a>
          <a href="#gallery">Gallery</a>
        </nav>

        <div className="header-actions">
          <button className="search-button" aria-label="Search">
            <Search size={20} />
          </button>

          <a href="#events" className="header-ticket-button">
            <Ticket size={18} />
            Get Tickets
          </a>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? "mobile-menu-open" : ""}`}>
        <a href="#home" onClick={() => setMenuOpen(false)}>
          Home
        </a>

        <a href="#events" onClick={() => setMenuOpen(false)}>
          Events
        </a>

        <a href="#experience" onClick={() => setMenuOpen(false)}>
          Experience
        </a>

        <a href="#gallery" onClick={() => setMenuOpen(false)}>
          Gallery
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay"></div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <Sparkles size={17} />
            <span>Your next experience starts here</span>
          </div>

          <h1>
            Discover.
            <br />
            <span>Book.</span>
            <br />
            Celebrate.
          </h1>

          <p className="hero-description">
            Find memorable events, meet amazing people and book your place in
            just a few clicks.
          </p>

          <div className="hero-buttons">
            <a href="#events" className="primary-button">
              Explore Events
              <ArrowRight size={19} />
            </a>

            <a href="#experience" className="secondary-button">
              How it works
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <strong>20+</strong>
              <span>Experiences</span>
            </div>

            <div className="stat-divider"></div>

            <div>
              <strong>1.2K+</strong>
              <span>Guests</span>
            </div>

            <div className="stat-divider"></div>

            <div>
              <strong>4.9</strong>
              <span>Rating</span>
            </div>
          </div>
        </div>

        <div className="hero-event-card">
          <div className="hero-card-label">NEXT EVENT</div>

          <div className="hero-card-content">
            <div className="date-square">
              <span>OCT</span>
              <strong>31</strong>
            </div>

            <div>
              <p>Featured Experience</p>
              <h3>Sip, Paint & Connect</h3>

              <div className="hero-location">
                <MapPin size={15} />
                Lelesan Resort
              </div>
            </div>
          </div>

          <div className="hero-card-footer">
            <div>
              <span>From</span>
              <strong>KES 1,200</strong>
            </div>

            <button aria-label="View featured event">
              <ArrowRight size={20} />
            </button>
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
  return (
    <section className="featured-section">
      <div className="section-container featured-grid">
        <div className="featured-image">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1300&q=85"
            alt="People enjoying a creative painting experience"
          />

          <div className="featured-price">
            <span>ONLY</span>
            <strong>1,200/-</strong>
          </div>
        </div>

        <div className="featured-copy">
          <div className="section-label">FEATURED EXPERIENCE</div>

          <h2>
            Paint something.
            <br />
            Meet someone.
            <br />
            <span>Make a memory.</span>
          </h2>

          <p>
            A relaxed evening built around creativity, conversation, music and
            good energy. No painting experience needed — just come ready to
            enjoy yourself.
          </p>

          <div className="featured-details">
            <div className="detail">
              <CalendarDays size={21} />
              <div>
                <span>Date</span>
                <strong>31 October 2026</strong>
              </div>
            </div>

            <div className="detail">
              <MapPin size={21} />
              <div>
                <span>Venue</span>
                <strong>Lelesan Resort</strong>
              </div>
            </div>
          </div>

          <a href="#events" className="text-link">
            View experience
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }) {
  return (
    <article className="event-card">
      <div className="event-image-wrapper">
        <img src={event.image} alt={event.title} />

        <button className="heart-button" aria-label="Save event">
          <Heart size={18} />
        </button>

        <div className="event-category">{event.category}</div>
      </div>

      <div className="event-card-body">
        <div className="event-meta">
          <span>
            <CalendarDays size={15} />
            {event.date}
          </span>

          <span>
            <MapPin size={15} />
            {event.location}
          </span>
        </div>

        <h3>{event.title}</h3>

        <div className="event-card-footer">
          <div className="event-price">
            <small>FROM</small>
            <strong>{event.price}</strong>
          </div>

          <button className="event-arrow" aria-label={`Open ${event.title}`}>
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
    </article>
  );
}

function EventsSection() {
  const [activeCategory, setActiveCategory] = useState("All Events");

  return (
    <section className="events-section" id="events">
      <div className="section-container">
        <div className="section-heading-row">
          <div>
            <div className="section-label">WHAT'S HAPPENING</div>
            <h2>Upcoming experiences</h2>
          </div>

          <a href="#events" className="desktop-view-all">
            View all events
            <ArrowRight size={18} />
          </a>
        </div>

        <div className="category-row">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category ? "category-active" : ""
              }
            >
              {category}
            </button>
          ))}
        </div>

        <div className="events-grid">
          {events.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>

        <a href="#events" className="mobile-view-all">
          Browse all experiences
          <ArrowRight size={18} />
        </a>
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
            Your next great moment
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

            <p>
              Browse carefully curated events and experiences around you.
            </p>
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

function Gallery() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="section-container">
        <div className="gallery-heading">
          <div>
            <div className="section-label">THE MEMORIES</div>
            <h2>Past moments</h2>
          </div>

          <p>
            A glimpse at the people, colours, laughter and experiences that
            make every event different.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div className={`gallery-item gallery-item-${index + 1}`} key={image}>
              <img src={image} alt={`Raybook event moment ${index + 1}`} />

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

        <a href="#events" className="cta-button">
          Find your event
          <ArrowRight size={19} />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="section-container footer-grid">
        <div>
          <Logo />

          <p className="footer-description">
            Discover memorable experiences and book your next great moment.
          </p>
        </div>

        <div className="footer-links">
          <strong>Explore</strong>
          <a href="#events">Events</a>
          <a href="#experience">How it works</a>
          <a href="#gallery">Gallery</a>
        </div>

        <div className="footer-links">
          <strong>Company</strong>
          <a href="#home">About us</a>
          <a href="#home">Contact</a>
          <a href="#home">FAQs</a>
        </div>

        <div className="footer-links">
          <strong>Follow</strong>
          <a href="#home">Instagram</a>
          <a href="#home">TikTok</a>
          <a href="#home">X / Twitter</a>
        </div>
      </div>

      <div className="section-container copyright">
        <span>© 2026 Raybook. All rights reserved.</span>

        <span>Book. Connect. Celebrate.</span>
      </div>
    </footer>
  );
}

function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav">
      <a href="#home" className="mobile-nav-active">
        <Home size={20} />
        <span>Home</span>
      </a>

      <a href="#events">
        <Ticket size={20} />
        <span>Events</span>
      </a>

      <a href="#gallery">
        <Images size={20} />
        <span>Gallery</span>
      </a>

      <a href="#home">
        <UserRound size={20} />
        <span>Account</span>
      </a>
    </nav>
  );
}

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <FeaturedEvent />
        <EventsSection />
        <ExperienceSection />
        <Gallery />
        <FinalCTA />
      </main>

      <Footer />
      <MobileBottomNav />
    </>
  );
}

export default App;