function TabPrompts({ ctx, toast }){
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState({});
  const cats = ["All", ...Array.from(new Set(PROMPTS.map(p => p.tag)))];
  const list = filter === "All" ? PROMPTS : PROMPTS.filter(p => p.tag === filter);

  function copy(p){
    try { navigator.clipboard.writeText(p.body); } catch(_){}
    toast(`"${p.title}" copied`);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Prompt Library</h1>
          <div className="sub">Reusable research prompts. Copy into any chat and paste your ticker.</div>
        </div>
        <div className="actions">
          <button className="btn sm"><I.add />New prompt</button>
        </div>
      </div>

      <div style={{display:"flex", gap:6, flexWrap:"wrap", marginBottom:12}}>
        {cats.map(c => (
          <button key={c} className={cx("chip", filter === c && "active")} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      <div className="grid cols-2">
        {list.map(p => (
          <div key={p.id} className={cx("prompt-card", expanded[p.id] && "expanded")}>
            <div className="p-h">
              <h4>{p.title}</h4>
              <span className="p-tag">{p.tag}</span>
            </div>
            <div className="p-body">{p.body}</div>
            <div className="p-foot">
              <button className="btn ghost sm" onClick={() => setExpanded(s => ({...s, [p.id]: !s[p.id]}))}>
                {expanded[p.id] ? "Collapse" : "Expand"}
              </button>
              <button className="btn sm" onClick={() => copy(p)}><I.copy />Copy</button>
              <button className="btn primary sm"><I.run />Run on {ctx.ticker}</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
window.TabPrompts = TabPrompts;
