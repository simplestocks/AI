const POS_TYPES = ["Stock","ETF","Option","Spread","Long-term hold","Watch only"];

function TabPositions({ ctx, toast }){
  const [rows, setRows] = useState(POSITIONS);
  const [selected, setSelected] = useState(POSITIONS[0].id);
  const sel = rows.find(r => r.id === selected) || rows[0];

  function upd(id, key, val){ setRows(rs => rs.map(r => r.id === id ? {...r, [key]:val} : r)); }

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Positions &amp; Notes</h1>
          <div className="sub">Track the position, the thesis, and the latest update note in one place.</div>
        </div>
        <div className="actions">
          <button className="btn sm"><I.copy />Export</button>
          <button className="btn primary sm"><I.add />New position</button>
        </div>
      </div>

      <div className="grid cols-12">
        <div className="span-7">
          <Card title="Positions" meta={`${rows.length} entries`} flush>
            <table className="tbl">
              <thead><tr>
                <th>Ticker</th><th>Type</th><th>Entry date</th><th className="num">Entry price</th>
                <th>Status</th><th></th>
              </tr></thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id} className={r.id === selected ? "row-hi" : ""} onClick={() => setSelected(r.id)} style={{cursor:"pointer"}}>
                    <td className="tk">{r.tk}</td>
                    <td><Pill tone={r.type === "Watch only" ? "neutral" : "accent"}>{r.type}</Pill></td>
                    <td className="muted mono">{r.entry}</td>
                    <td className="num">{r.price}</td>
                    <td>
                      {r.status === "Open" && <span><span className="sdot green"></span>Open</span>}
                      {r.status === "Watch" && <span><span className="sdot gray"></span>Watch</span>}
                      {r.status === "Closed" && <span><span className="sdot red"></span>Closed</span>}
                    </td>
                    <td><button className="btn ghost sm" onClick={(e) => { e.stopPropagation(); setSelected(r.id); }}><I.edit /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div className="span-5">
          <Card title={`Editor · ${sel.tk}`} meta={sel.type} actions={<button className="btn primary sm" onClick={() => toast("Note saved")}>Save</button>}>
            <div style={{display:"flex", flexDirection:"column", gap:10}}>
              <div className="row">
                <div className="field">
                  <label>Ticker</label>
                  <input className="ctrl mono" value={sel.tk} onChange={e => upd(sel.id, "tk", e.target.value.toUpperCase())} />
                </div>
                <div className="field">
                  <label>Position type</label>
                  <select className="ctrl" value={sel.type} onChange={e => upd(sel.id, "type", e.target.value)}>
                    {POS_TYPES.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="field">
                  <label>Entry date</label>
                  <input className="ctrl mono" value={sel.entry} onChange={e => upd(sel.id, "entry", e.target.value)} />
                </div>
                <div className="field">
                  <label>Entry price</label>
                  <input className="ctrl mono" value={sel.price} onChange={e => upd(sel.id, "price", e.target.value)} />
                </div>
              </div>
              <div className="field">
                <label>Thesis</label>
                <textarea className="ctrl" value={sel.thesis} onChange={e => upd(sel.id, "thesis", e.target.value)} />
              </div>
              <div className="field">
                <label>Risk</label>
                <textarea className="ctrl" value={sel.risk} onChange={e => upd(sel.id, "risk", e.target.value)} />
              </div>
              <div className="field">
                <label>Update note</label>
                <textarea className="ctrl" value={sel.note} onChange={e => upd(sel.id, "note", e.target.value)} />
              </div>
              <div className="field">
                <label>Status</label>
                <div className="seg">
                  {["Open","Watch","Closed"].map(s => (
                    <button key={s} className={cx(sel.status === s && "active")} onClick={() => upd(sel.id, "status", s)}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
window.TabPositions = TabPositions;
