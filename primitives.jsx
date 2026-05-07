/* Shared primitives + tiny helpers */

const { useState, useEffect, useMemo, useRef, useCallback } = React;

function cx(...args){ return args.filter(Boolean).join(" "); }

function fmtChg(v){
  const sign = v >= 0 ? "+" : "";
  const cls = v >= 0 ? "up" : "down";
  return <span className={cls + " mono tnum"}>{sign}{v.toFixed(2)}%</span>;
}

function Card({title, accentTone, meta, actions, children, className, flush}) {
  return (
    <section className={cx("card", className)}>
      <header className="card-h">
        <div className={cx("title", accentTone)}>
          {accentTone && <span className="accent" />}
          {title}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {meta && <span className="meta">{meta}</span>}
          {actions && <span className="actions">{actions}</span>}
        </div>
      </header>
      <div className={cx("card-b", flush && "flush")}>{children}</div>
    </section>
  );
}

function Pill({tone="neutral", children}) {
  return <span className={cx("pill", tone)}>{children}</span>;
}

function Sparkline({data, up=true, width=120, height=36}) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const pts = data.map((v,i) => `${(i*step).toFixed(2)},${(height - ((v-min)/range)*height).toFixed(2)}`).join(" ");
  const stroke = up ? "var(--bull)" : "var(--bear)";
  const fill = up ? "rgba(26,122,76,.10)" : "rgba(192,57,43,.10)";
  return (
    <svg className="spark" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke={stroke} strokeWidth="1.4" />
      <polygon points={`0,${height} ${pts} ${width},${height}`} fill={fill} stroke="none" />
    </svg>
  );
}

function Toast({msg, onDone}) {
  useEffect(() => {
    const t = setTimeout(onDone, 1900);
    return () => clearTimeout(t);
  }, []);
  return <div className="toast">{msg}</div>;
}

/* small inline icons (CSS-mask is overkill — go inline svg) */
const I = {
  copy:    (p) => <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><rect x="4.5" y="4.5" width="8.5" height="9" rx="1.2"/><path d="M3 11.5V3.5A1 1 0 0 1 4 2.5h7"/></svg>,
  save:    (p) => <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M3 3h7l3 3v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M5 3v3h5V3"/></svg>,
  run:     (p) => <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M4 3l9 5-9 5V3z" fill="currentColor" stroke="none"/></svg>,
  search:  (p) => <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><circle cx="7" cy="7" r="4"/><path d="m13 13-3-3"/></svg>,
  add:     (p) => <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M8 3v10M3 8h10"/></svg>,
  more:    (p) => <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" {...p}><circle cx="3.5" cy="8" r="1.2"/><circle cx="8" cy="8" r="1.2"/><circle cx="12.5" cy="8" r="1.2"/></svg>,
  ext:     (p) => <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M9 3h4v4M13 3l-6 6M11 9v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h3"/></svg>,
  filter:  (p) => <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M2 3h12l-4.5 6V14l-3-1.2V9L2 3z"/></svg>,
  refresh: (p) => <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M13 8a5 5 0 1 1-1.5-3.5"/><path d="M13 2.5V5h-2.5"/></svg>,
  trash:   (p) => <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M3 5h10M6 5V3.5h4V5M5 5l.6 8.5a1 1 0 0 0 1 .9h2.8a1 1 0 0 0 1-.9L11 5"/></svg>,
  edit:    (p) => <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M11 2.5l2.5 2.5-7.5 7.5H3.5V10L11 2.5z"/></svg>,
  link:    (p) => <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M7 9.5a3 3 0 0 0 4.2 0l2-2a3 3 0 0 0-4.2-4.2l-1 1"/><path d="M9 6.5a3 3 0 0 0-4.2 0l-2 2a3 3 0 0 0 4.2 4.2l1-1"/></svg>,
  check:   (p) => <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" {...p}><path d="m3 8.5 3 3 7-7"/></svg>,
  spark:   (p) => <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M8 2v4M8 10v4M2 8h4M10 8h4M4 4l2.5 2.5M9.5 9.5 12 12M4 12l2.5-2.5M9.5 6.5 12 4"/></svg>,
};

function Sortable({head, rows, render, initialSort, rowKey, className, onRowClick}){
  const [sort, setSort] = useState(initialSort || {col:null, dir:1});
  const sorted = useMemo(() => {
    if (!sort.col) return rows;
    const c = head.find(h => h.key === sort.col);
    if (!c) return rows;
    const accessor = c.sortBy || (r => r[c.key]);
    return [...rows].sort((a,b) => {
      const av = accessor(a), bv = accessor(b);
      if (av == null) return 1; if (bv == null) return -1;
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * sort.dir;
      return String(av).localeCompare(String(bv)) * sort.dir;
    });
  }, [rows, sort, head]);
  return (
    <table className={cx("tbl", className)}>
      <thead><tr>
        {head.map(h => (
          <th key={h.key} className={h.num ? "num" : ""}
              onClick={() => setSort(s => ({col:h.key, dir: s.col === h.key ? -s.dir : 1}))}>
            {h.label}
            <span className="sort-arrow">
              {sort.col === h.key ? (sort.dir > 0 ? "▲" : "▼") : "↕"}
            </span>
          </th>
        ))}
      </tr></thead>
      <tbody>
        {sorted.map((r, idx) => (
          <tr key={rowKey ? rowKey(r) : idx} onClick={() => onRowClick && onRowClick(r)} style={onRowClick && {cursor:"pointer"}}>
            {render(r)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Object.assign(window, { cx, fmtChg, Card, Pill, Sparkline, Toast, Sortable, I });
