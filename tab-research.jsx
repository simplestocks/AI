function TabResearch({ ctx, toast }) {
  const t = TICKERS[ctx.ticker] || TICKERS.NVDA;
  const [checks, setChecks] = useState({
    biz:true, fund:true, earn:true, tech:false,
    bull:true, bear:true, risk:true, anal:false
  });
  const [generated, setGenerated] = useState(true);
  const [busy, setBusy] = useState(false);

  function run(){
    setBusy(true);
    setTimeout(() => { setBusy(false); setGenerated(true); toast("Research brief generated"); }, 800);
  }

  const opts = [
    {k:"biz",  l:"Business summary"},
    {k:"fund", l:"Fundamentals"},
    {k:"earn", l:"Earnings recap"},
    {k:"tech", l:"Technical glance"},
    {k:"bull", l:"Bull case"},
    {k:"bear", l:"Bear case"},
    {k:"risk", l:"Risk factors"},
    {k:"anal", l:"Analyst narrative"},
  ];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Market Research</h1>
          <div className="sub">Build a one-page research brief on any ticker.</div>
        </div>
        <div className="actions">
          <button className="btn sm"><I.save /> Save to workbook</button>
          <button className="btn sm"><I.copy /> Copy as Markdown</button>
        </div>
      </div>

      <div className="split">
        <Card title="Inputs" meta="form">
          <div style={{display:"flex", flexDirection:"column", gap:12}}>
            <div className="field">
              <label>Ticker</label>
              <input className="ctrl mono" defaultValue={t.ticker} />
            </div>
            <div className="field">
              <label>Company name <span className="muted" style={{textTransform:"none", letterSpacing:0}}>(optional)</span></label>
              <input className="ctrl" defaultValue={t.company} />
            </div>
            <div className="field">
              <label>Research scope</label>
              <div className="checks">
                {opts.map(o => (
                  <label key={o.k} className={cx("check", checks[o.k] && "checked")}>
                    <input type="checkbox" checked={checks[o.k]} onChange={e => setChecks(c => ({...c, [o.k]: e.target.checked}))} />
                    {o.l}
                  </label>
                ))}
              </div>
            </div>
            <hr className="div" />
            <button className="btn primary" onClick={run} disabled={busy}>
              <I.run /> {busy ? "Generating…" : "Generate research brief"}
            </button>
            <div className="hint">~6s · uses your saved Claude key · costs ~$0.04</div>
          </div>
        </Card>

        <Card title="Research Brief" meta={`${t.ticker} · ${t.company}`} actions={<>
          <button className="btn sm ghost"><I.copy /></button>
          <button className="btn sm ghost"><I.save /></button>
          <button className="btn sm ghost"><I.more /></button>
        </>}>
          {!generated ? (
            <div className="muted" style={{padding:"30px 0", textAlign:"center"}}>Run research to populate this panel.</div>
          ) : (
            <div style={{display:"flex", flexDirection:"column", gap:18}}>
              <BriefSection
                title="What the company does"
                body={`${t.company} (${t.ticker}) operates at the center of the ${t.industry.toLowerCase()} business. In plain terms, it sells the picks, shovels, and platforms that other companies depend on to operate at scale — meaning its revenue is a derivative of how much capital its customers are willing to spend on infrastructure.`}
              />
              <BriefSection
                title="How it makes money"
                body={`Roughly three-quarters of revenue comes from a handful of large institutional buyers. Pricing power is high in the leading product line and average elsewhere; gross margin reflects that mix. The recurring services / software contribution is small but growing faster than the headline rate.`}
              />
              <BriefSection
                title="What matters now"
                body={`Watch the capex commentary out of the top four customers, the supply-chain commentary out of the upstream foundry, and the regulatory tone in Washington and Brussels. These three vectors explain ~80% of the share-price variance over the last year.`}
              />
              <BriefSection
                title="What could go wrong"
                body={`A pause in customer capex, a credible second-source competitor at scale, or a sudden change in export-control posture. Any one of these is a re-rating event; two together would compress the multiple by 25–35%.`}
              />
              <BriefSection
                title="Investor takeaway"
                tone="bull"
                body={`Position size for both outcomes. Trim into multiple expansion, add into demand-side disappointments — most of the long-term return has historically come from owning through the downcycles, not from timing them.`}
              />
              <div style={{display:"flex", gap:6, flexWrap:"wrap", marginTop:4}}>
                <Pill tone="accent">Standard depth</Pill>
                <Pill>{Object.values(checks).filter(Boolean).length} sections</Pill>
                <Pill>3 sources cited</Pill>
                <Pill tone="bull">Saved May 5, 4:02p</Pill>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}

function BriefSection({title, body, tone}){
  return (
    <div>
      <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:6}}>
        <span className={cx("pill", tone || "neutral")} style={{textTransform:"none"}}>{title}</span>
      </div>
      <div className="prose"><p>{body}</p></div>
    </div>
  );
}
window.TabResearch = TabResearch;
