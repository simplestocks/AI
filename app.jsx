function App(){
  const [tab, setTab] = useState("dashboard");
  const [ticker, setTicker] = useState("NVDA");
  const [tickerInput, setTickerInput] = useState("NVDA");
  const [companyInput, setCompanyInput] = useState(TICKERS.NVDA.company);
  const [depth, setDepth] = useState("Standard");
  const [toastMsg, setToastMsg] = useState(null);

  function toast(m){ setToastMsg(m); }

  function applyTicker(){
    const tk = (tickerInput || "").toUpperCase().trim();
    if (TICKERS[tk]) {
      setTicker(tk);
      setCompanyInput(TICKERS[tk].company);
      toast(`Loaded ${tk} · ${TICKERS[tk].company}`);
    } else {
      toast(`No sample data for ${tk} (try NVDA, AAPL, SMCI, TSLA, MSFT)`);
    }
  }

  const ctx = { ticker, depth };
  const TabComp = {
    dashboard: TabDashboard, research: TabResearch, deepdive: TabDeepDive,
    industry: TabIndustry, headlines: TabHeadlines, watchlist: TabWatchlist,
    positions: TabPositions, actions: TabActions, prompts: TabPrompts, settings: TabSettings
  }[tab];

  const tabLabel = (NAV.find(n => n.id === tab) || {}).label;

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo"><span>$</span></div>
          <div className="name">
            <b>SimpleStocks</b>
            <small>Market Research</small>
          </div>
        </div>
        <nav>
          <div className="nav-section">Workbook</div>
          {NAV.slice(0,8).map((n,i) => (
            <button key={n.id} className={cx("nav-item", tab === n.id && "active")} onClick={() => setTab(n.id)}>
              <span className="num">{String(i+1).padStart(2,"0")}</span>
              {n.label}
              {n.badge && <span className="badge">{n.badge}</span>}
            </button>
          ))}
          <div className="nav-section">Library</div>
          {NAV.slice(8).map((n,i) => (
            <button key={n.id} className={cx("nav-item", tab === n.id && "active")} onClick={() => setTab(n.id)}>
              <span className="num">{String(9+i).padStart(2,"0")}</span>
              {n.label}
              {n.badge && <span className="badge">{n.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="foot">
          <span><span className="dot"></span>Live · v0.9.4</span>
          <span className="mono">⌘K</span>
        </div>
      </aside>

      <header className="topbar">
        <div className="crumbs">
          <span>Workbook</span>
          <span className="sep">›</span>
          <b>{tabLabel}</b>
          <span className="sep">›</span>
          <span className="mono" style={{color:"var(--ink)"}}>{ticker}</span>
        </div>
        <div className="spacer"></div>
        <div className="input-shell">
          <label>Ticker</label>
          <input className="ticker"
                 value={tickerInput}
                 onChange={e => setTickerInput(e.target.value.toUpperCase())}
                 onKeyDown={e => e.key === "Enter" && applyTicker()} />
        </div>
        <div className="input-shell">
          <label>Company</label>
          <input className="company" value={companyInput} onChange={e => setCompanyInput(e.target.value)} />
        </div>
        <div className="input-shell">
          <label>Depth</label>
          <select value={depth} onChange={e => setDepth(e.target.value)}>
            <option>Quick</option>
            <option>Standard</option>
            <option>Deep Dive</option>
          </select>
          <span className="caret">▾</span>
        </div>
        <button className="btn accent" onClick={() => { applyTicker(); toast("Research started"); }}>
          <I.run /> Run Research
        </button>
        <button className="btn primary" onClick={() => toast("Saved to workbook")}>
          <I.save /> Save to Workbook
        </button>
      </header>

      <main className="main">
        <TabComp ctx={ctx} toast={toast} />
      </main>

      {toastMsg && <Toast msg={toastMsg} onDone={() => setToastMsg(null)} />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
