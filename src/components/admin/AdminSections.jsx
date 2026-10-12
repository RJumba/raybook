import React, {useMemo,useState} from 'react';
import {
  ArrowRight, CheckCheck, ChevronRight, Clock3, CircleCheck, Eye, FileDown,
  FileSearch, CalendarDays, ShieldCheck, Ticket, UsersRound, Wallet, CreditCard,
  TrendingUp, ArrowUpRight, ClipboardList, Search, AlertTriangle, SlidersHorizontal,
  ExternalLink, CheckCircle2, CirclePause, Play, RotateCcw, BadgeCheck,
  ChartNoAxesCombined, FileText, Info, Mail, Settings2, ImagePlus, X, RefreshCcw, UserRound
} from 'lucide-react';
import {money,shortDate,findOrganiser,DEMO_TREND} from '../../data/adminMockData';
import {Status, Poster, Metric, Empty, Panel, SectionTitle, ActionLink, TrendChart, SearchBox, SelectFilter, formatNumber} from './AdminPrimitives';

const EVENT_OPTIONS = [
  {value:'all',label:'All statuses'},
  {value:'pending_review',label:'Pending review'},
  {value:'approved',label:'Approved'},
  {value:'published',label:'Published'},
  {value:'changes_requested',label:'Changes requested'},
  {value:'paused',label:'Paused'},
  {value:'rejected',label:'Rejected'},
];

function csvDownload(filename,headers,rows){
  const escape = v => { const raw=String(v??''); const safe=/^[=+@-]/.test(raw)?`'${raw}`:raw; return `"${safe.replace(/"/g,'""')}"`; };
  const contents = [headers,...rows].map(r=>r.map(escape).join(',')).join('\r\n');
  const blob = new Blob(['\uFEFF'+contents],{type:'text/csv;charset=utf-8;'});
  const link = document.createElement('a');
  const url=URL.createObjectURL(blob);link.href=url;link.download=filename;link.click();
  window.setTimeout(()=>URL.revokeObjectURL(url),1000);
}

export function AdminOverview({events,organisers,orders,navigate,openEvent}) {
  const pending = events.filter(e=>e.status==='pending_review');
  const pendingOrgs = organisers.filter(o=>o.status==='pending');
  const paid = orders.filter(o=>o.status==='paid');
  const paidAmount = paid.reduce((s,o)=>s+o.amount,0);
  const sold=events.filter(e=>e.status==='published').reduce((s,e)=>s+(e.sales||0),0);
  const published=events.filter(e=>e.status==='published');
  const [chartMetric,setChartMetric]=useState('tickets');
  return <div className="rb-admin-stack">
    <div className="rb-admin-welcome">
      <div className="rb-admin-welcome-copy"><span className="rb-admin-welcome-kicker"><span className="rb-admin-live-dot"/> YOUR CONTROL CENTRE</span>
        <h2>Good to have you <em>back.</em></h2><p>Oversee events, approve organisers, and keep every Raybook experience running beautifully.</p>
        <button className="rb-admin-btn rb-admin-btn-light" onClick={()=>navigate('approvals')}>Review pending events <ArrowRight size={16}/></button>
      </div>
      <div className="rb-admin-hero-symbol" aria-hidden="true"><span>R</span><i/></div>
    </div>
    <div className="rb-admin-metric-grid">
      <Metric label="Pending event reviews" value={pending.length} sub="Needs your decision" Icon={ShieldCheck} tone="red"/>
      <Metric label="Published experiences" value={published.length} sub="Currently on the platform" Icon={CalendarDays}/>
      <Metric label="Tickets sold (sample)" value={formatNumber(sold)} sub="Illustrative event totals" Icon={Ticket}/>
      <Metric label="Paid sample orders" value={money(paidAmount)} sub="Based on the demo ledger" Icon={Wallet} tone="green"/>
    </div>
    <div className="rb-admin-overview-grid">
      <Panel title="Ticket sales momentum" subtitle="Illustrative activity from the last 7 days" action={<div className="rb-admin-toggle"><button className={chartMetric==='tickets'?'selected':''} onClick={()=>setChartMetric('tickets')}>Tickets</button><button className={chartMetric==='revenue'?'selected':''} onClick={()=>setChartMetric('revenue')}>Revenue</button></div>}>
        <div className="rb-admin-chart-summary"><strong>{chartMetric==='tickets'?'239':money(321000)}</strong><span><TrendingUp size={14}/> Demo 7-day trend</span></div><TrendChart mode={chartMetric}/>
      </Panel>
      <Panel title="Your attention is needed" subtitle="Keep the platform moving" className="rb-admin-attention">
        <div className="rb-admin-attention-item"><span className="rb-admin-attention-icon"><ShieldCheck size={19}/></span><div><strong>{pending.length} event{pending.length!==1?'s':''} awaiting approval</strong><p>Review details before any listing goes live.</p></div><button aria-label="Review events" onClick={()=>navigate('approvals')}><ChevronRight size={18}/></button></div>
        <div className="rb-admin-attention-item"><span className="rb-admin-attention-icon rb-admin-attention-muted"><UsersRound size={19}/></span><div><strong>{pendingOrgs.length} organiser application{pendingOrgs.length!==1?'s':''}</strong><p>Confirm agreements and verification.</p></div><button aria-label="View organisers" onClick={()=>navigate('organisers')}><ChevronRight size={18}/></button></div>
        <div className="rb-admin-attention-item"><span className="rb-admin-attention-icon rb-admin-attention-muted"><CheckCircle2 size={19}/></span><div><strong>{events.filter(e=>e.status==='approved').length} approved, not published</strong><p>Ready for your final publish action.</p></div><button aria-label="View approved events" onClick={()=>navigate('events')}><ChevronRight size={18}/></button></div>
      </Panel>
    </div>
    <div className="rb-admin-overview-grid rb-admin-overview-lower">
      <Panel title="Latest submissions" subtitle="Most recent events waiting for review" action={<ActionLink onClick={()=>navigate('approvals')}>View all</ActionLink>}>
        {pending.length? <div className="rb-admin-submissions">{pending.slice(0,3).map(e=><button key={e.id} className="rb-admin-submission" onClick={()=>openEvent(e)}><Poster event={e}/><span className="rb-admin-submission-main"><strong>{e.title}</strong><small>{findOrganiser(organisers,e.organiserId)?.name} · {shortDate(e.date)}</small></span><ChevronRight size={17}/></button>)}</div>:<Empty title="Everything reviewed" detail="No event submissions are waiting for your decision."/>}
      </Panel>
      <Panel title="Platform snapshot" subtitle="A quick view of the Raybook network">
        <div className="rb-admin-snapshot"><div><span>Approved organisers</span><strong>{organisers.filter(o=>o.status==='approved').length}</strong></div><div><span>Listed ticket capacity</span><strong>{formatNumber(events.filter(e=>e.status==='published').reduce((s,e)=>s+e.capacity,0))}</strong></div><div><span>Demo paid bookings</span><strong>{paid.length}</strong></div><div><span>Refunded sample orders</span><strong>{orders.filter(o=>o.status==='refunded').length}</strong></div></div>
        <button className="rb-admin-btn rb-admin-btn-outline rb-admin-btn-wide" onClick={()=>navigate('reports')}>Explore reports <ArrowUpRight size={16}/></button>
      </Panel>
    </div>
  </div>;
}

export function AdminApprovals({events,organisers,openEvent,navigate}){
 const [query,setQuery]=useState('');
 const [tab,setTab]=useState('pending_review');
 const filtered=events.filter(e=>(tab==='all'?['pending_review','changes_requested','approved','rejected'].includes(e.status):e.status===tab) && `${e.title} ${e.city} ${findOrganiser(organisers,e.organiserId)?.name}`.toLowerCase().includes(query.toLowerCase()));
 const tabs=[['pending_review','Pending'],['changes_requested','Changes requested'],['approved','Approved'],['rejected','Rejected'],['all','All decisions']];
 return <div className="rb-admin-stack"><SectionTitle eyebrow="QUALITY CONTROL" title="Event approvals" description="Every new event waits here for your review before it can appear publicly." action={<span className="rb-admin-inline-tip"><ShieldCheck size={15}/> Mandatory review enabled</span>}/>
 <div className="rb-admin-workflow"><div><span className="rb-admin-flow-num">01</span><strong>Organiser submits</strong><small>Event details & pricing</small></div><ChevronRight/><div><span className="rb-admin-flow-num">02</span><strong>You review</strong><small>Check listing quality</small></div><ChevronRight/><div><span className="rb-admin-flow-num">03</span><strong>Approve & publish</strong><small>Go live only after approval</small></div></div>
 <Panel title="Review queue" subtitle="Select an event to inspect the full submission, including ticket tiers and images."><div className="rb-admin-table-toolbar rb-admin-approval-toolbar"><div className="rb-admin-tabs" role="group" aria-label="Event approval status">{tabs.map(([k,l])=><button key={k} className={tab===k?'active':''} onClick={()=>setTab(k)}>{l} <small>{k==='all'?events.filter(e=>['pending_review','changes_requested','approved','rejected'].includes(e.status)).length:events.filter(e=>e.status===k).length}</small></button>)}</div><SearchBox value={query} onChange={setQuery} placeholder="Search submissions"/></div>
 {filtered.length?<div className="rb-admin-approval-list">{filtered.map(e=><article className="rb-admin-approval-card" key={e.id}><Poster event={e}/><div className="rb-admin-approval-content"><span className="rb-admin-card-category">{e.category} • {e.city}</span><h4>{e.title}</h4><p>{findOrganiser(organisers,e.organiserId)?.name} · {shortDate(e.date)} · {e.time}</p><div className="rb-admin-mini-tiers">{e.ticketTiers.map((t,i)=><span key={i}>{t.name}: {money(t.price)}</span>)}</div></div><div className="rb-admin-approval-side"><Status value={e.status}/><button className="rb-admin-btn rb-admin-btn-primary" onClick={()=>openEvent(e)}>Review details <ArrowRight size={15}/></button></div></article>)}</div>:<Empty Icon={CheckCheck} title="Nothing in this queue" detail="New submissions will appear here once organisers send them for review."/>}
 </Panel></div>;
}

export function AdminEvents({events,organisers,openEvent,onStatus,notify}){
 const [query,setQuery]=useState('');const [status,setStatus]=useState('all');
 const filtered=events.filter(e=>(status==='all'||e.status===status) && `${e.title} ${e.city} ${findOrganiser(organisers,e.organiserId)?.name}`.toLowerCase().includes(query.toLowerCase()));
 const download=()=>{csvDownload('raybook-demo-events.csv',['Event ID','Event','Organiser','Status','Date','Capacity','Sold'],filtered.map(e=>[e.id,e.title,findOrganiser(organisers,e.organiserId)?.name,e.status,e.date,e.capacity,e.sales]));notify('Demo event list exported as CSV.');};
 return <div className="rb-admin-stack"><SectionTitle eyebrow="CONTENT OPERATIONS" title="All events" description="Track every listing, its approval status, capacity and visibility." action={<button className="rb-admin-btn rb-admin-btn-outline" onClick={download}><FileDown size={16}/> Export CSV</button>}/>
 <Panel title={`${filtered.length} event${filtered.length===1?'':'s'} found`} subtitle="Event statuses are shared with the approvals workflow."><div className="rb-admin-table-toolbar"><SearchBox value={query} onChange={setQuery} placeholder="Search event or organiser"/><SelectFilter label="Event status" value={status} onChange={setStatus} options={EVENT_OPTIONS}/></div><div className="rb-admin-table-scroll"><table className="rb-admin-table"><thead><tr><th>Experience</th><th>Organiser</th><th>Event date</th><th>Tickets sold</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filtered.map(e=><tr key={e.id}><td><div className="rb-admin-event-cell"><Poster event={e}/><div><strong>{e.title}</strong><small>{e.city} · {e.category}</small></div></div></td><td>{findOrganiser(organisers,e.organiserId)?.name}</td><td>{shortDate(e.date)}</td><td><strong>{e.sales}</strong><small> / {e.capacity}</small></td><td><Status value={e.status}/></td><td><div className="rb-admin-actions"><button className="rb-admin-icon-btn" title="Inspect event" aria-label={`Inspect ${e.title}`} onClick={()=>openEvent(e)}><Eye size={17}/></button>{e.status==='approved'&&<button className="rb-admin-small-action" onClick={()=>onStatus(e.id,'published')}>Publish</button>}{e.status==='published'&&<button className="rb-admin-small-action" onClick={()=>onStatus(e.id,'paused')}>Pause</button>}{e.status==='paused'&&<button className="rb-admin-small-action" onClick={()=>onStatus(e.id,'published')}>Resume</button>}</div></td></tr>)}</tbody></table></div>{!filtered.length&&<Empty/>}</Panel>
 <div className="rb-admin-note"><Info size={18}/><span>Only approved events can be published. Editing material event details after approval will require a fresh review when the backend is connected.</span></div></div>;
}

export function AdminOrganisers({organisers,events,onManage,notify}){
 const [query,setQuery]=useState('');const [status,setStatus]=useState('all');
 const filtered=organisers.filter(o=>(status==='all'||o.status===status)&&`${o.name} ${o.contact} ${o.city}`.toLowerCase().includes(query.toLowerCase()));
 return <div className="rb-admin-stack"><SectionTitle eyebrow="PARTNER NETWORK" title="Organisers" description="Control who is allowed to submit events, and manage each partnership agreement."/>
 <div className="rb-admin-metric-grid rb-admin-metric-grid-three"><Metric label="Approved partners" value={organisers.filter(o=>o.status==='approved').length} sub="Can submit events for review" Icon={UsersRound}/><Metric label="Awaiting verification" value={organisers.filter(o=>o.status==='pending').length} sub="Need agreement and ID checks" Icon={ShieldCheck} tone="red"/><Metric label="Total submitted events" value={events.length} sub="Across all organiser accounts" Icon={CalendarDays}/></div>
 <Panel title="Organiser directory" subtitle="Access is separate from approval of individual events."><div className="rb-admin-table-toolbar"><SearchBox value={query} onChange={setQuery} placeholder="Search organisers"/><SelectFilter value={status} onChange={setStatus} options={[{value:'all',label:'All organisers'},{value:'pending',label:'Pending'},{value:'approved',label:'Approved'},{value:'suspended',label:'Suspended'},{value:'rejected',label:'Rejected'}]}/></div><div className="rb-admin-table-scroll"><table className="rb-admin-table"><thead><tr><th>Organiser</th><th>Contact</th><th>Events</th><th>Commission</th><th>Status</th><th>Review</th></tr></thead><tbody>{filtered.map(o=><tr key={o.id}><td><div className="rb-admin-identity"><span className="rb-admin-avatar">{o.initials}</span><div><strong>{o.name}</strong><small>{o.city}</small></div></div></td><td><strong>{o.contact}</strong><small>{o.email}</small></td><td>{events.filter(e=>e.organiserId===o.id).length}</td><td>{o.commission}%</td><td><Status value={o.status}/></td><td><button className="rb-admin-small-action" onClick={()=>onManage(o)}>Manage <ChevronRight size={14}/></button></td></tr>)}</tbody></table></div>{!filtered.length&&<Empty/>}</Panel></div>;
}

export function AdminTickets({orders,events,notify}){
 const [query,setQuery]=useState('');const [status,setStatus]=useState('all');
 const filtered=orders.filter(o=>(status==='all'||o.status===status) && `${o.id} ${o.customer} ${events.find(e=>e.id===o.eventId)?.title}`.toLowerCase().includes(query.toLowerCase()));
 const download=()=>{csvDownload('raybook-demo-bookings.csv',['Order','Customer','Event','Quantity','Amount','Status','Date'],filtered.map(o=>[o.id,o.customer,events.find(e=>e.id===o.eventId)?.title,o.qty,o.amount,o.status,o.date]));notify('Demo bookings exported as CSV.');};
 return <div className="rb-admin-stack"><SectionTitle eyebrow="BOOKINGS" title="Tickets & bookings" description="Review ticket orders and payment states across every published experience." action={<button className="rb-admin-btn rb-admin-btn-outline" onClick={download}><FileDown size={16}/> Export CSV</button>}/>
 <div className="rb-admin-metric-grid rb-admin-metric-grid-three"><Metric label="Demo paid orders" value={orders.filter(o=>o.status==='paid').length} sub="Payment confirmed" Icon={CheckCircle2}/><Metric label="Awaiting payment" value={orders.filter(o=>o.status==='pending').length} sub="Not confirmed as tickets sold" Icon={Clock3} tone="red"/><Metric label="Refunded orders" value={orders.filter(o=>o.status==='refunded').length} sub="Sample refunded records" Icon={RotateCcw}/></div>
 <Panel title="Booking ledger" subtitle="Statuses are demonstration data. No actual tickets are issued here."><div className="rb-admin-table-toolbar"><SearchBox value={query} onChange={setQuery} placeholder="Search order, event or customer"/><SelectFilter value={status} onChange={setStatus} options={[{value:'all',label:'All payments'},{value:'paid',label:'Paid'},{value:'pending',label:'Pending'},{value:'refunded',label:'Refunded'},{value:'failed',label:'Failed'}]}/></div><div className="rb-admin-table-scroll"><table className="rb-admin-table"><thead><tr><th>Order</th><th>Customer</th><th>Experience</th><th>Tickets</th><th>Amount</th><th>Status</th></tr></thead><tbody>{filtered.map(o=><tr key={o.id}><td><strong>{o.id}</strong><small>{shortDate(o.date)}</small></td><td>{o.customer}</td><td>{events.find(e=>e.id===o.eventId)?.title||'Event unavailable'}</td><td>{o.qty} × {o.tier}</td><td><strong>{money(o.amount)}</strong></td><td><Status value={o.status}/></td></tr>)}</tbody></table></div>{!filtered.length&&<Empty/>}</Panel></div>;
}

export function AdminCustomers({orders,events}) {
 const [query,setQuery]=useState('');
 const buyers=Object.values(orders.reduce((all,o)=>{
   const key=o.customer;
   if(!all[key])all[key]={name:key,orders:0,paid:0,last:o.date,tickets:0};
   all[key].orders++;
   if(o.status==='paid'){all[key].paid+=o.amount;all[key].tickets+=o.qty;}
   if(o.date>all[key].last)all[key].last=o.date;
   return all;
 },{}));
 const filtered=buyers.filter(b=>b.name.toLowerCase().includes(query.toLowerCase()));
 return <div className="rb-admin-stack"><SectionTitle eyebrow="ATTENDEE EXPERIENCE" title="Customers" description="A preview of the customer directory derived from sample bookings; real customer profiles come later."/>
 <div className="rb-admin-metric-grid rb-admin-metric-grid-three"><Metric label="Demo customers" value={buyers.length} sub="Unique sample buyer names" Icon={UsersRound}/><Metric label="With paid orders" value={buyers.filter(b=>b.paid>0).length} sub="Successful sample payment" Icon={CheckCircle2}/><Metric label="Customer tickets" value={buyers.reduce((s,b)=>s+b.tickets,0)} sub="Tickets in paid sample orders" Icon={Ticket}/></div>
 <Panel title="Attendee directory" subtitle="Search customers and review their sample booking activity"><div className="rb-admin-table-toolbar"><SearchBox value={query} onChange={setQuery} placeholder="Search customers"/></div><div className="rb-admin-table-scroll"><table className="rb-admin-table"><thead><tr><th>Customer</th><th>Orders</th><th>Tickets paid</th><th>Paid amount</th><th>Last activity</th></tr></thead><tbody>{filtered.map(b=><tr key={b.name}><td><div className="rb-admin-identity"><span className="rb-admin-avatar">{b.name.slice(0,2).toUpperCase()}</span><strong>{b.name}</strong></div></td><td>{b.orders}</td><td>{b.tickets}</td><td><strong>{money(b.paid)}</strong></td><td>{shortDate(b.last)}</td></tr>)}</tbody></table></div>{!filtered.length&&<Empty/>}</Panel><div className="rb-admin-note"><Info size={18}/><span>Customer data shown here is fictional. Production customer support tools will require purpose-limited access to booking details, personal data and support histories.</span></div></div>;
}

export function AdminPayments({orders,events,organisers,notify}){
 const paid=orders.filter(o=>o.status==='paid');
 const gross=paid.reduce((s,o)=>s+o.amount,0);
 const commission=paid.reduce((s,o)=>{const ev=events.find(e=>e.id===o.eventId);const org=findOrganiser(organisers,ev?.organiserId);return s+o.amount*(org?.commission||0)/100;},0);
 const refund=orders.filter(o=>o.status==='refunded').reduce((s,o)=>s+o.amount,0);
 const byOrg=organisers.map(org=>{const own=paid.filter(o=>events.find(e=>e.id===o.eventId)?.organiserId===org.id);const amount=own.reduce((s,o)=>s+o.amount,0);return {...org,amount,earnings:amount*(1-org.commission/100)};}).filter(o=>o.amount>0);
 return <div className="rb-admin-stack"><SectionTitle eyebrow="FINANCIAL OPERATIONS" title="Payments & revenue" description="Understand gross collections, platform commission and organiser balances."/>
 <div className="rb-admin-metric-grid"><Metric label="Paid sample orders" value={money(gross)} sub="Illustrative ledger only" Icon={Wallet}/><Metric label="Raybook share" value={money(commission)} sub="Before fees and taxes" Icon={TrendingUp} tone="red"/><Metric label="Organiser share" value={money(gross-commission)} sub="Before fees & settlement" Icon={UsersRound}/><Metric label="Refunded amount" value={money(refund)} sub="Separate from paid totals" Icon={CreditCard}/></div>
 <div className="rb-admin-overview-grid"><Panel title="Collection breakdown" subtitle="Calculated only from the small demonstration order ledger"><div className="rb-admin-finance-breakdown"><div><span>Gross sample payments</span><strong>{money(gross)}</strong></div><div><span>Raybook share</span><strong>{money(commission)}</strong></div><div className="rb-admin-split"><span style={{width:`${gross?commission/gross*100:0}%`}}/><span style={{flex:1}}/></div><div className="rb-admin-finance-legend"><span><i/> Raybook</span><span><i/> Organisers</span></div><div><span>Estimated organiser portion</span><strong>{money(gross-commission)}</strong></div></div></Panel>
 <Panel title="Organiser breakdown" subtitle="Sample gross receipts and agreed commission"><div className="rb-admin-settlement-list">{byOrg.map(o=><div key={o.id}><span className="rb-admin-avatar">{o.initials}</span><div><strong>{o.name}</strong><small>{o.commission}% Raybook commission</small></div><strong>{money(o.earnings)}</strong></div>)}{!byOrg.length&&<Empty/>}</div></Panel></div>
 <div className="rb-admin-note"><Info size={18}/><span>These are sample amounts, not real balances or payouts. Production finance will distinguish payment capture, processor charges, tax, refunds, disputes and completed settlements before calculating amounts due.</span></div></div>;
}

export function AdminReports({events,organisers,orders,notify}){
 const live=events.filter(e=>e.status==='published');
 const download=()=>{csvDownload('raybook-demo-report.csv',['Event','Category','Organiser','Capacity','Tickets sold','Utilisation'],events.map(e=>[e.title,e.category,findOrganiser(organisers,e.organiserId)?.name,e.capacity,e.sales,`${e.capacity?Math.round(e.sales/e.capacity*100):0}%`]));notify('Demo performance report exported as CSV.');};
 return <div className="rb-admin-stack"><SectionTitle eyebrow="PLATFORM INTELLIGENCE" title="Reports & analytics" description="Understand which experiences perform well, and where to focus your attention." action={<button className="rb-admin-btn rb-admin-btn-outline" onClick={download}><FileDown size={16}/> Export report</button>}/>
 <div className="rb-admin-overview-grid"><Panel title="Weekly ticket activity" subtitle="Illustrative 7-day performance"><TrendChart/></Panel><Panel title="Events by category" subtitle="All submitted event listings"><div className="rb-admin-category-breakdown">{['Sip & Paint','Music','Lifestyle'].map((cat,i)=>{const count=events.filter(e=>e.category===cat).length;return <div key={cat}><div><strong>{cat}</strong><span>{count} events</span></div><div className="rb-admin-progress"><i style={{width:`${events.length?count/events.length*100:0}%`}}/></div></div>})}</div></Panel></div>
 <Panel title="Published event performance" subtitle="Demo tickets sold compared with available event capacity"><div className="rb-admin-performance-list">{live.map(e=>{const p=Math.min(100,Math.round((e.sales||0)/e.capacity*100));return <div key={e.id}><div><strong>{e.title}</strong><span>{e.sales} / {e.capacity} tickets · {p}%</span></div><div className="rb-admin-progress"><i style={{width:`${p}%`}}/></div></div>})}</div></Panel></div>;
}

export function AdminSettings({settings,onSettings,notify,onReset}){
 return <div className="rb-admin-stack"><SectionTitle eyebrow="ADMINISTRATION" title="Platform settings" description="Preview administrative policies and preferences ahead of backend integration."/>
 <Panel title="Publishing & approvals" subtitle="Business-critical controls"><div className="rb-admin-setting-row"><div className="rb-admin-setting-icon"><ShieldCheck size={20}/></div><div><strong>Review every event before publishing</strong><p>All organisers must receive an explicit admin approval for each listing.</p></div><span className="rb-admin-policy-lock"><CheckCircle2 size={15}/> Required</span></div><div className="rb-admin-setting-row"><div className="rb-admin-setting-icon"><FileText size={20}/></div><div><strong>Changes after approval</strong><p>Material edits should be resubmitted for review when backend enforcement is added.</p></div><span className="rb-admin-policy-lock">Planned</span></div></Panel>
 <Panel title="Your preview preferences" subtitle="Settings on this page are saved locally for the demo"><div className="rb-admin-setting-row"><div className="rb-admin-setting-icon"><Mail size={20}/></div><div><strong>Approval notifications</strong><p>Show alerts in the dashboard when events need review.</p></div><label className="rb-admin-switch"><input type="checkbox" checked={settings.approvalAlerts} onChange={e=>onSettings({...settings,approvalAlerts:e.target.checked})}/><span/><span className="rb-admin-sr">Approval notifications</span></label></div><div className="rb-admin-setting-row"><div className="rb-admin-setting-icon"><Ticket size={20}/></div><div><strong>Sales notifications</strong><p>Preview notification preferences for paid orders.</p></div><label className="rb-admin-switch"><input type="checkbox" checked={settings.salesAlerts} onChange={e=>onSettings({...settings,salesAlerts:e.target.checked})}/><span/><span className="rb-admin-sr">Sales notifications</span></label></div></Panel>
 <Panel title="Developer preview controls" subtitle="A safe place to reset this interactive demonstration"><div className="rb-admin-setting-row"><div className="rb-admin-setting-icon"><RefreshCcw size={20}/></div><div><strong>Reset demo records</strong><p>Restore sample events, organisers and approvals to their original states.</p></div><button className="rb-admin-btn rb-admin-btn-outline" onClick={()=>{if(window.confirm('Reset all local Raybook admin demo data?'))onReset();}}>Reset demo</button></div></Panel>
 <div className="rb-admin-note"><Info size={18}/><span>Real administrator accounts, roles, payment credentials, audit logs and security settings will be managed by Supabase and FastAPI—not stored as frontend-only settings.</span></div></div>;
}

export {csvDownload};
