function TabIndustry({ ctx }){
  const t = TICKERS[ctx.ticker] || TICKERS.NVDA;
  const c = COMPETITORS[ctx.ticker] || COMPETITORS.NVDA;

  const compHead = [
    {key:"co",   label:"Company"},
    {key:"tk",   label:"Ticker"},
    {key:"mc",   label:"Market Cap"},
    {key:"rev",  label:"Rev. Growth"},
    {key:"marg", label:"Margins"},
    {key:"val",  label:"Valuation"},
    {key:"perf", label:"Stock Perf."},
    {key:"strength", label:"Strength vs " + t.ticker},
    {key:"weakness", label:"Weakness vs " + t.ticker},
  ];

  const renderRow = (r) => (
    <>
      <td>{r.co}</td>
      <td className="tk">{r.tk}</td>
      <td className="num">{r.mc}</td>
      <td className="num"><span className={r.rev.startsWith("+") ? "up" : r.rev.startsWith("-") ? "down" : ""}>{r.rev}</span></td>
      <td className="num">{r.marg}</td>
      <td className="num">{r.val}</td>
      <td className="num"><span className={r.perf.startsWith("+") ? "up" : r.perf.startsWith("-") ? "down" : ""}>{r.perf}</span></td>
      <td className="muted" style={{maxWidth:200}}>{r.strength}</td>
      <td className="muted" style={{maxWidth:200}}>{r.weakness}</td>
    </>
  );

  const ranking = c.ranking;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Industry &amp; Competitors</h1>
          <div className="sub">Where {t.ticker} sits in the {t.industry.toLowerCase()} stack.</div>
        </div>
        <div className="actions">
          <button className="btn sm"><I.save />Save view</button>
          <button className="btn sm"><I.copy />Export CSV</button>
        </div>
      </div>

      <div className="grid cols-12">
        <div className="span-12">
          <Card title="Industry placement" meta={`${t.sector} → ${t.industry} → ${t.subIndustry}`}>
            <div className="rank-rail">
              {[
                {k:"leader",     l:"Leader",               v:ranking.leader},
                {k:"challenger", l:"Challenger",           v:ranking.challenger},
                {k:"niche",      l:"Niche Player",         v:ranking.niche},
                {k:"vulnerable", l:"Vulnerable Incumbent", v:ranking.vulnerable},
              ].map(s => {
                const here = (s.v === t.ticker) || (Object.values(ranking).includes(t.ticker) && ranking[s.k] === t.ticker);
                return (
                  <div key={s.k} className={cx("seg", here && "is-here")}>
                    <span className="lab">{s.l}</span>
                    <span className="vv">{s.v}</span>
                    <span className="muted" style={{fontSize:11}}>
                      {s.k === "leader" && "Sets the roadmap and the price."}
                      {s.k === "challenger" && "Closing on price/perf, not yet on platform."}
                      {s.k === "niche" && "Wins where hyperscale economics break down."}
                      {s.k === "vulnerable" && "Distribution intact, product cycle off."}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="span-12">
          <Card title="Direct competitors" meta={`${c.direct.length} companies`} flush>
            <Sortable head={compHead} rows={c.direct} render={renderRow} initialSort={{col:"mc", dir:-1}} />
          </Card>
        </div>

        <div className="span-12">
          <Card title="Indirect competitors" meta={`${c.indirect.length} companies`} flush>
            <Sortable head={compHead} rows={c.indirect} render={renderRow} initialSort={{col:"mc", dir:-1}} />
          </Card>
        </div>

        <div className="span-12">
          <Card title="Peer ranking" meta="composite score">
            <table className="tbl">
              <thead><tr>
                <th>Rank</th><th>Company</th>
                <th className="num">Growth</th>
                <th className="num">Margins</th>
                <th className="num">Valuation discipline</th>
                <th className="num">Narrative strength</th>
                <th className="num">Composite</th>
              </tr></thead>
              <tbody>
                {[
                  { co: t.ticker, g:9.2, m:9.1, v:6.4, n:9.5 },
                  ...c.direct.slice(0,3).map((r,i) => ({ co:r.tk, g:7-i*0.7, m:7.5-i*0.8, v:7+i*0.4, n:6.5-i*0.6 }))
                ].map((r,i) => {
                  const comp = ((r.g + r.m + r.v + r.n) / 4).toFixed(2);
                  return (
                    <tr key={i} className={r.co === t.ticker ? "row-hi" : ""}>
                      <td className="mono">{i+1}</td>
                      <td className="tk">{r.co}</td>
                      <td className="num">{r.g.toFixed(1)}</td>
                      <td className="num">{r.m.toFixed(1)}</td>
                      <td className="num">{r.v.toFixed(1)}</td>
                      <td className="num">{r.n.toFixed(1)}</td>
                      <td className="num"><strong>{comp}</strong></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </>
  );
}
window.TabIndustry = TabIndustry;
