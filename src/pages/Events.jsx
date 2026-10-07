import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import EventCard from "../components/EventCard";
import PageTransition from "../components/PageTransition";
import { events } from "../data/events";

const categories = [
  "All",
  "Sip & Paint",
  "Music",
  "Lifestyle",
];

function Events() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        category === "All" ||
        event.category === category;

      const matchesSearch =
        event.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        event.location
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  return (
    <PageTransition>
      <section className="inner-page-hero events-page-hero">
        <div className="section-container">
          <span className="section-label">
            DISCOVER
          </span>

          <h1>
            Find your next
            <br />
            <span>experience.</span>
          </h1>

          <p>
            Explore upcoming events, discover something
            new and reserve your spot.
          </p>
        </div>
      </section>

      <section className="events-listing-page">
        <div className="section-container">
          <div className="event-filter-bar">
            <div className="event-page-search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <div className="event-page-categories">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={
                    category === item
                      ? "filter-active"
                      : ""
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="events-page-count">
            <strong>{filteredEvents.length}</strong>{" "}
            experiences available
          </div>

          <div className="events-grid">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="empty-events">
              <h3>No events found</h3>

              <p>
                Try another category or search term.
              </p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

export default Events;