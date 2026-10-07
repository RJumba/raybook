import PageTransition from "../components/PageTransition";
import { events } from "../data/events";

function Gallery() {
  const images = events.flatMap(
    (event) => event.gallery
  );

  return (
    <PageTransition>
      <section className="inner-page-hero gallery-page-hero">
        <div className="section-container">
          <span className="section-label">
            OUR MEMORIES
          </span>

          <h1>
            Moments worth
            <br />
            <span>remembering.</span>
          </h1>

          <p>
            A look back at the people, laughter,
            creativity and energy behind our events.
          </p>
        </div>
      </section>

      <section className="full-gallery-section">
        <div className="section-container">
          <div className="full-gallery-grid">
            {images.map((image, index) => (
              <div
                className="full-gallery-item"
                key={`${image}-${index}`}
              >
                <img
                  src={image}
                  alt={`Raybook moment ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Gallery;