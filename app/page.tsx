'use client'
import {useEffect,useMemo,useState} from 'react'
import {Activity,AlertTriangle,ArrowDownRight,ArrowUpRight,BarChart3,ChevronRight,LayoutDashboard,RefreshCw,ShieldCheck,WalletCards} from 'lucide-react'
import type {TradeAccount} from '@/lib/demo'

type Tab='dashboard'|'accounts'|'risk'
const money=(n:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n)

export default function Home(){
 const [accounts,setAccounts]=useState<TradeAccount[]>([]); const [tab,setTab]=useState<Tab>('dashboard'); const [loading,setLoading]=useState(true)
 const load=async()=>{setLoading(true);try{const r=await fetch('/api/accounts',{cache:'no-store'});const j=await r.json();setAccounts(j.accounts||[])}finally{setLoading(false)}}
 useEffect(()=>{load()},[])
 const totals=useMemo(()=>accounts.reduce((a,x)=>({equity:a.equity+x.equity,pnl:a.pnl+x.todayPnl,floating:a.floating+x.floatingPnl}),{equity:0,pnl:0,floating:0}),[accounts])
 const pnlPct=totals.equity?totals.pnl/(totals.equity-totals.pnl)*100:0
 return <main className="shell">
   <header><div><div className="eyebrow"><Activity size={14}/> TRADEDECK</div><h1>{tab==='dashboard'?'Portfolio':tab==='accounts'?'Accounts':'Risk Center'}</h1></div><button className="iconBtn" onClick={load} aria-label="Refresh"><RefreshCw size={18} className={loading?'spin':''}/></button></header>
   {tab==='dashboard'&&<>
    <section className="hero"><div className="heroTop"><span>TOTAL EQUITY</span><span className="live"><i/> LIVE</span></div><div className="big">{money(totals.equity)}</div><div className={totals.pnl>=0?'gain':'loss'}>{totals.pnl>=0?<ArrowUpRight size={17}/>:<ArrowDownRight size={17}/>} {money(Math.abs(totals.pnl))} today <small>{pnlPct>=0?'+':''}{pnlPct.toFixed(2)}%</small></div><div className="heroGrid"><div><span>Floating P&L</span><strong className={totals.floating>=0?'positive':'negative'}>{totals.floating>=0?'+':''}{money(totals.floating)}</strong></div><div><span>Accounts</span><strong>{accounts.length}</strong></div></div></section>
    <div className="sectionTitle"><span>ACCOUNTS</span><button onClick={()=>setTab('accounts')}>View all</button></div>
    <section className="list">{accounts.slice(0,4).map(a=><AccountCard key={a.id} a={a}/>)}</section>
    <section className="insight" onClick={()=>setTab('risk')}><div className="insightIcon"><ShieldCheck/></div><div><b>Risk overview</b><p>{accounts.filter(a=>a.status==='warning').length?`${accounts.filter(a=>a.status==='warning').length} account needs attention.`:'All accounts are within your limits.'}</p></div><ChevronRight/></section>
   </>}
   {tab==='accounts'&&<section className="list accountsPage">{accounts.map(a=><AccountCard key={a.id} a={a} detailed/>)}</section>}
   {tab==='risk'&&<Risk accounts={accounts}/>} 
   <nav><button className={tab==='dashboard'?'active':''} onClick={()=>setTab('dashboard')}><LayoutDashboard/><span>Home</span></button><button className={tab==='accounts'?'active':''} onClick={()=>setTab('accounts')}><WalletCards/><span>Accounts</span></button><button className={tab==='risk'?'active':''} onClick={()=>setTab('risk')}><ShieldCheck/><span>Risk</span></button><button disabled><BarChart3/><span>Analytics</span></button></nav>
 </main>
}
function AccountCard({a,detailed=false}:{a:TradeAccount;detailed?:boolean}){const used=a.drawdownLimit?Math.min(100,a.drawdownPct/a.drawdownLimit*100):0;return <article className="card"><div className="cardHead"><div><div className="accountName">{a.name}</div><div className="meta"><span className={`dot ${a.status}`}/>{a.platform} · {a.broker}</div></div><div className="equity"><small>EQUITY</small><b>{money(a.equity)}</b></div></div><div className="stats"><div><span>Today</span><b className={a.todayPnl>=0?'positive':'negative'}>{a.todayPnl>=0?'+':''}{money(a.todayPnl)}</b></div><div><span>Floating</span><b className={a.floatingPnl>=0?'positive':'negative'}>{a.floatingPnl>=0?'+':''}{money(a.floatingPnl)}</b></div><div><span>Drawdown</span><b>{a.drawdownPct.toFixed(1)}%</b></div></div><div className="progressLabel"><span>DD usage</span><span>{used.toFixed(0)}% of limit</span></div><div className="bar"><i style={{width:`${used}%`}} className={used>70?'warn':''}/></div>{detailed&&a.targetPct>0&&<div className="target"><span>Challenge progress</span><strong>{a.progressPct}%</strong></div>}</article>}
function Risk({accounts}:{accounts:TradeAccount[]}){const maxUsage=accounts.reduce((m,a)=>Math.max(m,a.drawdownLimit?a.drawdownPct/a.drawdownLimit*100:0),0);const label=maxUsage>=85?'HIGH':maxUsage>=60?'MEDIUM':'LOW';return <section className="riskPage"><div className="riskScore"><span>PORTFOLIO RISK</span><strong>{label}</strong><p>{label==='LOW'?'No account is currently near a hard loss limit.':'One or more accounts are approaching a configured loss limit.'}</p></div><h3>Drawdown limits</h3>{accounts.map(a=>{const used=a.drawdownLimit?Math.min(100,a.drawdownPct/a.drawdownLimit*100):0;return <div className="riskRow" key={a.id}><div><b>{a.name}</b><span>{a.drawdownPct.toFixed(1)}% / {a.drawdownLimit}%</span></div><div className="bar"><i style={{width:`${used}%`}} className={used>70?'warn':''}/></div></div>})}<div className="alertBox"><AlertTriangle/><div><b>Next: exposure alerts</b><p>Mac collector bağlı olduğunda aynı semboldeki toplam lot ve yön riskini burada göstereceğiz.</p></div></div></section>}
