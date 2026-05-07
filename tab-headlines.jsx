function TabHeadlines({ ctx }){
  const t = TICKERS[ctx.ticker] || TICKERS.NVDA;
  const rows = HEADLINES[ctx.ticker] || HEADLINES.NVDA;
  const [src, setSrc] = useState("all");
  const [kw, setKw] = useState("");

  const filtered = rows.filter(r => {
    if (kw && !r.head.toLowerCase().includes(kw.toLowerCase())) return false;
    if (src === "all") return true;
    if (src === "sec") return r.source.toLowerCase().includes("sec");
    if (src === "news") return ["reuters","bloomberg","ft","wsj","cnbc"].some(s => r.source.toLowerCase().includes(s));
    if (src === "blogs") return ["seeking","information","semianalysis","electrek","digitimes","counterpoint"].some(s => r.source.toLowerCase().includes(s));
    if (src === "social") return ["x /","reddit","r/"].some(s => r.source.toLowerCase().includes(s));
    return true;
  });

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Headlines</h1>
          <div className="sub">Filtered news, filings, and sentiment for <b className="mono" style={{color:"var(--ink)"}}>{t.ticker}</b>.</div>
        </div>
        <div className="actions">
          <button className="btn sm"><I.refresh />Refresh</button>
          <button className="btn sm"><I.save />Save filter</button>
        </div>
      </div>

      <Card title="Filters" meta={`${filtered.length} of ${rows.length} headlines`}>
        <div style={{display:"grid", gridTemplateColumns:"120px 1fr 220px 220px", gap:10}}>
          <div className="field">
            <label>Ticker</label>
            <input className="ctrl mono" defaultValue={t.ticker} />
          </div>
          <div className="field">
            <label>Keyword</label>
            <input className="ctrl" placeholder="e.g. capex, audit, China…" value={kw} onChange={e => setKw(e.target.value)} />
          </div>
          <div className="field">
            <label>Date range</label>
            <select className="ctrl" defaultValue="7">
              <option value="1">Last 24 hours</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
          <div className="field">
            <label>Source type</label>
            <div className="seg" style={{height:32}}>
              {[["all","All"],["news","News"],["sec","SEC"],["blogs","Blogs"],["social","Social"]].map(([k,l]) => (
                <button key={k} className={cx(src === k && "active")} onClick={() => setSrc(k)}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div style={{height:14}}></div>

      <Card title="Headlines" meta={`${t.ticker} · last 7 days`} flush>
        <table className="tbl">
          <thead><tr>
            <th style={{width:70}}>Date</th>
            <th style={{width:130}}>Source</th>
            <th>Headline</th>
            <th style={{width:90}}>Sentiment</th>
            <th>Why it matters</th>
            <th style={{width:50}}>Link</th>
          </tr></thead>
          <tbody>
            {filtered.map((r,i) => (
              <tr key={i}>
                <td className="muted mono">{r.date}</td>
                <td>{r.source}</td>
                <td style={{fontWeight:500}}>{r.head}</td>
                <td>
                  {r.sent === "bull" && <span className="sent-bull"><span className="sdot green"></span>Bullish</span>}
                  {r.sent === "bear" && <span className="sent-bear"><span className="sdot red"></span>Bearish</span>}
                  {r.sent === "neut" && <span className="sent-neut"><span className="sdot gray"></span>Neutral</span>}
                </td>
                <td className="muted serif" style={{fontSize:12.5}}>{r.why}</td>
                <td><a href="#" className="muted"><I.ext /></a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
window.TabHeadlines = TabHeadlines;
