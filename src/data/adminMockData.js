// RAYBOOK ADMIN — DEMONSTRATION DATA ONLY.
// Every number, person, payment and event in this file is fictional.
export const INITIAL_ORGANISERS = [
  { id: 'org-01', name: 'Studio Collective', contact: 'Amina W.', email: 'studio@example.com', city: 'Nairobi', initials: 'SC', status: 'approved', verified: true, commission: 10, joined: '2026-09-18', note: 'Partnership terms confirmed.' },
  { id: 'org-02', name: 'Urban Pulse Events', contact: 'Brian O.', email: 'urban@example.com', city: 'Nairobi', initials: 'UP', status: 'approved', verified: true, commission: 12, joined: '2026-09-23', note: 'Partnership terms confirmed.' },
  { id: 'org-03', name: 'Weekend Society', contact: 'Faith M.', email: 'weekend@example.com', city: 'Nakuru', initials: 'WS', status: 'pending', verified: false, commission: 10, joined: '2026-10-11', note: 'Awaiting agreement and identity verification.' },
  { id: 'org-04', name: 'Afterglow Productions', contact: 'Kevin N.', email: 'afterglow@example.com', city: 'Eldoret', initials: 'AP', status: 'approved', verified: true, commission: 10, joined: '2026-09-12', note: 'Partnership terms confirmed.' },
];

export const INITIAL_EVENTS = [
  { id: 'evt-1001', title: 'Canvas & Conversations', category: 'Sip & Paint', organiserId: 'org-01', city: 'Nairobi', venue: 'The Garden Studio', date: '2026-11-21', time: '17:00', submitted: '2026-10-12', status: 'pending_review', capacity: 120, ticketTiers: [{name:'General', price:1200, quantity:100},{name:'VIP',price:2000,quantity:20}], description: 'An expressive evening of painting, music and conversations. Every ticket includes painting materials and a guided creative session.', images: ['Poster design','Venue gallery','Painting activities'], sales: 0, published: false },
  { id: 'evt-1002', title: 'The Rooftop Sessions', category: 'Music', organiserId: 'org-02', city: 'Nairobi', venue: 'Skyline Terrace', date: '2026-11-28', time: '18:30', submitted: '2026-10-12', status: 'pending_review', capacity: 240, ticketTiers: [{name:'Early bird',price:1500,quantity:80},{name:'Regular',price:2200,quantity:160}], description: 'An intimate rooftop music experience featuring live performances, curated sounds and panoramic city views.', images: ['Main poster','Rooftop setup'], sales: 0, published: false },
  { id: 'evt-1003', title: 'Golden Hour Picnic', category: 'Lifestyle', organiserId: 'org-04', city: 'Eldoret', venue: 'Acacia Gardens', date: '2026-12-05', time: '15:00', submitted: '2026-10-11', status: 'pending_review', capacity: 100, ticketTiers: [{name:'Admission',price:1800,quantity:100}], description: 'A golden-hour outdoor escape with curated picnic baskets, music and memorable moments.', images: ['Main poster','Picnic grounds'], sales: 0, published: false },
  { id: 'evt-1004', title: 'Creative Nights: Sip & Paint', category: 'Sip & Paint', organiserId: 'org-01', city: 'Nairobi', venue: 'The Garden Studio', date: '2026-11-07', time: '16:00', submitted: '2026-10-01', status: 'published', capacity: 120, ticketTiers: [{name:'General Admission',price:1200,quantity:120}], description: 'An evening of colour, good company and fresh inspiration.', images:['Main poster'], sales: 78, published: true, approvedOn: '2026-10-02' },
  { id: 'evt-1005', title: 'Midnight Frequencies', category: 'Music', organiserId: 'org-02', city: 'Nairobi', venue: 'The Atrium', date: '2026-11-14', time: '20:00', submitted: '2026-09-30', status: 'published', capacity: 220, ticketTiers: [{name:'Regular',price:1800,quantity:180},{name:'VIP',price:3000,quantity:40}], description: 'An immersive night of sounds with some of the city’s favourite selectors.', images:['Main poster'], sales: 154, published: true, approvedOn: '2026-10-01' },
  { id: 'evt-1006', title: 'Art in the Courtyard', category: 'Sip & Paint', organiserId: 'org-04', city: 'Eldoret', venue: 'Courtyard House', date: '2026-12-12', time: '14:00', submitted: '2026-10-08', status: 'changes_requested', capacity: 80, ticketTiers: [{name:'General',price:1000,quantity:80}], description: 'An open-air creative afternoon with local artists.', images:['Main poster'], sales: 0, published: false, decisionNote:'Please confirm the venue address and upload a higher-resolution cover image.' },
  { id: 'evt-1007', title: 'Sunday Social Club', category: 'Lifestyle', organiserId: 'org-04', city: 'Eldoret', venue: 'The Courtyard', date: '2026-12-19', time: '14:00', submitted: '2026-10-09', status: 'approved', capacity: 90, ticketTiers: [{name:'General',price:1500,quantity:90}], description: 'A laid-back social experience with shared activities and good food.', images:['Main poster'], sales: 0, published: false, approvedOn:'2026-10-10' },
];

export const INITIAL_ORDERS = [
  {id:'RB-10483',customer:'Alex N.',eventId:'evt-1004',tier:'General Admission',qty:2,amount:2400,status:'paid',date:'2026-10-12'},
  {id:'RB-10482',customer:'Michelle K.',eventId:'evt-1005',tier:'VIP',qty:1,amount:3000,status:'paid',date:'2026-10-12'},
  {id:'RB-10481',customer:'James T.',eventId:'evt-1005',tier:'Regular',qty:2,amount:3600,status:'paid',date:'2026-10-11'},
  {id:'RB-10480',customer:'Sharon A.',eventId:'evt-1004',tier:'General Admission',qty:1,amount:1200,status:'pending',date:'2026-10-11'},
  {id:'RB-10479',customer:'Dan M.',eventId:'evt-1004',tier:'General Admission',qty:2,amount:2400,status:'refunded',date:'2026-10-10'},
  {id:'RB-10478',customer:'Sarah W.',eventId:'evt-1005',tier:'Regular',qty:3,amount:5400,status:'paid',date:'2026-10-10'},
  {id:'RB-10477',customer:'Kevin J.',eventId:'evt-1004',tier:'General Admission',qty:1,amount:1200,status:'failed',date:'2026-10-09'},
];

export const DEMO_TREND = [
  {label:'Mon', tickets:18, revenue:21600},
  {label:'Tue', tickets:24, revenue:30000},
  {label:'Wed', tickets:20, revenue:26400},
  {label:'Thu', tickets:39, revenue:53400},
  {label:'Fri', tickets:34, revenue:46800},
  {label:'Sat', tickets:57, revenue:78600},
  {label:'Sun', tickets:47, revenue:64200},
];

export const SECTIONS = [
  {id:'overview', label:'Overview', icon:'LayoutDashboard'},
  {id:'approvals', label:'Approvals', icon:'ShieldCheck'},
  {id:'events', label:'All events', icon:'CalendarDays'},
  {id:'organisers', label:'Organisers', icon:'UsersRound'},
  {id:'tickets', label:'Tickets & bookings', icon:'Ticket'},
  {id:'customers', label:'Customers', icon:'UserRound'},
  {id:'payments', label:'Payments & revenue', icon:'Wallet'},
  {id:'reports', label:'Reports', icon:'ChartNoAxesCombined'},
  {id:'settings', label:'Settings', icon:'Settings2'},
];

export const EVENT_STATUS = {
  pending_review: 'Pending review', changes_requested: 'Changes requested', rejected: 'Rejected', approved: 'Approved', published: 'Published', paused: 'Paused', completed:'Completed', cancelled:'Cancelled', draft:'Draft'
};

export const money = (value) => `KES ${Number(value || 0).toLocaleString('en-KE', {maximumFractionDigits:0})}`;
export const shortDate = (value) => value ? new Date(`${value}T12:00:00`).toLocaleDateString('en-KE',{day:'numeric',month:'short',year:'numeric'}) : '—';
export const findOrganiser = (organisers, id) => organisers.find(o => o.id === id);
