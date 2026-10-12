import React from 'react';
import {
  LayoutDashboard, ShieldCheck, CalendarDays, UsersRound, Ticket, Wallet,
  ChartNoAxesCombined, Settings2, ArrowUpRight, ArrowRight, Search, Bell,
  CheckCircle2, AlertCircle, Clock3, Sparkles, TrendingUp, CreditCard,
  ClipboardCheck, ReceiptText, Image as ImageIcon, BarChart3, CalendarClock, UserRound,
  WalletCards, CalendarCheck, Megaphone, BadgeCheck, FileText,
} from 'lucide-react';
import {EVENT_STATUS, DEMO_TREND, money} from '../../data/adminMockData';

export const ICONS = { LayoutDashboard, ShieldCheck, CalendarDays, UsersRound, Ticket, Wallet, ChartNoAxesCombined, Settings2, UserRound };
export const METRIC_ICONS = {tickets:Ticket, money:WalletCards, event:CalendarDays, organizer:UsersRound, pending:ClipboardCheck, orders:ReceiptText, approved:CalendarCheck, trend:TrendingUp};

export function Brand({hero=false}) {
  return <div className={`rb-admin-brand ${hero?'rb-admin-brand-hero':''}`}>
    <span className="rb-admin-brand-glow" aria-hidden="true" />
    <span className="rb-admin-brand-symbol" aria-label="Raybook logo" role="img">R</span>
    {!hero && <span className="rb-admin-brand-type"><strong>RAYBOOK</strong><small>ADMIN STUDIO</small></span>}
  </div>;
}
export function Status({value}) {
  const title = EVENT_STATUS[value] || ({pending:'Pending approval',approved:'Approved',suspended:'Suspended',paid:'Paid',refunded:'Refunded',failed:'Failed'}[value]) || value;
  return <span className={`rb-admin-status rb-admin-status-${value}`}>{title}</span>;
}
export function Poster({event,large=false}) {
  const label = event?.category || 'Raybook';
  const category = label.toLowerCase().includes('paint')?'paint':label.toLowerCase().includes('music')?'music':'lifestyle';
  return <div className={`rb-admin-poster rb-admin-poster-${category} ${large?'rb-admin-poster-large':''}`} aria-label={`${event?.title || 'Event'} poster placeholder`}>
    <span className="rb-admin-poster-spark rb-admin-poster-spark-one"/><span className="rb-admin-poster-spark rb-admin-poster-spark-two"/>
    <span className="rb-admin-poster-top">RAYBOOK <b>✳</b> EXPERIENCES</span>
    <span className="rb-admin-poster-art">{category==='paint'?'✳':category==='music'?'♫':'✺'}</span>
    <span className="rb-admin-poster-bottom">{event?.title || 'Your experience'}<small>{label}</small></span>
  </div>;
}
export function Metric({label,value,sub,Icon=TrendingUp,tone='default'}) {
  return <article className="rb-admin-metric">
    <div className="rb-admin-metric-head"><span>{label}</span><span className={`rb-admin-metric-icon rb-admin-icon-${tone}`}><Icon size={18}/></span></div>
    <strong>{value}</strong><p>{sub}</p>
  </article>;
}
export function Empty({Icon=Search,title='No results',detail='Try changing your search or filter.'}) {
  return <div className="rb-admin-empty"><div className="rb-admin-empty-icon"><Icon size={23}/></div><strong>{title}</strong><p>{detail}</p></div>;
}
export function SectionTitle({eyebrow,title,description,action}) {
  return <div className="rb-admin-section-title"><div>{eyebrow && <span className="rb-admin-eyebrow">{eyebrow}</span>}<h2>{title}</h2>{description && <p>{description}</p>}</div>{action}</div>;
}
export function Panel({title,subtitle,children,action,className=''}) {
  return <section className={`rb-admin-panel ${className}`}><header className="rb-admin-panel-head"><div><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>{action}</header>{children}</section>;
}
export function TrendChart({mode='tickets'}) {
  const values = DEMO_TREND.map(d=>d[mode]);
  const max = Math.max(...values)*1.25;
  const points = values.map((v,i)=>`${26+i*76},${180-v/max*140}`).join(' ');
  const area = `M${points.replaceAll(' ',' L')} L482,192 L26,192 Z`;
  return <div className="rb-admin-trend-chart">
    <svg viewBox="0 0 510 215" role="img" aria-label={`Illustrative seven-day ${mode} trend chart`} preserveAspectRatio="none">
      <defs><linearGradient id="rbAdminGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#e21b2d" stopOpacity=".26"/><stop offset="100%" stopColor="#e21b2d" stopOpacity="0"/></linearGradient></defs>
      {[42,87,132,177].map(y=><line key={y} x1="18" y1={y} x2="494" y2={y} stroke="#eee8e5" strokeDasharray="4 6" />)}
      <path d={area} fill="url(#rbAdminGradient)"/>
      <polyline points={points} fill="none" stroke="#e21b2d" strokeWidth="3.3" strokeLinecap="round" strokeLinejoin="round"/>
      {values.map((v,i)=><circle key={i} cx={26+i*76} cy={180-v/max*140} r="4.3" fill="#e21b2d" stroke="#fff" strokeWidth="2.5"><title>{DEMO_TREND[i].label}: {mode==='revenue'?money(v):`${v} tickets`}</title></circle>)}
    </svg>
    <div className="rb-admin-trend-labels">{DEMO_TREND.map(d=><span key={d.label}>{d.label}</span>)}</div>
  </div>;
}
export const ActionLink = ({children,onClick}) => <button type="button" className="rb-admin-text-link" onClick={onClick}>{children}<ArrowRight size={15}/></button>;
export function SearchBox({value,onChange,placeholder='Search...'}) {return <label className="rb-admin-search"><Search size={17}/><span className="rb-admin-sr">{placeholder}</span><input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/></label>;}
export function SelectFilter({value,onChange,options,label='Filter'}) {return <label className="rb-admin-filter"><span className="rb-admin-sr">{label}</span><select value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select></label>;}
export const formatNumber = n => Number(n||0).toLocaleString('en-KE');
