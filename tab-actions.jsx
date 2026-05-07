const ACTION_TYPES = ["Review before earnings","Check after Fed event","Revisit at support","Compare to sector","Review thesis","Move to avoid list"];

function TabActions({ ctx, toast }){
  const [rows, setRows] = useState(ACTIONS);

  function upd(id, key, val){ setRows(rs => rs.map(r => r.id === id ? {...r, [key]:val} : r)); }
  function add(){
    setRows(rs => [...rs, {id:"a"+(rs.length+1), tk:"NEW", action:"Review thesis", due:"—", exp:"—", pri:"Medium", status:"Pending", notes:"…"}]);
    toast("Action added");
  }

  const grouped = {
    Pending: rows.filter(r => r.status === "Pending"),
    Scheduled: rows.filter(r => r.status === "Scheduled"),
    Done: rows.filter(r => r.status === "Done"),
  };

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Next Actions</h1>
          <div className="sub">A tickler file. Each row is a thing future-you will be glad past-you wrote down.</div>
        </div>
        <div className="actions">
          <button className="btn sm"><I.copy />Export ICS</button>
          <button className="btn primary sm" onClick={add}><I.add />New action</button>
        </div>
      </div>

      <div className="grid cols-3" style={{marginBottom:14}}>
        <Card title="Pending" meta={grouped.Pending.length} accentTone="warn">
          <div style={{fontSize:24, fontWeight:600, fontFamily:"var(--font-serif)"}}>{grouped.Pending.length}</div>
          <div className="muted" style={{fontSize:12}}>Includes 2 due this week</div>
        </Card>
        <Card title="Scheduled" meta={grouped.Scheduled.length} accentTone>
          <div style={{fontSize:24, fontWeight:600, fontFamily:"var(--font-serif)"}}>{grouped.Scheduled.length}</div>
          <div className="muted" style={{fontSize:12}}>Furthest out: Jul 30</div>
        </Card>
        <Card title="Completed (30d)" meta={grouped.Done.length} accentTone="bull">
          <div style={{fontSize:24, fontWeight:600, fontFamily:"var(--font-serif)"}}>{grouped.Done.length}</div>
          <div className="muted" style={{fontSize:12}}>Avg time-to-close: 2.4 days</div>
        </Card>
      </div>

      <Card title="All actions" meta={`${rows.length} items`} flush>
        <table className="tbl">
          <thead><tr>
            <th>Ticker</th><th>Action planned</th><th>Next action</th><th>Expiration</th>
            <th>Priority</th><th>Status</th><th>Notes</th>
          </tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td className="tk">{r.tk}</td>
                <td>
                  <select className="cell-edit" value={r.action} onChange={e => upd(r.id, "action", e.target.value)}>
                    {ACTION_TYPES.map(a => <option key={a}>{a}</option>)}
                  </select>
                </td>
                <td className="mono">{r.due}</td>
                <td className="mono muted">{r.exp}</td>
                <td>
                  {r.pri === "High" && <Pill tone="warn">High</Pill>}
                  {r.pri === "Medium" && <Pill tone="accent">Medium</Pill>}
                  {r.pri === "Low" && <Pill>Low</Pill>}
                </td>
                <td>
                  <select className="cell-edit" value={r.status} onChange={e => upd(r.id, "status", e.target.value)}>
                    <option>Pending</option><option>Scheduled</option><option>Done</option>
                  </select>
                </td>
                <td><input className="cell-edit" value={r.notes} onChange={e => upd(r.id, "notes", e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
window.TabActions = TabActions;
