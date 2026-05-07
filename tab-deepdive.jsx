function TabDeepDive({ ctx, toast }){
  const t = TICKERS[ctx.ticker] || TICKERS.NVDA;
  const [horizon, setHorizon] = useState("months");
  const [investor, setInvestor] = useState("growth");
  const [depth, setDepth] = useState("medium");
  const [q, setQ] = useState(`Is ${t.ticker}'s data-center growth sustainable into FY27 if hyperscaler capex flatlines?`);
  const [active, setActive] = useState("Generate Full Brief");

  const segs = ["Find Hidden Risks","Find Biggest Bull","Find Biggest Bear","Build Debate","Generate Full Brief"];

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Deep Dive <span style={{verticalAlign:"middle", marginLeft:6}}><Pill tone="accent">PRO</Pill></span></h1>
          <div className="sub">A research notebook with sources, AI-generated blocks, and your own notes for <b className="mono" style={{color:"var(--ink)"}}>{t.ticker}</b>.</div>
        </div>
        <div className="actions">
          <button className="btn sm"><I.save />Save notebook</button>
          <button className="btn sm"><I.copy />Export PDF</button>
        </div>
      </div>

      <div className="grid cols-12">
        <div className="span-4">
          <Card title="Notebook inputs">
            <div style={{display:"flex", flexDirection:"column", gap:12}}>
              <div className="field">
                <label>Ticker</label>
                <input className="ctrl mono" defaultValue={t.ticker} />
              </div>
              <div className="field">
                <label>Research question</label>
                <textarea className="ctrl" value={q} onChange={e => setQ(e.target.value)} />
              </div>
              <div className="row">
                <div className="field">
                  <label>Time horizon</label>
                  <div className="seg">
                    {["weeks","months","years"].map(x => (
                      <button key={x} className={cx(horizon === x && "active")} onClick={() => setHorizon(x)}>{x}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="field">
                <label>Investor type</label>
                <select className="ctrl" value={investor} onChange={e => setInvestor(e.target.value)}>
                  <option value="conservative">Conservative</option>
                  <option value="growth">Growth</option>
                  <option value="speculative">Speculative</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div className="field">
                <label>Research depth</label>
                <div className="seg">
                  {["quick","medium","obsessive"].map(x => (
                    <button key={x} className={cx(depth === x && "active")} onClick={() => setDepth(x)}>{x}</button>
                  ))}
                </div>
              </div>
              <hr className="div" />
              <div className="field">
                <label>One-shot actions</label>
                <div style={{display:"flex", flexDirection:"column", gap:6}}>
                  {segs.map(s => (
                    <button key={s} className={cx("btn", active === s && "primary")}
                            onClick={() => { setActive(s); toast(s + " queued"); }}>
                      <I.run /> {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="span-8" style={{display:"flex", flexDirection:"column", gap:14}}>
          <Card title="Sources" meta="14 cited" actions={<button className="btn sm"><I.add />Add source</button>}>
            <div className="docrail">
              {["10-K FY25","Q1 FY26 transcript","Bernstein 04/29","Semianalysis 05/02","FT 05/04","TSMC 04/18","Cerebras S-1/A","BIS export memo","r/hardware thread","Reddit /r/AMD_Stock","Conference notes","Customer survey n=120","Internal model v3.2","Insider Form 4"].map(s => (
                <span key={s} className="src">{s}</span>
              ))}
            </div>
          </Card>

          <Card title="The Real Business" accentTone meta="AI-generated · edited 1×">
            <div className="prose">
              <p className="lead">{t.company} is, at its core, a systems company that has reframed itself as a platform. Roughly two-thirds of revenue comes from accelerated compute systems sold into a small number of hyperscale buyers; the remaining third is split between gaming, professional visualization, and a fast-growing software/services line built on top of CUDA.</p>
              <p>What most retail investors miss: the economics are increasingly <strong>system-level</strong>, not chip-level. The unit being sold is the rack, not the GPU.</p>
            </div>
          </Card>

          <div className="grid cols-2">
            <Card title="Industry Position" accentTone>
              <div className="prose"><p>Defines the category and writes the roadmap. The principal risk is not displacement — it is the <em>discipline tax</em> of being the price-setter when the cycle turns.</p></div>
              <div style={{marginTop:8}}><Pill tone="bull">Leader</Pill> <Pill>Pricing power: high</Pill></div>
            </Card>
            <Card title="Competitor Ranking" accentTone>
              <div className="prose"><p>1. {t.ticker} (leader) · 2. AMD (challenger, +18% YTD) · 3. Custom ASIC vendors (TPU/Trainium) · 4. Intel (vulnerable incumbent).</p></div>
            </Card>
          </div>

          <div className="grid cols-2">
            <Card title="Biggest Bull Argument" accentTone="bull">
              <div className="aiblock">
                <div className="lab"><span>Bull thesis · Stanley Druckenmiller view</span><span className="src">cite: DDC 04/22</span></div>
                The accelerated-compute build-out is a 5–7 year capex super-cycle, comparable in scope to telco fiber but compressed in time. Even with 30% share leakage, NVDA's wallet share within an expanding TAM still produces ~25% revenue CAGR through 2028.
              </div>
            </Card>
            <Card title="Biggest Bear Argument" accentTone="bear">
              <div className="aiblock" style={{borderLeftColor:"var(--bear)"}}>
                <div className="lab"><span>Bear thesis · Jim Chanos style</span><span className="src">cite: 13F 03/31</span></div>
                Customer concentration + an unhedged inventory commitment to TSMC CoWoS-L + an inference market structurally moving to ASICs = a Q where the multiple compresses 30% on a single guide-down. The setup is asymmetric to the downside from here.
              </div>
            </Card>
          </div>

          <Card title="Weird / Overlooked Article" accentTone="warn" meta="from r/hardware">
            <div className="prose"><p>A semiconductor power-distribution engineer posted a thread arguing that <em>switchgear lead times</em> — not GPUs — are the binding constraint for AI data-center delivery in 2026. Worth tracking: if true, it caps the sector deliverable revenue and helps NVDA's pricing more than it helps unit volume.</p></div>
            <div style={{marginTop:6}}><span className="docrail"><span className="src">reddit.com/r/hardware/…</span><a className="muted" href="#" style={{fontSize:11}}><I.ext /> open</a></span></div>
          </Card>

          <Card title="Narrative Shift">
            <table className="tbl">
              <thead><tr><th>Window</th><th>Then</th><th>Now</th></tr></thead>
              <tbody>
                <tr><td className="mono">3M</td><td>"Inference will leak to ASIC"</td><td>"NVL72 systems extend the moat"</td></tr>
                <tr><td className="mono">6M</td><td>"China headwind dominates"</td><td>"Sovereign AI is the new pillar"</td></tr>
                <tr><td className="mono">12M</td><td>"AI is a 2024 phenomenon"</td><td>"Multi-year industrial build-out"</td></tr>
              </tbody>
            </table>
          </Card>

          <Card title="Thesis Breaker" accentTone="bear">
            <div className="prose">
              <ul>
                <li>If hyperscaler capex growth decelerates from +52% to +15% YoY, FY27 estimates need to come down ~18%.</li>
                <li>If a credible inference ASIC reaches 30% of one hyperscaler's footprint by mid-2027, the multiple compresses by 25–30%.</li>
                <li>If CoWoS-L pricing moves against NVDA after their next supply contract reset.</li>
              </ul>
            </div>
          </Card>

          <Card title="Final Decision Brief" meta="Investor: growth · Horizon: months">
            <div className="prose">
              <p><strong>What matters:</strong> system-level mix shift, sovereign deal cadence, hyperscaler capex commentary on next 3 calls.</p>
              <p><strong>What is noise:</strong> single-print insider sales under 10b5-1, retail short-report drama, daily ETF flow stories.</p>
              <p><strong>Watch next:</strong> Anthropic's Trainium tests at scale (re-rating event), TSMC supply commentary in July.</p>
              <p><strong>What would make me interested:</strong> a 12–15% pullback on capex jitters with no change in 3-of-4 hyperscaler commentary.</p>
              <p><strong>What would make me walk away:</strong> two hyperscalers cut capex guides in the same quarter.</p>
            </div>
            <div style={{display:"flex", gap:6, marginTop:8}}>
              <Pill tone="bull">Constructive</Pill>
              <Pill>Trim &gt;$1,180</Pill>
              <Pill tone="warn">Add only sub-$960</Pill>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
window.TabDeepDive = TabDeepDive;
