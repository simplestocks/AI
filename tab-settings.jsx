function TabSettings({ ctx, toast }){
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Settings</h1>
          <div className="sub">Connections, API keys, sources, and export defaults.</div>
        </div>
        <div className="actions">
          <button className="btn primary sm" onClick={() => toast("Settings saved")}><I.save />Save changes</button>
        </div>
      </div>

      <div className="grid cols-2">
        <Card title="Google Sheets connection" accentTone>
          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            <div className="field">
              <label>Workbook URL</label>
              <input className="ctrl" defaultValue="https://docs.google.com/spreadsheets/d/1aB7xQ…/edit" />
            </div>
            <div className="row">
              <div className="field">
                <label>Tab name</label>
                <input className="ctrl" defaultValue="Watchlist" />
              </div>
              <div className="field">
                <label>Sync</label>
                <div className="seg">
                  <button className="active">Auto</button>
                  <button>Manual</button>
                </div>
              </div>
            </div>
            <div className="hint"><span className="sdot green"></span>Connected as andrew@simplestocks.io · last sync 2 min ago</div>
          </div>
        </Card>

        <Card title="API keys" accentTone="warn">
          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            <div className="field">
              <label>OpenAI key</label>
              <input className="ctrl mono" type="password" defaultValue="sk-proj-•••••••••••••••••" />
            </div>
            <div className="field">
              <label>Anthropic / Claude key</label>
              <input className="ctrl mono" type="password" defaultValue="sk-ant-•••••••••••••••••" />
            </div>
            <div className="field">
              <label>Alpha Vantage key</label>
              <input className="ctrl mono" type="password" defaultValue="AVTG-•••••••••••" />
            </div>
            <div className="hint">Keys are stored in your browser only. Never sent to our server.</div>
          </div>
        </Card>

        <Card title="News sources">
          <div style={{display:"flex", flexDirection:"column", gap:6}}>
            {[
              ["Reuters", true], ["Bloomberg Terminal feed", true], ["FT", true], ["WSJ", true],
              ["The Information", true], ["Seeking Alpha", false], ["Substacks (curated)", true],
              ["Reddit /r/stocks, /r/hardware", true], ["X (curated list)", false],
              ["SEC EDGAR (8-K, 10-Q, 10-K, Form 4)", true]
            ].map(([s, on]) => (
              <label key={s} className={cx("check", on && "checked")} style={{justifyContent:"space-between"}}>
                <span style={{display:"flex", alignItems:"center", gap:8}}>
                  <input type="checkbox" defaultChecked={on} /> {s}
                </span>
                <span className="muted mono" style={{fontSize:11}}>{on ? "ON" : "off"}</span>
              </label>
            ))}
          </div>
        </Card>

        <Card title="Export format">
          <div style={{display:"flex", flexDirection:"column", gap:10}}>
            <div className="field">
              <label>Default format</label>
              <div className="seg">
                <button className="active">Markdown</button>
                <button>PDF</button>
                <button>CSV</button>
                <button>Sheets</button>
              </div>
            </div>
            <div className="field">
              <label>Filename template</label>
              <input className="ctrl mono" defaultValue="{TICKER}_{date}_brief" />
            </div>
            <div className="row">
              <label className="check checked"><input type="checkbox" defaultChecked /> Include sources</label>
              <label className="check checked"><input type="checkbox" defaultChecked /> Include AI metadata</label>
            </div>
            <div className="hint">Briefs export with embedded provenance. Recommended for compliance.</div>
          </div>
        </Card>
      </div>
    </>
  );
}
window.TabSettings = TabSettings;
