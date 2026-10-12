import {useEffect, useMemo, useRef, useState} from 'react';
import {
  ArrowRight, Bell, CalendarDays, Check, CheckCheck, ChevronDown, ChevronLeft,
  ChevronRight, CircleAlert, CircleCheck, Clock3, Eye, Image as ImageIcon,
  LayoutDashboard, LockKeyhole, LogOut, Menu, PanelLeftClose, PanelLeftOpen,
  Search, Settings2, ShieldCheck, Ticket, UsersRound, Wallet, X, RotateCcw,
  Send, MapPin, CalendarClock, Tags, Info, CheckCircle2
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import {INITIAL_EVENTS, INITIAL_ORGANISERS, INITIAL_ORDERS, SECTIONS, EVENT_STATUS, findOrganiser, money, shortDate} from '../data/adminMockData';
import {Brand, ICONS, Poster, Status} from '../components/admin/AdminPrimitives';
import {AdminOverview, AdminApprovals, AdminEvents, AdminOrganisers, AdminTickets, AdminCustomers, AdminPayments, AdminReports, AdminSettings} from '../components/admin/AdminSections';
import '../styles/AdminDashboard.css';

const LOCAL_KEY='raybook-admin-demo-v1';
const initialData=()=>({events:INITIAL_EVENTS,organisers:INITIAL_ORGANISERS,orders:INITIAL_ORDERS,settings:{approvalAlerts:true,salesAlerts:false}});
function loadData(){
  try {const stored=JSON.parse(window.localStorage.getItem(LOCAL_KEY)||'null');if(stored && Array.isArray(stored.events)&&Array.isArray(stored.organisers)&&Array.isArray(stored.orders))return {...initialData(),...stored};}catch{/* fall back to demo defaults */}
  return initialData();
}

function AdminEventDialog({event,organiser,onClose,onDecide,onStatus}){
 const [decision,setDecision]=useState('');
 const [note,setNote]=useState('');
 const [validation,setValidation]=useState('');
 useEffect(()=>{setDecision('');setNote('');setValidation('');},[event?.id]);
 if(!event)return null;
 const choose=(choice)=>{setDecision(choice);setValidation('');};
 const confirm=()=>{
   if((decision==='changes_requested'||decision==='rejected')&&!note.trim()){setValidation('Add a reason so the organiser understands the decision.');return;}
   onDecide(event.id,decision,note.trim());
 };
 return <div className="rb-admin-overlay" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><section role="dialog" aria-modal="true" aria-labelledby="rb-admin-event-dialog-title" className="rb-admin-dialog rb-admin-event-dialog">
  <header className="rb-admin-dialog-header"><div><span className="rb-admin-eyebrow">EVENT REVIEW • {event.id.toUpperCase()}</span><h2 id="rb-admin-event-dialog-title">{event.title}</h2></div><button className="rb-admin-icon-btn" aria-label="Close event review" onClick={onClose}><X size={21}/></button></header>
  <div className="rb-admin-dialog-body"><div className="rb-admin-dialog-event-intro"><Poster event={event} large/><div><Status value={event.status}/><h3>{event.title}</h3><p>{event.description}</p><div className="rb-admin-event-facts"><span><CalendarDays size={15}/>{shortDate(event.date)} · {event.time}</span><span><MapPin size={15}/>{event.venue}, {event.city}</span><span><UsersRound size={15}/>{organiser?.name||'Unknown organiser'}</span></div></div></div>
   <div className="rb-admin-dialog-block"><div className="rb-admin-dialog-block-title"><ImageIcon size={17}/><h4>Submitted media</h4><small>{event.images.length} items</small></div><div className="rb-admin-upload-thumbnails">{event.images.map((label,i)=><div key={`${label}-${i}`}><ImageIcon size={17}/><span>{label}</span></div>)}</div><p className="rb-admin-preview-note">These tiles represent the sample organiser's uploaded images. Real media will be displayed here after backend integration.</p></div>
   <div className="rb-admin-dialog-block"><div className="rb-admin-dialog-block-title"><Ticket size={17}/><h4>Ticket pricing & capacity</h4></div><div className="rb-admin-tier-list">{event.ticketTiers.map((t,i)=><div key={`${t.name}-${i}`}><span><strong>{t.name}</strong><small>{t.quantity} tickets available</small></span><strong>{money(t.price)}</strong></div>)}</div><p className="rb-admin-capacity">Total capacity <strong>{event.capacity} tickets</strong></p></div>
   <div className="rb-admin-review-org"><span className="rb-admin-avatar">{organiser?.initials||'?'}</span><div><strong>Organiser verification</strong><p>{organiser?.name||'Unknown'} · {organiser?.status==='approved'?'Approved partner':'Access not approved'}</p></div><Status value={organiser?.status||'pending'}/></div>
   {event.decisionNote&&<div className="rb-admin-previous-note"><strong>Previous review note</strong><p>{event.decisionNote}</p></div>}
   {event.status==='pending_review' && <div className="rb-admin-decision"><h4>Make a review decision</h4><p>Approve, request corrections, or reject this submission.</p><div className="rb-admin-decision-options"><button className={decision==='approved'?'selected':''} onClick={()=>choose('approved')}><CircleCheck size={20}/><strong>Approve</strong><small>Allow publishing</small></button><button className={decision==='changes_requested'?'selected':''} onClick={()=>choose('changes_requested')}><RotateCcw size={20}/><strong>Request changes</strong><small>Return for edits</small></button><button className={decision==='rejected'?'selected':''} onClick={()=>choose('rejected')}><CircleAlert size={20}/><strong>Reject</strong><small>Decline listing</small></button></div>
    {decision && <div className="rb-admin-decision-note"><label htmlFor="rb-admin-decision-comment">{decision==='approved'?'Internal note (optional)':'Reason for decision (required)'}</label><textarea id="rb-admin-decision-comment" rows="3" value={note} onChange={e=>setNote(e.target.value)} placeholder={decision==='approved'?'Add a short review note if needed...':'Explain what needs to change or why the listing was rejected...'}/>{validation&&<p className="rb-admin-inline-error" role="alert">{validation}</p>}</div>}
    <div className="rb-admin-dialog-footer"><button className="rb-admin-btn rb-admin-btn-outline" onClick={onClose}>Cancel</button><button className="rb-admin-btn rb-admin-btn-primary" disabled={!decision || organiser?.status!=='approved'} onClick={confirm}>{decision==='approved'?'Approve listing':decision==='rejected'?'Confirm rejection':decision==='changes_requested'?'Send change request':'Select a decision'} <ArrowRight size={16}/></button></div>{organiser?.status!=='approved'&&<p className="rb-admin-inline-error">This organiser must be approved before their event can be approved.</p>}
   </div>}
   {event.status==='approved'&&<div className="rb-admin-approved-box"><CheckCircle2 size={22}/><div><strong>Approved and ready</strong><p>This event has passed review but is not yet published publicly.</p></div><button className="rb-admin-btn rb-admin-btn-primary" onClick={()=>onStatus(event.id,'published')}>Publish event <ArrowRight size={15}/></button></div>}
   {event.status==='published'&&<div className="rb-admin-approved-box"><CheckCircle2 size={22}/><div><strong>Published listing</strong><p>Customers can discover this event once the backend connects the public listing.</p></div><button className="rb-admin-btn rb-admin-btn-outline" onClick={()=>onStatus(event.id,'paused')}>Pause listing</button></div>}
   {event.status==='paused'&&<div className="rb-admin-approved-box"><Info size={22}/><div><strong>Bookings paused</strong><p>This event is currently marked as paused.</p></div><button className="rb-admin-btn rb-admin-btn-primary" onClick={()=>onStatus(event.id,'published')}>Resume listing</button></div>}
  </div>
 </section></div>;
}

function OrganiserDialog({organiser,onClose,onUpdate}){
 const [verified,setVerified]=useState(!!organiser?.verified);
 const [agreement,setAgreement]=useState(organiser?.status==='approved');
 const [commission,setCommission]=useState(organiser?.commission??10);
 const [reason,setReason]=useState('');
 useEffect(()=>{setVerified(!!organiser?.verified);setAgreement(organiser?.status==='approved');setCommission(organiser?.commission??10);setReason('');},[organiser?.id]);
 if(!organiser)return null;
 return <div className="rb-admin-overlay" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><section className="rb-admin-dialog rb-admin-organiser-dialog" role="dialog" aria-modal="true" aria-labelledby="rb-admin-org-title"><header className="rb-admin-dialog-header"><div><span className="rb-admin-eyebrow">PARTNERSHIP REVIEW</span><h2 id="rb-admin-org-title">Manage organiser</h2></div><button className="rb-admin-icon-btn" aria-label="Close organiser dialog" onClick={onClose}><X size={20}/></button></header><div className="rb-admin-dialog-body"><div className="rb-admin-organiser-profile"><span className="rb-admin-avatar">{organiser.initials}</span><div><h3>{organiser.name}</h3><p>{organiser.contact} · {organiser.email}</p><small>{organiser.city}</small></div><Status value={organiser.status}/></div>
 <div className="rb-admin-partner-fields"><label><span>Agreed Raybook commission (%)</span><input type="number" min="0" max="100" step="0.5" value={commission} onChange={e=>setCommission(e.target.value)}/></label><label className="rb-admin-check-label"><input type="checkbox" checked={verified} onChange={e=>setVerified(e.target.checked)}/><span>Organiser identity and business details verified</span></label><label className="rb-admin-check-label"><input type="checkbox" checked={agreement} onChange={e=>setAgreement(e.target.checked)}/><span>Partnership terms and commercial agreement confirmed</span></label></div>
 <p className="rb-admin-organiser-note">{organiser.note}</p>
 <div className="rb-admin-dialog-footer rb-admin-partner-actions"><button className="rb-admin-btn rb-admin-btn-outline" onClick={onClose}>Cancel</button>{organiser.status==='pending'&&<button className="rb-admin-btn rb-admin-btn-outline rb-admin-btn-danger" onClick={()=>onUpdate(organiser.id,{status:'rejected',note:'Partnership application rejected.'})}>Reject</button>}{organiser.status==='approved'&&<button className="rb-admin-btn rb-admin-btn-outline rb-admin-btn-danger" onClick={()=>onUpdate(organiser.id,{status:'suspended',note:'Organiser access suspended in demo.'})}>Suspend</button>}{organiser.status==='suspended'&&<button className="rb-admin-btn rb-admin-btn-outline" onClick={()=>onUpdate(organiser.id,{status:'approved'})}>Reinstate</button>}<button className="rb-admin-btn rb-admin-btn-primary" disabled={!verified||!agreement||commission===''||!Number.isFinite(Number(commission))||Number(commission)<0||Number(commission)>100} onClick={()=>onUpdate(organiser.id,{status:'approved',verified:true,commission:Number(commission),note:'Partnership terms and verification confirmed.'})}>{organiser.status==='approved'?'Save partner details':'Approve organiser'} <ArrowRight size={15}/></button></div>
 <p className="rb-admin-preview-note">Approval is simulated locally. Server-side role assignment and signed agreements are not yet connected.</p></div></section></div>;
}

export default function AdminDashboard(){
 const [data,setData]=useState(loadData);
 const [section,setSection]=useState('overview');
 const [sidebarCollapsed,setSidebarCollapsed]=useState(false);
 const [menuOpen,setMenuOpen]=useState(false);
 const [eventId,setEventId]=useState(null);
 const [organiserId,setOrganiserId]=useState(null);
 const [notificationOpen,setNotificationOpen]=useState(false);
 const [quickSearch,setQuickSearch]=useState('');
 const [searchOpen,setSearchOpen]=useState(false);
 const [toast,setToast]=useState('');
 const contentRef=useRef(null);
 const {events,organisers,orders,settings}=data;
 const selectedEvent=events.find(e=>e.id===eventId)||null;
 const selectedOrganiser=organisers.find(o=>o.id===organiserId)||null;
 const eventPending=events.filter(e=>e.status==='pending_review');
 const orgPending=organisers.filter(o=>o.status==='pending');
 const matchingEvents=quickSearch.trim()?events.filter(e=>`${e.title} ${e.city}`.toLowerCase().includes(quickSearch.toLowerCase())).slice(0,5):[];

 useEffect(()=>{try{window.localStorage.setItem(LOCAL_KEY,JSON.stringify(data));}catch{/* fallback to session state */}},[data]);
 useEffect(()=>{if(!toast)return;const id=window.setTimeout(()=>setToast(''),3800);return()=>window.clearTimeout(id);},[toast]);
 useEffect(()=>{const onKey=e=>{if(e.key==='Escape'){setEventId(null);setOrganiserId(null);setNotificationOpen(false);setSearchOpen(false);setMenuOpen(false);}};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey);},[]);
 useEffect(()=>{if(eventId||organiserId){document.body.style.overflow='hidden';return()=>{document.body.style.overflow='';}}},[eventId,organiserId]);
 const navigate=(next)=>{setSection(next);setMenuOpen(false);setNotificationOpen(false);setSearchOpen(false);window.scrollTo({top:0,behavior:'smooth'});};
 const showToast=text=>setToast(text);
 const decide=(id,status,note)=>{setData(prev=>({...prev,events:prev.events.map(e=>e.id===id?{...e,status,decisionNote:note||'',approvedOn:status==='approved'?new Date().toISOString().slice(0,10):e.approvedOn}:e)}));setEventId(null);showToast(status==='approved'?'Event approved. Publish it from All events when ready.':status==='changes_requested'?'Change request recorded in demo.':'Event rejected in demo.');};
 const changeStatus=(id,status)=>{setData(prev=>({...prev,events:prev.events.map(e=>{if(e.id!==id)return e;if(status==='published'&&!['approved','paused'].includes(e.status))return e;if(status==='paused'&&e.status!=='published')return e;return {...e,status,published:status==='published'};})}));setEventId(null);showToast(status==='published'?'Event published in the local demo.':'Event paused in the local demo.');};
 const changeOrg=(id,changes)=>{setData(prev=>({...prev,organisers:prev.organisers.map(o=>o.id===id?{...o,...changes}:o)}));setOrganiserId(null);showToast('Organiser record updated in the local demo.');};
 const reset=()=>{setData(initialData());setEventId(null);setOrganiserId(null);showToast('Demo restored to its original sample data.');};
 const getView=()=>{
   const shared={events,organisers,orders,navigate,notify:showToast};
   switch(section){
     case 'overview': return <AdminOverview {...shared} openEvent={e=>setEventId(e.id)}/>;
     case 'approvals': return <AdminApprovals {...shared} openEvent={e=>setEventId(e.id)}/>;
     case 'events': return <AdminEvents {...shared} openEvent={e=>setEventId(e.id)} onStatus={changeStatus}/>;
     case 'organisers':return <AdminOrganisers {...shared} onManage={o=>setOrganiserId(o.id)}/>;
     case 'tickets':return <AdminTickets {...shared}/>;
     case 'customers':return <AdminCustomers {...shared}/>;
     case 'payments':return <AdminPayments {...shared}/>;
     case 'reports':return <AdminReports {...shared}/>;
     case 'settings':return <AdminSettings settings={settings} onSettings={next=>setData(prev=>({...prev,settings:next}))} notify={showToast} onReset={reset}/>;
     default:return null;
   }
 };
 const heading=SECTIONS.find(s=>s.id===section)?.label||'Overview';
 return <PageTransition><main className={`rb-admin ${sidebarCollapsed?'rb-admin-collapsed':''}`} ref={contentRef}>
  {menuOpen&&<button aria-label="Close mobile navigation" className="rb-admin-sidebar-scrim" onClick={()=>setMenuOpen(false)}/>}
  <aside className={`rb-admin-sidebar ${menuOpen?'rb-admin-sidebar-open':''}`} aria-label="Admin dashboard navigation"><div className="rb-admin-sidebar-head"><Brand/><button className="rb-admin-sidebar-collapse" aria-label={sidebarCollapsed?'Expand sidebar':'Collapse sidebar'} onClick={()=>setSidebarCollapsed(v=>!v)}>{sidebarCollapsed?<PanelLeftOpen size={19}/>:<PanelLeftClose size={19}/>}</button><button className="rb-admin-sidebar-mobile-close" onClick={()=>setMenuOpen(false)} aria-label="Close navigation"><X size={20}/></button></div>
    <div className="rb-admin-sidebar-label">WORKSPACE</div><nav className="rb-admin-nav">{SECTIONS.map(s=>{const Icon=ICONS[s.icon];const count=s.id==='approvals'?eventPending.length:s.id==='organisers'?orgPending.length:0;return <button type="button" key={s.id} title={s.label} className={`rb-admin-nav-item ${section===s.id?'active':''}`} onClick={()=>navigate(s.id)} aria-current={section===s.id?'page':undefined}><Icon size={19}/><span>{s.label}</span>{count>0&&<small>{count}</small>}</button>})}</nav>
    <div className="rb-admin-sidebar-bottom"><div className="rb-admin-approval-promise"><ShieldCheck size={19}/><span><strong>Approval-first</strong><small>Every event is reviewed before publication.</small></span></div><div className="rb-admin-sidebar-foot"><span className="rb-admin-profile-avatar">AD</span><span><strong>Raybook Owner</strong><small>Administrator • Preview</small></span><ChevronDown size={16}/></div></div>
  </aside>
  <div className="rb-admin-main"><header className="rb-admin-topbar"><div className="rb-admin-topbar-left"><button className="rb-admin-mobile-menu" aria-label="Open admin navigation" onClick={()=>setMenuOpen(true)}><Menu size={22}/></button><span className="rb-admin-breadcrumb">Raybook <ChevronRight size={14}/> Admin <ChevronRight size={14}/><strong>{heading}</strong></span></div><div className="rb-admin-topbar-right"><div className={`rb-admin-quick-search ${searchOpen?'rb-admin-quick-search-expanded':''}`}><button type="button" className="rb-admin-mobile-search-toggle" aria-label="Toggle event search" onClick={()=>setSearchOpen(v=>!v)}><Search size={17}/></button><input aria-label="Search Raybook events" value={quickSearch} onFocus={()=>setSearchOpen(true)} onChange={e=>{setQuickSearch(e.target.value);setSearchOpen(true);}} placeholder="Search experiences..."/>{searchOpen&&quickSearch.trim()&&<div className="rb-admin-quick-results" role="listbox">{matchingEvents.length?matchingEvents.map(e=><button key={e.id} onClick={()=>{setEventId(e.id);setSearchOpen(false);setQuickSearch('');}}>{e.title}<small>{e.city}</small></button>):<p>No matching events</p>}</div>}</div><div className="rb-admin-notification-wrap"><button className="rb-admin-top-icon" aria-label="Notifications" aria-expanded={notificationOpen} onClick={()=>setNotificationOpen(v=>!v)}><Bell size={19}/>{settings.approvalAlerts&&eventPending.length>0&&<i/>}</button>{notificationOpen&&<div className="rb-admin-notifications"><strong>Attention needed</strong><button onClick={()=>navigate('approvals')}><ShieldCheck size={18}/><span>{eventPending.length} event reviews pending<small>View event approval queue</small></span><ChevronRight size={14}/></button><button onClick={()=>navigate('organisers')}><UsersRound size={18}/><span>{orgPending.length} organiser applications<small>Verify partnership details</small></span><ChevronRight size={14}/></button></div>}</div><span className="rb-admin-profile-avatar rb-admin-top-avatar">AD</span></div></header>
    <div className="rb-admin-content"><div className="rb-admin-pagehead"><div><span className="rb-admin-eyebrow">PLATFORM ADMINISTRATION <span className="rb-admin-eyebrow-dot">•</span> DEMO WORKSPACE</span><h1>{heading}</h1><p>Designed for Raybook's owner and authorised staff.</p></div><span className="rb-admin-demo-chip"><span/> Interactive preview</span></div><div className="rb-admin-view" key={section}>{getView()}</div>
    <footer className="rb-admin-footer"><span>© Raybook • Admin preview</span><span>Sample records · Changes saved in this browser only</span></footer></div>
  </div>
  {selectedEvent&&<AdminEventDialog event={selectedEvent} organiser={findOrganiser(organisers,selectedEvent.organiserId)} onClose={()=>setEventId(null)} onDecide={decide} onStatus={changeStatus}/>}
  {selectedOrganiser&&<OrganiserDialog organiser={selectedOrganiser} onClose={()=>setOrganiserId(null)} onUpdate={changeOrg}/>}
  {toast&&<div className="rb-admin-toast" role="status"><CircleCheck size={19}/>{toast}<button aria-label="Dismiss message" onClick={()=>setToast('')}><X size={16}/></button></div>}
 </main></PageTransition>;
}
