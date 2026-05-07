function TabDashboard({ ctx }) {
  const t = TICKERS[ctx.ticker] || TICKERS.NVDA;
  const up = t.dayChg >= 0;
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <div className="sub">Workbook overview for <b className="mono" style={{color:"var(--ink)"}}>{t.ticker}</b> · {t.company}</div>
        </div>
        <div className="actions">
          <button className="btn sm"><I.refresh /> Refresh</button>
          <button className="btn sm"><I.add /> New brief</button>
        </div>
      </div>

      <div className="grid cols-12">
        {/* Ticker overview */}
        <div className="span-8">
          <Card title="Ticker overview" meta={t.lastUpdated}>
            <div style={{display:"grid", gridTemplateColumns:"1.2fr 1fr 1fr", gap:18, alignItems:"flex-start"}}>
              <div>
                <div style={{display:"flex", alignItems:"baseline", gap:10}}>
                  <div className="mono" style={{fontSize:26, fontWeight:700, letterSpacing:"-.02em"}}>{t.ticker}</div>
                  <div style={{color:"var(--muted)", fontSize:13}}>{t.company}</div>
                </div>
                <div style={{marginTop:6, display:"flex", alignItems:"baseline", gap:10}}>
                  <div className="mono tnum" style={{fontSize:22, fontWeight:600}}>${t.price.toFixed(2)}</div>
                  {fmtChg(t.dayChg)}
                  <span className="muted" style={{fontSize:11}}>today</span>
                  <span style={{margin:"0 4px", color:"var(--line-strong)"}}>·</span>
                  {fmtChg(t.weekChg)}
                  <span className="muted" style={{fontSize:11}}>5d</span>
                </div>
                <div style={{marginTop:10}}>
                  <Sparkline data={t.spark} up={up} width={300} height={48} />
                </div>
              </div>
              <dl className="kv">
                <dt>Sector</dt><dd className="text">{t.sector}</dd>
                <dt>Industry</dt><dd className="text">{t.industry}</dd>
                <dt>Sub-industry</dt><dd className="text">{t.subIndustry}</dd>
                <dt>Market cap</dt><dd>{t.marketCap}</dd>
              </dl>
              <dl className="kv">
                <dt>Research status</dt>
                <dd className="text"><Pill tone={t.status.tone === "ok" ? "bull" : t.status.tone === "warn" ? "warn" : "neutral"}>{t.status.label}</Pill></dd>
                <dt>Last updated</dt><dd className="text">{t.lastUpdated}</dd>
                <dt>Next action</dt><dd className="text">{t.nextAction}</dd>
                <dt>Saved notes</dt><dd>4 entries</dd>
              </dl>
            </div>
          </Card>
        </div>

        {/* Next action */}
        <div className="span-4">
          <Card title="Next Action" accentTone="warn" actions={<button className="btn sm">Open</button>}>
            <div style={{display:"flex", flexDirection:"column", gap:8}}>
              <div style={{fontFamily:"var(--font-serif)", fontSize:15, color:"var(--ink)"}}>{t.nextAction}</div>
              <div style={{fontSize:12, color:"var(--muted)"}}>
                Compare DC guide vs whisper $32B; reconcile capex commentary across hyperscalers; flag any change to gross-margin trajectory.
              </div>
              <div style={{display:"flex", gap:6, marginTop:4}}>
                <Pill tone="accent">Pre-earnings</Pill>
                <Pill tone="warn">High priority</Pill>
              </div>
            </div>
          </Card>
        </div>

        {/* Bull / Bear */}
        <div className="span-6">
          <Card title="Bull case" accentTone="bull" meta="3 points">
            <ol style={{margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:8}}>
              {t.bull.map((b,i) => (
                <li key={i} style={{display:"flex", gap:10, alignItems:"flex-start"}}>
                  <span className="mono" style={{color:"var(--bull)", fontSize:11, paddingTop:2}}>0{i+1}</span>
                  <span style={{fontFamily:"var(--font-serif)", fontSize:13, color:"var(--ink-2)"}}>{b}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>
        <div className="span-6">
          <Card title="Bear case" accentTone="bear" meta="3 points">
            <ol style={{margin:0, padding:0, listStyle:"none", display:"flex", flexDirection:"column", gap:8}}>
              {t.bear.map((b,i) => (
                <li key={i} style={{display:"flex", gap:10, alignItems:"flex-start"}}>
                  <span className="mono" style={{color:"var(--bear)", fontSize:11, paddingTop:2}}>0{i+1}</span>
                  <span style={{fontFamily:"var(--font-serif)", fontSize:13, color:"var(--ink-2)"}}>{b}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        {/* Risks / What changed */}
        <div className="span-6">
          <Card title="Key risks" accentTone="warn">
            <ul style={{margin:0, paddingLeft:16, fontFamily:"var(--font-serif)", color:"var(--ink-2)", fontSize:13, lineHeight:1.55}}>
              {t.risks.map((r,i) => <li key={i}>{r}</li>)}
            </ul>
          </Card>
        </div>
        <div className="span-6">
          <Card title="What changed recently" accentTone meta="last 7 days">
            <ul style={{margin:0, paddingLeft:0, listStyle:"none", display:"flex", flexDirection:"column", gap:8}}>
              {t.changed.map((c,i) => (
                <li key={i} style={{display:"flex", gap:10, fontSize:12.5}}>
                  <span className="mono muted" style={{minWidth:34, fontSize:11}}>−{i+1}d</span>
                  <span style={{color:"var(--ink-2)"}}>{c}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Saved notes */}
        <div className="span-12">
          <Card title="Saved notes" meta={`${t.ticker} · 4 entries`} actions={<button className="btn sm"><I.add />Note</button>}>
            <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:12}}>
              {[
                { d:"May 04", t:"Conf takeaway", body:"Mgmt unusually direct on power-bound deliveries. Read-through positive for ’27 capex." },
                { d:"Apr 28", t:"Channel check", body:"Tier-2 cloud customer says lead-times 'better than feared' on GB200." },
                { d:"Apr 21", t:"Sell-side note", body:"Morgan Stanley raises target to $1,300 on ASP mix." },
                { d:"Apr 14", t:"My thesis", body:"Trim 10% above $1,180; reload sub-$960 if hyperscaler capex pauses." },
              ].map((n,i) => (
                <div key={i} style={{border:"1px solid var(--line)", borderRadius:6, padding:"10px 12px", background:"#fff"}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6}}>
                    <div style={{fontWeight:600, fontSize:12}}>{n.t}</div>
                    <div className="muted mono" style={{fontSize:10}}>{n.d}</div>
                  </div>
                  <div style={{fontFamily:"var(--font-serif)", fontSize:12.5, color:"var(--ink-2)", lineHeight:1.5}}>{n.body}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
window.TabDashboard = TabDashboard;
