
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Smartphone,
  Ticket,
  UserRound,
} from "lucide-react";

import { events } from "../data/events";
import PageTransition from "../components/PageTransition";

const money = (amount) =>
  `KES ${Number(amount || 0).toLocaleString("en-KE")}`;

const numericPrice = (value) => {
  if (typeof value === "number") return value;
  return Number(String(value ?? "").replace(/[^\d.]/g, "")) || 0;
};

const checkoutMotion = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.48, ease: "easeOut" },
};

function Checkout() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const event = useMemo(
    () => events.find((item) => item.slug === slug),
    [slug]
  );

  const initialQuantity =
    Number(location.state?.quantity) || 1;

  const [quantity, setQuantity] = useState(
    Math.min(10, Math.max(1, Math.floor(initialQuantity)))
  );

  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  const price = numericPrice(event?.price);
  const subtotal = price * quantity;
  const total = subtotal;

  const updateCustomer = (field, value) => {
    setCustomer((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!customer.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!customer.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    const normalizedPhone = customer.phone.replace(/[\s-]/g, "");

    if (!/^(?:\+254|254|0)[17]\d{8}$/.test(normalizedPhone)) {
      nextErrors.phone = "Enter a valid Kenyan mobile number.";
    }

    if (!acceptedTerms) {
      nextErrors.terms = "Please accept the terms to continue.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Frontend-only demo. No booking or payment is created.
    setSubmitted(true);
  };

  if (!event) {
    return (
      <PageTransition>
        <main className="rb-checkout rb-checkout-missing">
          <h1>Event not found</h1>
          <p>This event may no longer be available.</p>
          <Link to="/events">Browse all events</Link>
        </main>
      </PageTransition>
    );
  }

  const eventDate = event.shortDate || event.date;
  const eventImage = event.image || event.imageUrl;

  return (
    <PageTransition>
      <main className="rb-checkout">
        <div className="rb-checkout-container">
          <motion.div {...checkoutMotion} className="rb-checkout-heading">
            <Link to={`/events/${slug}`} className="rb-checkout-back">
              <ArrowLeft size={17} />
              Back to event
            </Link>

            <span className="rb-checkout-eyebrow">SECURE BOOKING</span>
            <h1>Complete your booking<span>.</span></h1>
            <p>
              You're one step closer to an unforgettable experience.
              Review your tickets and enter your details below.
            </p>
          </motion.div>

          <div className="rb-checkout-layout">
            <motion.section
              {...checkoutMotion}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rb-checkout-main"
            >
              {submitted ? (
                <div className="rb-checkout-panel rb-checkout-success">
                  <CheckCircle2 size={54} />
                  <span className="rb-checkout-eyebrow">
                    DETAILS VERIFIED
                  </span>
                  <h2>You're ready for the next step.</h2>
                  <p>
                    Your booking details have passed validation.
                    Payment and ticket issuance are not yet active,
                    so no booking has been confirmed or charged.
                  </p>
                  <div className="rb-checkout-success-summary">
                    <strong>{event.title}</strong>
                    <span>{quantity} ticket(s) · {money(total)}</span>
                    <span>{customer.email}</span>
                    <span>
                      {paymentMethod === "mpesa"
                        ? "M-Pesa selected"
                        : "Instalment payment selected"}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="rb-checkout-primary"
                    onClick={() => setSubmitted(false)}
                  >
                    Edit booking details
                    <ArrowRight size={18} />
                  </button>
                  <Link to="/events" className="rb-checkout-return">
                    Browse more events
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleContinue} noValidate>
                  <div className="rb-checkout-panel">
                    <div className="rb-checkout-section-heading">
                      <div className="rb-checkout-section-icon">
                        <UserRound size={21} />
                      </div>
                      <div>
                        <span>STEP 01</span>
                        <h2>Your details</h2>
                        <p>
                          We'll use these details for your booking
                          and future ticket delivery.
                        </p>
                      </div>
                    </div>

                    <div className="rb-checkout-fields">
                      <div className="rb-checkout-field">
                        <label htmlFor="rb-first-name">First name *</label>
                        <input
                          id="rb-first-name"
                          autoComplete="given-name"
                          placeholder="Enter first name"
                          value={customer.firstName}
                          onChange={(e) =>
                            updateCustomer("firstName", e.target.value)
                          }
                          aria-invalid={Boolean(errors.firstName)}
                        />
                        {errors.firstName && <small>{errors.firstName}</small>}
                      </div>

                      <div className="rb-checkout-field">
                        <label htmlFor="rb-last-name">Last name *</label>
                        <input
                          id="rb-last-name"
                          autoComplete="family-name"
                          placeholder="Enter last name"
                          value={customer.lastName}
                          onChange={(e) =>
                            updateCustomer("lastName", e.target.value)
                          }
                          aria-invalid={Boolean(errors.lastName)}
                        />
                        {errors.lastName && <small>{errors.lastName}</small>}
                      </div>

                      <div className="rb-checkout-field rb-checkout-field-full">
                        <label htmlFor="rb-email">Email address *</label>
                        <input
                          id="rb-email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={customer.email}
                          onChange={(e) =>
                            updateCustomer("email", e.target.value)
                          }
                          aria-invalid={Boolean(errors.email)}
                        />
                        {errors.email && <small>{errors.email}</small>}
                      </div>

                      <div className="rb-checkout-field rb-checkout-field-full">
                        <label htmlFor="rb-phone">Phone number *</label>
                        <input
                          id="rb-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="0712 345 678"
                          value={customer.phone}
                          onChange={(e) =>
                            updateCustomer("phone", e.target.value)
                          }
                          aria-invalid={Boolean(errors.phone)}
                        />
                        {errors.phone && <small>{errors.phone}</small>}
                        <p className="rb-checkout-hint">
                          Use a Kenyan mobile number, e.g. 0712345678 or +254712345678.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rb-checkout-panel">
                    <div className="rb-checkout-section-heading">
                      <div className="rb-checkout-section-icon">
                        <CreditCard size={21} />
                      </div>
                      <div>
                        <span>STEP 02</span>
                        <h2>Payment method</h2>
                        <p>Select how you'd prefer to pay.</p>
                      </div>
                    </div>

                    <div className="rb-checkout-payment-options">
                      <label
                        className={`rb-checkout-payment-option ${
                          paymentMethod === "mpesa" ? "selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="mpesa"
                          checked={paymentMethod === "mpesa"}
                          onChange={() => setPaymentMethod("mpesa")}
                        />
                        <div className="rb-checkout-payment-icon">
                          <Smartphone size={22} />
                        </div>
                        <div className="rb-checkout-payment-copy">
                          <strong>M-Pesa</strong>
                          <span>Pay the full amount using M-Pesa</span>
                        </div>
                        <span className="rb-checkout-radio" />
                      </label>

                      <label
                        className={`rb-checkout-payment-option ${
                          paymentMethod === "instalments" ? "selected" : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="instalments"
                          checked={paymentMethod === "instalments"}
                          onChange={() => setPaymentMethod("instalments")}
                        />
                        <div className="rb-checkout-payment-icon">
                          <CalendarDays size={22} />
                        </div>
                        <div className="rb-checkout-payment-copy">
                          <strong>Lipa Mdogo Mdogo</strong>
                          <span>Pay in instalments — coming soon</span>
                        </div>
                        <span className="rb-checkout-radio" />
                      </label>
                    </div>

                    {paymentMethod === "instalments" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="rb-checkout-info"
                      >
                        Instalment schedules and deposit requirements
                        will be introduced when payments are connected.
                        This selection is for preview only.
                      </motion.div>
                    )}
                  </div>

                  <div className="rb-checkout-panel rb-checkout-final">
                    <label className="rb-checkout-terms">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => {
                          setAcceptedTerms(e.target.checked);
                          setErrors((prev) => ({
                            ...prev,
                            terms: undefined,
                          }));
                        }}
                      />
                      <span>
                        I confirm that my booking information is correct
                        and understand that this is a frontend preview
                        with no payment or ticket issuance.
                      </span>
                    </label>
                    {errors.terms && (
                      <small className="rb-checkout-error">
                        {errors.terms}
                      </small>
                    )}

                    <button type="submit" className="rb-checkout-primary">
                      Review booking details
                      <ArrowRight size={19} />
                    </button>

                    <p className="rb-checkout-safe-note">
                      <LockKeyhole size={14} />
                      No payment will be collected at this stage.
                    </p>
                  </div>
                </form>
              )}
            </motion.section>

            <motion.aside
              {...checkoutMotion}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="rb-checkout-sidebar"
            >
              <div className="rb-checkout-summary">
                <div className="rb-checkout-summary-title">
                  <Ticket size={19} />
                  <h2>Booking summary</h2>
                </div>

                <div className="rb-checkout-event">
                  {eventImage && (
                    <img src={eventImage} alt={event.title} />
                  )}
                  <div>
                    <span>{event.category}</span>
                    <h3>{event.title}</h3>
                  </div>
                </div>

                <div className="rb-checkout-event-meta">
                  <div>
                    <CalendarDays size={17} />
                    <span>{eventDate}</span>
                  </div>
                  {event.time && (
                    <div>
                      <CalendarDays size={17} />
                      <span>{event.time}</span>
                    </div>
                  )}
                  <div>
                    <MapPin size={17} />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="rb-checkout-divider" />

                <div className="rb-checkout-quantity-row">
                  <div>
                    <strong>General admission</strong>
                    <span>{money(price)} per ticket</span>
                  </div>
                  <div className="rb-checkout-quantity">
                    <button
                      type="button"
                      aria-label="Remove one ticket"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      aria-label="Add one ticket"
                      disabled={quantity >= 10}
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="rb-checkout-divider" />

                <div className="rb-checkout-cost-line">
                  <span>Subtotal ({quantity} tickets)</span>
                  <strong>{money(subtotal)}</strong>
                </div>

                <div className="rb-checkout-cost-line">
                  <span>Booking fees</span>
                  <span>Not applied</span>
                </div>

                <div className="rb-checkout-total">
                  <span>Total</span>
                  <strong>{money(total)}</strong>
                </div>

                <div className="rb-checkout-summary-footnote">
                  <ShieldCheck size={18} />
                  <span>
                    Your ticket quantity and total update automatically.
                    Availability will be verified by the backend later.
                  </span>
                </div>
              </div>

              <div className="rb-checkout-help">
                <strong>Need to change your event?</strong>
                <p>You can return to the event page without making a payment.</p>
                <button
                  type="button"
                  onClick={() => navigate(`/events/${slug}`)}
                >
                  View event details <ArrowRight size={15} />
                </button>
              </div>
            </motion.aside>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}

export default Checkout;
