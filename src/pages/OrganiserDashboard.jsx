import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  ImagePlus,
  LayoutDashboard,
  MapPin,
  Pencil,
  Plus,
  Save,
  ShieldCheck,
  Ticket,
  Trash2,
  TrendingUp,
  UsersRound,
  X,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import "../styles/OrganiserDashboard.css";

// DESIGN-PREVIEW DATA ONLY. Replace with organiser-scoped backend records later.
const demoEvent = {
  id: "sample-1",
  title: "Creative Nights: Sip & Paint",
  category: "Sip & Paint",
  date: "2026-11-21",
  time: "17:00",
  venue: "The Garden Studio",
  city: "Nairobi",
  description: "A colourful evening of painting, good music and new connections.",
  images: [],
  tiers: [{ id: "sample-tier", name: "General Admission", price: 1200, quantity: 120 }],
  sold: 48,
  buyers: 42,
  status: "Sample listing",
  isSample: true,
};

const demoOrders = [
  { id: "RB-DEMO-1048", customer: "Guest A", tier: "General Admission", tickets: 2, amount: 2400, date: "12 Oct 2026" },
  { id: "RB-DEMO-1047", customer: "Guest B", tier: "General Admission", tickets: 1, amount: 1200, date: "11 Oct 2026" },
  { id: "RB-DEMO-1046", customer: "Guest C", tier: "General Admission", tickets: 3, amount: 3600, date: "10 Oct 2026" },
  { id: "RB-DEMO-1045", customer: "Guest D", tier: "General Admission", tickets: 1, amount: 1200, date: "09 Oct 2026" },
];

const menuItems = [
  { id: "overview", label: "Overview", Icon: LayoutDashboard },
  { id: "events", label: "My events", Icon: CalendarDays },
  { id: "create", label: "Create event", Icon: ImagePlus },
  { id: "sales", label: "Ticket sales", Icon: BarChart3 },
];

const blankForm = () => ({
  title: "",
  category: "Sip & Paint",
  date: "",
  time: "",
  venue: "",
  city: "",
  description: "",
  images: [],
  tiers: [{ id: cryptoId(), name: "General Admission", price: "", quantity: "" }],
});

function cryptoId() {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatMoney(value) {
  return `KES ${Number(value || 0).toLocaleString("en-KE")}`;
}

function formatDate(date) {
  if (!date) return "Date not set";
  const parsed = new Date(`${date}T12:00:00`);
  return Number.isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" });
}

function BrandMark({ large = false }) {
  return (
    <span className={`rb-org-brand-mark ${large ? "rb-org-brand-mark-large" : ""}`} aria-label="Raybook R logo" role="img">
      R
    </span>
  );
}

function StatCard({ Icon, title, value, subtext, index = 0 }) {
  return (
    <article className="rb-org-stat" style={{ animationDelay: `${index * 85}ms` }}>
      <div className="rb-org-stat-top"><span>{title}</span><span className="rb-org-stat-icon"><Icon size={20} /></span></div>
      <strong>{value}</strong>
      <small>{subtext}</small>
    </article>
  );
}

function EventTile({ event, onEdit, onSales }) {
  const capacity = event.tiers.reduce((sum, tier) => sum + Number(tier.quantity || 0), 0);
  const percent = capacity ? Math.min(100, Math.round((event.sold / capacity) * 100)) : 0;
  return (
    <article className="rb-org-event-tile">
      <div className="rb-org-event-cover">
        {event.images[0]?.url ? <img src={event.images[0].url} alt={`${event.title} cover`} /> : <span className="rb-org-cover-art"><Ticket size={43} /><span>RAYBOOK EXPERIENCES</span></span>}
        <span className={`rb-org-event-status ${event.isSample ? "rb-org-sample-status" : ""}`}>{event.isSample ? "DEMO EVENT" : "SAVED DRAFT"}</span>
      </div>
      <div className="rb-org-event-content">
        <span className="rb-org-eyebrow">{event.category}</span>
        <h3>{event.title}</h3>
        <div className="rb-org-event-meta"><span><CalendarDays size={15} />{formatDate(event.date)}</span><span><MapPin size={15} />{event.venue}, {event.city}</span></div>
        <div className="rb-org-progress-header"><span>Tickets sold</span><strong>{event.sold} / {capacity}</strong></div>
        <div className="rb-org-progress" role="progressbar" aria-valuenow={event.sold} aria-valuemin={0} aria-valuemax={Math.max(capacity, 1)} aria-label={`${event.title} tickets sold`}><span style={{ width: `${percent}%` }} /></div>
        <button type="button" className="rb-org-tile-action" onClick={() => event.isSample ? onSales() : onEdit(event)}>
          {event.isSample ? "View sample sales" : "Edit draft"} {event.isSample ? <ChevronRight size={17} /> : <Pencil size={15} />}
        </button>
      </div>
    </article>
  );
}

export default function OrganiserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [events, setEvents] = useState([demoEvent]);
  const [form, setForm] = useState(blankForm);
  const [editingId, setEditingId] = useState(null);
  const [notice, setNotice] = useState("");
  const [uploadError, setUploadError] = useState("");
  const objectUrls = useRef(new Set());

  useEffect(() => () => {
    objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrls.current.clear();
  }, []);

  const stats = useMemo(() => {
    const totalSold = events.reduce((sum, event) => sum + event.sold, 0);
    const capacity = events.reduce((sum, event) => sum + event.tiers.reduce((n, tier) => n + Number(tier.quantity || 0), 0), 0);
    const revenue = events.reduce((sum, event) => sum + (event.isSample ? event.sold * Number(event.tiers[0]?.price || 0) : 0), 0);
    return { totalSold, capacity, revenue, buyers: 42 };
  }, [events]);

  function openCreate() {
    setEditingId(null);
    setForm(blankForm());
    setNotice("");
    setUploadError("");
    setActiveTab("create");
  }

  function editEvent(event) {
    setForm({
      title: event.title, category: event.category, date: event.date, time: event.time,
      venue: event.venue, city: event.city, description: event.description,
      images: [...event.images], tiers: event.tiers.map((tier) => ({ ...tier })),
    });
    setEditingId(event.id);
    setNotice("");
    setUploadError("");
    setActiveTab("create");
  }

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setNotice("");
  }

  function addTier() {
    setForm((prev) => ({ ...prev, tiers: [...prev.tiers, { id: cryptoId(), name: "", price: "", quantity: "" }] }));
  }

  function updateTier(id, field, value) {
    setForm((prev) => ({ ...prev, tiers: prev.tiers.map((tier) => tier.id === id ? { ...tier, [field]: value } : tier) }));
  }

  function removeTier(id) {
    setForm((prev) => ({ ...prev, tiers: prev.tiers.length > 1 ? prev.tiers.filter((tier) => tier.id !== id) : prev.tiers }));
  }

  function addImages(e) {
    const selected = Array.from(e.target.files || []);
    e.target.value = "";
    setUploadError("");
    const available = Math.max(0, 5 - form.images.length);
    if (selected.length > available) { setUploadError("You can upload a maximum of five images."); return; }
    if (selected.some((file) => !file.type.startsWith("image/") || file.size > 5 * 1024 * 1024)) {
      setUploadError("Please select image files no larger than 5 MB each."); return;
    }
    const images = selected.map((file) => {
      const url = URL.createObjectURL(file);
      objectUrls.current.add(url);
      return { id: cryptoId(), name: file.name, url };
    });
    setForm((prev) => ({ ...prev, images: [...prev.images, ...images] }));
  }

  function removeImage(id) {
    // Keep the URL alive if it is used by a previously saved draft.
    setForm((prev) => ({ ...prev, images: prev.images.filter((image) => image.id !== id) }));
  }

  function saveDraft(e) {
    e.preventDefault();
    if (form.tiers.some((tier) => !tier.name.trim() || Number(tier.price) <= 0 || !Number.isInteger(Number(tier.quantity)) || Number(tier.quantity) < 1)) {
      setNotice("Please give every ticket type a name, a positive price and a whole-number quantity.");
      return;
    }
    const draft = {
      ...form,
      title: form.title.trim(), venue: form.venue.trim(), city: form.city.trim(),
      tiers: form.tiers.map((tier) => ({ ...tier, name: tier.name.trim(), price: Number(tier.price), quantity: Number(tier.quantity) })),
      id: editingId || cryptoId(), sold: 0, buyers: 0, status: "Draft", isSample: false,
    };
    setEvents((prev) => editingId ? prev.map((event) => event.id === editingId ? draft : event) : [...prev, draft]);
    setEditingId(null);
    setForm(blankForm());
    setNotice("");
    setActiveTab("events");
  }

  const overview = activeTab === "overview";
  const heading = { overview: "Your organiser overview", events: "Your event listings", create: editingId ? "Edit event draft" : "Create a new event", sales: "Ticket sales" }[activeTab];
  return (
    <PageTransition>
      <main className="rb-org-page">
        <div className="rb-org-shell">
          <aside className="rb-org-sidebar" aria-label="Organiser dashboard navigation">
            <div className="rb-org-sidebar-brand"><BrandMark /><div><strong>RAYBOOK</strong><small>ORGANISER STUDIO</small></div></div>
            <div className="rb-org-side-caption">YOUR WORKSPACE</div>
            <nav className="rb-org-side-nav">
              {menuItems.map(({ id, label, Icon }) => (
                <button key={id} type="button" aria-current={activeTab === id ? "page" : undefined} className={`rb-org-nav-item ${activeTab === id ? "rb-org-nav-active" : ""}`} onClick={() => { setActiveTab(id); setNotice(""); }}><Icon size={19} /><span>{label}</span>{activeTab === id && <ChevronRight size={15} className="rb-org-nav-arrow" />}</button>
              ))}
            </nav>
            <div className="rb-org-sidebar-bottom"><ShieldCheck size={22} /><strong>Approval-based access</strong><p>Only approved organisers will be able to use this workspace when backend permissions are enabled.</p><span>DESIGN PREVIEW ONLY</span></div>
          </aside>

          <div className="rb-org-main">
            <header className="rb-org-topbar"><div><span className="rb-org-eyebrow">ORGANISER WORKSPACE</span><h1>{heading}</h1><p>Plan your experiences, manage ticket types and follow your event performance.</p></div><span className="rb-org-preview-pill"><span /> Preview mode</span></header>
            <div className="rb-org-mobile-tabs" aria-label="Dashboard sections">{menuItems.map(({ id, label }) => <button key={id} type="button" className={activeTab === id ? "rb-org-mobile-active" : ""} onClick={() => {setActiveTab(id); setNotice("");}}>{label}</button>)}</div>

            {overview && <>
              <section className="rb-org-hero"><div className="rb-org-hero-copy"><span className="rb-org-hero-label">WELCOME TO RAYBOOK STUDIO</span><h2>Create experiences<br /><em>worth remembering.</em></h2><p>Your space to turn ideas into memorable events. Add stunning visuals, create ticket types and keep an eye on your audience.</p><button type="button" className="rb-org-primary" onClick={openCreate}><Plus size={18} /> Create an event <ArrowRight size={18} /></button></div><div className="rb-org-hero-emblem"><div className="rb-org-orbit rb-org-orbit-one" /><div className="rb-org-orbit rb-org-orbit-two" /><BrandMark large /><span>BOOK. CONNECT. CELEBRATE.</span></div></section>
              <div className="rb-org-section-head"><div><span className="rb-org-eyebrow">AT A GLANCE</span><h2>Your numbers</h2></div><span className="rb-org-demo-label">Illustrative sales data</span></div>
              <div className="rb-org-stats-grid"><StatCard Icon={CalendarDays} title="Event listings" value={events.length.toString().padStart(2, "0")} subtext="Includes a demo event and saved drafts" index={0}/><StatCard Icon={Ticket} title="Tickets sold" value={stats.totalSold.toString()} subtext={`of ${stats.capacity} total tickets across listings`} index={1}/><StatCard Icon={UsersRound} title="Ticket buyers" value={stats.buyers.toString()} subtext="Example attendees, not real people" index={2}/><StatCard Icon={CircleDollarSign} title="Ticket revenue" value={formatMoney(stats.revenue)} subtext="Illustrative gross ticket value" index={3}/></div>
              <div className="rb-org-overview-grid"><section className="rb-org-panel"><div className="rb-org-panel-title"><div><span className="rb-org-eyebrow">EVENT PERFORMANCE</span><h3>Ticket momentum</h3></div><TrendingUp size={21} /></div><p className="rb-org-muted">Sample tickets sold over seven days</p><div className="rb-org-mini-chart" aria-label="Illustrative ticket sales: Monday 5, Tuesday 8, Wednesday 6, Thursday 12, Friday 10, Saturday 9, Sunday 14">{[5,8,6,12,10,9,14].map((count, i) => <div className="rb-org-bar-column" key={i}><span>{count}</span><div className="rb-org-bar-track"><div style={{height: `${count / 14 * 100}%`}} /></div><small>{["M","T","W","T","F","S","S"][i]}</small></div>)}</div></section><section className="rb-org-panel rb-org-panel-highlight"><div className="rb-org-panel-title"><div><span className="rb-org-eyebrow">GET STARTED</span><h3>Ready to host?</h3></div><ArrowDownRight size={23} /></div><p>Upload your event photos, enter the location and schedule, then create ticket prices. Your listing will be saved as a draft in this preview.</p><button type="button" className="rb-org-text-button" onClick={openCreate}>Set up your next experience <ArrowRight size={17}/></button><div className="rb-org-small-spark">✳</div></section></div>
              <div className="rb-org-section-head"><div><span className="rb-org-eyebrow">YOUR COLLECTION</span><h2>Recent events</h2></div><button type="button" className="rb-org-text-button" onClick={() => setActiveTab("events")}>All events <ArrowRight size={17}/></button></div><div className="rb-org-event-grid">{events.slice(-2).map((event) => <EventTile key={event.id} event={event} onEdit={editEvent} onSales={() => setActiveTab("sales")}/>)}</div>
            </>}

            {activeTab === "events" && <><div className="rb-org-section-head rb-org-section-head-first"><div><span className="rb-org-eyebrow">YOUR COLLECTION</span><h2>Manage your listings</h2><p className="rb-org-muted">Drafts you create here are kept only until you refresh the page.</p></div><button type="button" className="rb-org-primary" onClick={openCreate}><Plus size={18}/>New event</button></div><div className="rb-org-event-grid">{events.map((event) => <EventTile key={event.id} event={event} onEdit={editEvent} onSales={() => setActiveTab("sales")}/>)}</div></>}

            {activeTab === "create" && <><div className="rb-org-edit-banner"><ShieldCheck size={21}/><div><strong>Draft editor · Preview environment</strong><span>Saving here does not publish an event, charge anyone, or write to a database.</span></div></div><form className="rb-org-form" onSubmit={saveDraft}>
              <section className="rb-org-form-panel"><div className="rb-org-form-head"><span className="rb-org-number">01</span><div><h2>Tell us about your event</h2><p>Help guests imagine the experience before they book.</p></div></div><div className="rb-org-fields"><label className="rb-org-field rb-org-full">Event title<input required maxLength={100} value={form.title} onChange={(e) => setField("title", e.target.value)} placeholder="e.g. Sunset Sip & Paint" /></label><label className="rb-org-field">Category<select value={form.category} onChange={(e) => setField("category", e.target.value)}><option>Sip & Paint</option><option>Music</option><option>Lifestyle</option><option>Food & Drink</option><option>Arts & Culture</option><option>Other</option></select></label><label className="rb-org-field">Event date<input type="date" required value={form.date} onChange={(e) => setField("date", e.target.value)} /></label><label className="rb-org-field">Start time<input type="time" required value={form.time} onChange={(e) => setField("time", e.target.value)} /></label><label className="rb-org-field">Venue name<input required maxLength={100} value={form.venue} onChange={(e) => setField("venue", e.target.value)} placeholder="e.g. The Garden Studio" /></label><label className="rb-org-field rb-org-full">City / area<input required maxLength={100} value={form.city} onChange={(e) => setField("city", e.target.value)} placeholder="e.g. Westlands, Nairobi" /></label><label className="rb-org-field rb-org-full">Event description<textarea required rows={5} minLength={20} maxLength={3000} value={form.description} onChange={(e) => setField("description", e.target.value)} placeholder="Describe what guests can expect, what is included and why they should attend..." /><small>{form.description.length}/3000 characters</small></label></div></section>
              <section className="rb-org-form-panel"><div className="rb-org-form-head"><span className="rb-org-number">02</span><div><h2>Event photography</h2><p>Add up to five images. The first image becomes the cover photo.</p></div></div><label className="rb-org-upload-zone" htmlFor="rb-org-image-upload"><ImagePlus size={28}/><strong>Choose event images</strong><span>JPG, PNG, WEBP or other browser-supported images · up to 5 MB each</span><span className="rb-org-upload-cta">Browse images <ArrowRight size={15}/></span></label><input id="rb-org-image-upload" className="rb-org-visually-hidden" type="file" accept="image/*" multiple onChange={addImages}/>{uploadError && <p className="rb-org-error" role="alert">{uploadError}</p>}{form.images.length > 0 && <div className="rb-org-image-grid">{form.images.map((image, index) => <div className="rb-org-image-thumb" key={image.id}><img src={image.url} alt={`Uploaded event preview ${index + 1}`} />{index === 0 && <span>Cover</span>}<button type="button" aria-label={`Remove ${image.name}`} onClick={() => removeImage(image.id)}><X size={16}/></button></div>)}</div>}</section>
              <section className="rb-org-form-panel"><div className="rb-org-form-head"><span className="rb-org-number">03</span><div><h2>Ticket types & pricing</h2><p>Create different tiers, for example General Admission and VIP.</p></div></div><div className="rb-org-tier-list">{form.tiers.map((tier, index) => <div className="rb-org-tier" key={tier.id}><div className="rb-org-tier-heading"><strong>Ticket type {index + 1}</strong>{form.tiers.length > 1 && <button type="button" onClick={() => removeTier(tier.id)}><Trash2 size={15}/> Remove</button>}</div><div className="rb-org-fields rb-org-tier-fields"><label className="rb-org-field">Ticket name<input required maxLength={60} value={tier.name} onChange={(e) => updateTier(tier.id, "name", e.target.value)} placeholder="General Admission" /></label><label className="rb-org-field">Price (KES)<input required type="number" min="1" step="1" value={tier.price} onChange={(e) => updateTier(tier.id, "price", e.target.value)} placeholder="1200" /></label><label className="rb-org-field">Available quantity<input required type="number" min="1" step="1" value={tier.quantity} onChange={(e) => updateTier(tier.id, "quantity", e.target.value)} placeholder="100" /></label></div></div>)}</div><button type="button" className="rb-org-add-tier" onClick={addTier}><Plus size={17}/> Add another ticket type</button></section>
              {notice && <p className="rb-org-error" role="alert">{notice}</p>}
              <div className="rb-org-form-actions"><button type="button" className="rb-org-secondary" onClick={() => setActiveTab("events")}>Cancel</button><button type="submit" className="rb-org-primary"><Save size={18}/>{editingId ? "Update draft" : "Save event draft"}</button></div>
            </form></>}

            {activeTab === "sales" && <><div className="rb-org-edit-banner"><BarChart3 size={21}/><div><strong>Sample ticket reporting</strong><span>The figures and orders below are fabricated for design testing. Real ticket tracking will arrive with your backend.</span></div></div><div className="rb-org-stats-grid rb-org-sales-stats"><StatCard Icon={Ticket} title="Tickets sold" value="48" subtext="Example event only"/><StatCard Icon={UsersRound} title="Unique buyers" value="42" subtext="Illustrative customer count" index={1}/><StatCard Icon={CircleDollarSign} title="Gross sales" value="KES 57,600" subtext="Before any charges or settlement" index={2}/><StatCard Icon={Clock3} title="Available tickets" value="72" subtext="Of 120 demo tickets" index={3}/></div><section className="rb-org-panel rb-org-sales-panel"><div className="rb-org-panel-title"><div><span className="rb-org-eyebrow">TRANSACTIONS</span><h3>Recent sample purchases</h3></div><span className="rb-org-demo-label">Demo entries</span></div><div className="rb-org-table-scroll"><table className="rb-org-table"><thead><tr><th>Order</th><th>Buyer</th><th>Ticket</th><th>Quantity</th><th>Gross amount</th><th>Date</th></tr></thead><tbody>{demoOrders.map((order) => <tr key={order.id}><td><strong>{order.id}</strong></td><td>{order.customer}</td><td>{order.tier}</td><td>{order.tickets}</td><td>{formatMoney(order.amount)}</td><td>{order.date}</td></tr>)}</tbody></table></div></section></>}
            <footer className="rb-org-footer"><span><CheckCircle2 size={15}/> Built for approved Raybook organisers</span><span>Design preview · No live database connection</span></footer>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
