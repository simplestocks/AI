const WL_CATS = ["Long-term idea","Earnings watch","Pullback watch","Breakout watch","High-risk/speculative","Avoid list"];

function TabWatchlist({ ctx, toast }){
  const [rows, setRows] = useState(WATCHLIST);
  const [filter, setFilter] = useState("All");

  function update(id, key, val){
    setRows(rs => rs.map(r => r.id === id ? {...r, [key]: val} : r));
  }
  function add(){
    const id = "w" + (rows.length + 1);
    setRows(rs => [...rs, {id, tk:"NEW", co:"New ticker", cat:"Long-term idea", bias:"Neutral", pri:"Low", added:"May 06, 2026", reason:"…", next:"—", notes:"…"}]);
    toast("Row added");
  }
  function remove(id){
    setRows(rs => rs.filter(r => r.id !== id));
  }

  const filtered = filter === "All" ? rows : rows.filter(r => r.cat === filter);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Watchlist</h1>
          <div className="sub">Editable. Click a cell to edit. Reorder by category for triage.</div>
        </div>
        <div className="actions">
          <button className="btn sm"><I.copy />Export CSV</button>
          <button className="btn primary sm" onClick={add}><I.add />Add ticker</button>
        </div>
      </div>

      <div style={{display:"flex", gap:6, flexWrap:"wrap", marginBottom:12}}>
        {["All", ...WL_CATS].map(c => (
          <button key={c} className={cx("chip", filter === c && "active")} onClick={() => setFilter(c)}>{c}
            <span className="muted mono" style={{fontSize:10}}>{c === "All" ? rows.length : rows.filter(r => r.cat === c).length}</span>
          </button>
        ))}
      </div>

      <Card title="Watchlist" meta={`${filtered.length} tickers`} flush>
        <table className="tbl">
          <thead><tr>
            <th>Ticker</th><th>Company</th><th>Category</th><th>Reason watching</th>
            <th>Bias</th><th>Priority</th><th>Date added</th><th>Next action</th>
            <th style={{minWidth:200}}>Notes</th><th></th>
          </tr></thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td className="tk">{r.tk}</td>
                <td>{r.co}</td>
                <td>
                  <select className="cell-edit" value={r.cat} onChange={e => update(r.id, "cat", e.target.value)}>
                    {WL_CATS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </td>
                <td><input className="cell-edit" value={r.reason} onChange={e => update(r.id, "reason", e.target.value)} /></td>
                <td>
                  {r.bias === "Bullish" && <Pill tone="bull">Bullish</Pill>}
                  {r.bias === "Bearish" && <Pill tone="bear">Bearish</Pill>}
                  {r.bias === "Neutral" && <Pill>Neutral</Pill>}
                </td>
                <td>
                  {r.pri === "High" && <Pill tone="warn">High</Pill>}
                  {r.pri === "Medium" && <Pill tone="accent">Medium</Pill>}
                  {r.pri === "Low" && <Pill>Low</Pill>}
                </td>
                <td className="muted mono">{r.added}</td>
                <td className="mono">{r.next}</td>
                <td><input className="cell-edit" value={r.notes} onChange={e => update(r.id, "notes", e.target.value)} /></td>
                <td><button className="btn ghost sm" onClick={() => remove(r.id)} title="Remove"><I.trash /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
window.TabWatchlist = TabWatchlist;
