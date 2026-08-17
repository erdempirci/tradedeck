export type TradeAccount = {id:string;name:string;platform:'MT4'|'MT5'|'cTrader';broker:string;balance:number;equity:number;todayPnl:number;todayPct:number;floatingPnl:number;drawdownPct:number;drawdownLimit:number;targetPct:number;progressPct:number;status:'healthy'|'warning'|'danger';updatedAt:string}
export const demoAccounts:TradeAccount[]=[
{id:'the5ers-50',name:'The5ers High Stakes',platform:'MT5',broker:'The5ers',balance:51240,equity:51060,todayPnl:420,todayPct:.82,floatingPnl:-180,drawdownPct:2.1,drawdownLimit:10,targetPct:8,progressPct:31,status:'healthy',updatedAt:new Date().toISOString()},
{id:'ifm-50',name:'IF Micro 50K',platform:'MT5',broker:'Instant Funding',balance:52810,equity:53140,todayPnl:620,todayPct:1.18,floatingPnl:330,drawdownPct:1.3,drawdownLimit:6,targetPct:5,progressPct:56,status:'healthy',updatedAt:new Date().toISOString()},
{id:'e8-100',name:'E8 Pro 100K',platform:'MT5',broker:'E8 Markets',balance:101340,equity:100920,todayPnl:180,todayPct:.18,floatingPnl:-420,drawdownPct:3.7,drawdownLimit:10,targetPct:10,progressPct:13,status:'warning',updatedAt:new Date().toISOString()},
{id:'personal-ct',name:'Personal cTrader',platform:'cTrader',broker:'cTrader',balance:42440,equity:42710,todayPnl:64,todayPct:.15,floatingPnl:270,drawdownPct:.8,drawdownLimit:20,targetPct:0,progressPct:0,status:'healthy',updatedAt:new Date().toISOString()}
]
