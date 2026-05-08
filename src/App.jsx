import { useState } from "react";

const MOODS = [
  { emoji: "🤩", label: "Exceptional" },
  { emoji: "😊", label: "Bine" },
  { emoji: "😐", label: "Normal" },
  { emoji: "😓", label: "Obosit" },
  { emoji: "💀", label: "Epuizat" },
];

const STYLES = ["Liber", "Spate", "Bras", "Fluture", "Mixt"];

const initialLogs = [
  { id: 1, date: "2026-05-01", distance: 3200, duration: 62, pulseAvg: 142, pulseMax: 178, bestTime100: 64.2, mood: "😊", styles: ["Liber"], sleep: 7.5, hydration: 2.5, notes: "Antrenament bun" },
  { id: 2, date: "2026-05-02", distance: 2800, duration: 55, pulseAvg: 138, pulseMax: 172, bestTime100: 63.8, mood: "😐", styles: ["Liber"], sleep: 6, hydration: 2, notes: "" },
  { id: 3, date: "2026-05-03", distance: 4000, duration: 75, pulseAvg: 155, pulseMax: 185, bestTime100: 62.5, mood: "🤩", styles: ["Fluture"], sleep: 8, hydration: 3, notes: "Record personal!" },
  { id: 4, date: "2026-05-05", distance: 3800, duration: 70, pulseAvg: 150, pulseMax: 183, bestTime100: 62.9, mood: "😊", styles: ["Liber"], sleep: 7, hydration: 2.6, notes: "" },
  { id: 5, date: "2026-05-06", distance: 4200, duration: 78, pulseAvg: 158, pulseMax: 188, bestTime100: 61.8, mood: "🤩", styles: ["Mixt"], sleep: 8.5, hydration: 3.2, notes: "Alt record! 61.8s" },
];

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [logs, setLogs] = useState(initialLogs);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    distance: "", duration: "", pulseAvg: "", pulseMax: "",
    bestTime100: "", mood: "😊", styles: [], sleep: "", hydration: "", notes: ""
  });

  const totalKm = (logs.reduce((s, l) => s + l.distance, 0) / 1000).toFixed(1);
  const bestTime = Math.min(...logs.map(l => l.bestTime100));
  const avgPulse = Math.round(logs.reduce((s, l) => s + l.pulseAvg, 0) / logs.length);
  const maxPulse = Math.max(...logs.map(l => l.pulseMax));

  function saveLog() {
    const newLog = {
      id: Date.now(),
      ...form,
      distance: parseInt(form.distance) || 0,
      duration: parseInt(form.duration) || 0,
      pulseAvg: parseInt(form.pulseAvg) || 0,
      pulseMax: parseInt(form.pulseMax) || 0,
      bestTime100: parseFloat(form.bestTime100) || 0,
      sleep: parseFloat(form.sleep) || 0,
      hydration: parseFloat(form.hydration) || 0,
    };
    setLogs([...logs, newLog].sort((a, b) => a.date.localeCompare(b.date)));
    setShowForm(false);
    setForm({ date: new Date().toISOString().split("T")[0], distance: "", duration: "", pulseAvg: "", pulseMax: "", bestTime100: "", mood: "😊", styles: [], sleep: "", hydration: "", notes: "" });
  }

  function formatDate(d) {
    return new Date(d).toLocaleDateString("ro-RO", { day: "numeric", month: "short" });
  }

  const bg = "#060f1e";
  const card = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(125,211,252,0.15)", borderRadius: 16, padding: 16 };

  return (
    <div style={{ minHeight: "100vh", background: bg, color: "#e8f4ff", fontFamily: "sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#0a1f3d", borderBottom: "1px solid rgba(125,211,252,0.1)", padding: "16px 20px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#38bdf8" }}>AquaJournal</div>
            <div style={{ fontSize: "0.75rem", color: "#475569" }}>Jurnal performanta inotatori</div>
          </div>
          <button onClick={() => setShowForm(true)} style={{ background: "#0ea5e9", border: "none", borderRadius: 10, padding: "10px 16px", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
            + Antrenament
          </button>
        </div>

        {/* Tabs */}
        <div style={{ maxWidth: 800, margin: "12px auto 0", display: "flex", gap: 4 }}>
          {[["dashboard", "Dashboard"], ["jurnal", "Jurnal"], ["saptamana", "Saptamanal"]].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{
              padding: "8px 14px", border: "none", background: "transparent",
              color: tab === k ? "#38bdf8" : "#475569", fontWeight: tab === k ? 700 : 400,
              borderBottom: tab === k ? "2px solid #38bdf8" : "2px solid transparent", cursor: "pointer"
            }}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px 16px 60px" }}>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 20 }}>
              {[
                ["Total KM", totalKm + " km", "🌊", "#38bdf8"],
                ["Best 100m", bestTime + "s", "⚡", "#f59e0b"],
                ["Puls mediu", avgPulse + " bpm", "❤️", "#ef4444"],
                ["Sesiuni", logs.length, "🏊", "#a78bfa"],
              ].map(([l, v, icon, color], i) => (
                <div key={i} style={{ ...card, textAlign: "center" }}>
                  <div style={{ fontSize: 20 }}>{icon}</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, color }}>{v}</div>
                  <div style={{ fontSize: "0.7rem", color: "#475569" }}>{l}</div>
                </div>
              ))}
            </div>

            {/* AI Insights */}
            <div style={{ ...card, background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.25)", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 18 }}>🤖</span>
                <span style={{ fontWeight: 700, color: "#7dd3fc" }}>AI Insights</span>
                <span style={{ background: "rgba(14,165,233,0.2)", color: "#38bdf8", borderRadius: 6, padding: "2px 8px", fontSize: "0.7rem", fontWeight: 700 }}>PREMIUM</span>
              </div>
              {[
                ["⚡", "Ai imbunatatit best-ul pe 100m cu 2.4s saptamana aceasta!"],
                ["❤️", "Pulsul mediu a crescut. Recomand o zi de recuperare maine."],
                ["🎯", "La acest ritm vei atinge 60s pe 100m in 3 saptamani."],
              ].map(([icon, text], i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                  <span>{icon}</span>
                  <span style={{ fontSize: "0.85rem", color: "#cbd5e1" }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Ultimul antrenament */}
            {logs.length > 0 && (() => {
              const last = [...logs].sort((a, b) => b.date.localeCompare(a.date))[0];
              return (
                <div style={card}>
                  <div style={{ fontWeight: 700, color: "#7dd3fc", marginBottom: 12 }}>
                    Ultimul antrenament - {formatDate(last.date)} {last.mood}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                    {[
                      ["Distanta", last.distance + "m"],
                      ["Durata", last.duration + " min"],
                      ["Puls mediu", last.pulseAvg + " bpm"],
                      ["Puls max", last.pulseMax + " bpm"],
                      ["Best 100m", last.bestTime100 + "s"],
                      ["Somn", last.sleep + "h"],
                    ].map(([l, v], i) => (
                      <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "10px 12px" }}>
                        <div style={{ fontSize: "0.7rem", color: "#475569" }}>{l}</div>
                        <div style={{ fontWeight: 700, color: "#e8f4ff", marginTop: 2 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  {last.notes ? <div style={{ marginTop: 10, padding: "8px 12px", background: "rgba(125,211,252,0.06)", borderRadius: 10, fontSize: "0.85rem", color: "#94a3b8", fontStyle: "italic" }}>"{last.notes}"</div> : null}
                </div>
              );
            })()}
          </div>
        )}

        {/* JURNAL */}
        {tab === "jurnal" && (
          <div style={{ display: "grid", gap: 10 }}>
            {[...logs].reverse().map(log => (
              <div key={log.id} onClick={() => setSelected(selected === log.id ? null : log.id)}
                style={{ ...card, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 24 }}>{log.mood}</span>
                    <div>
                      <div style={{ fontWeight: 700 }}>{formatDate(log.date)}</div>
                      <div style={{ fontSize: "0.78rem", color: "#475569" }}>{log.distance}m - {log.duration} min - {log.styles.join(", ")}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: "#f59e0b" }}>{log.bestTime100}s</div>
                    <div style={{ fontSize: "0.7rem", color: "#475569" }}>100m</div>
                  </div>
                </div>
                {selected === log.id && (
                  <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12 }}>
                    {[["Puls med", log.pulseAvg + " bpm"], ["Puls max", log.pulseMax + " bpm"], ["Somn", log.sleep + "h"], ["Hidratare", log.hydration + "L"]].map(([l, v], i) => (
                      <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "8px 10px" }}>
                        <div style={{ fontSize: "0.68rem", color: "#475569" }}>{l}</div>
                        <div style={{ fontWeight: 700, color: "#7dd3fc", fontSize: "0.9rem" }}>{v}</div>
                      </div>
                    ))}
                    {log.notes ? <div style={{ gridColumn: "span 4", fontSize: "0.82rem", color: "#94a3b8", fontStyle: "italic" }}>"{log.notes}"</div> : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* SAPTAMANAL */}
        {tab === "saptamana" && (
          <div style={card}>
            <div style={{ fontWeight: 700, color: "#7dd3fc", marginBottom: 16 }}>Rezumat saptamana curenta</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
              {[
                ["Total distanta", (logs.reduce((s, l) => s + l.distance, 0) / 1000).toFixed(1) + " km"],
                ["Sesiuni", logs.length + " sesiuni"],
                ["Puls mediu", avgPulse + " bpm"],
                ["Puls maxim", maxPulse + " bpm"],
                ["Best 100m", bestTime + "s"],
                ["Medie 100m", (logs.reduce((s, l) => s + l.bestTime100, 0) / logs.length).toFixed(1) + "s"],
              ].map(([l, v], i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px" }}>
                  <div style={{ fontSize: "0.72rem", color: "#475569" }}>{l}</div>
                  <div style={{ fontWeight: 700, color: "#e8f4ff", fontSize: "1.1rem", marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: "0.8rem", color: "#475569", marginBottom: 8 }}>Stare pe zile:</div>
              <div style={{ display: "flex", gap: 8 }}>
                {logs.map(l => <span key={l.id} title={formatDate(l.date)} style={{ fontSize: 24 }}>{l.mood}</span>)}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FORM */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
          <div style={{ background: "#0a1628", border: "1px solid rgba(125,211,252,0.2)", borderRadius: 20, padding: 24, width: "100%", maxWidth: 460, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontWeight: 800, color: "#38bdf8", fontSize: "1.1rem" }}>Antrenament nou</div>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", color: "#475569", fontSize: 20, cursor: "pointer" }}>X</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[["Data", "date", "date"], ["Distanta (m)", "distance", "number"], ["Durata (min)", "duration", "number"], ["Puls mediu", "pulseAvg", "number"], ["Puls maxim", "pulseMax", "number"], ["Best 100m (s)", "bestTime100", "number"], ["Somn (ore)", "sleep", "number"], ["Hidratare (L)", "hydration", "number"]].map(([placeholder, key, type]) => (
                <input key={key} type={type} placeholder={placeholder} value={form[key]}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(125,211,252,0.2)", borderRadius: 10, padding: "10px 12px", color: "#e8f4ff", fontSize: "0.9rem", outline: "none", width: "100%", boxSizing: "border-box" }} />
              ))}
            </div>

            {/* Mood */}
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: "0.8rem", color: "#475569", marginBottom: 8 }}>Cum te-ai simtit?</div>
              <div style={{ display: "flex", gap: 8 }}>
                {MOODS.map(m => (
                  <button key={m.emoji} onClick={() => setForm({ ...form, mood: m.emoji })}
                    style={{ background: form.mood === m.emoji ? "rgba(14,165,233,0.25)" : "rgba(255,255,255,0.05)", border: form.mood === m.emoji ? "2px solid #38bdf8" : "2px solid transparent", borderRadius: 10, padding: "6px 8px", fontSize: 22, cursor: "pointer" }}>
                    {m.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Stiluri */}
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: "0.8rem", color: "#475569", marginBottom: 8 }}>Stiluri:</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {STYLES.map(s => (
                  <button key={s} onClick={() => setForm({ ...form, styles: form.styles.includes(s) ? form.styles.filter(x => x !== s) : [...form.styles, s] })}
                    style={{ background: form.styles.includes(s) ? "rgba(14,165,233,0.25)" : "rgba(255,255,255,0.05)", border: "1px solid " + (form.styles.includes(s) ? "#38bdf8" : "rgba(125,211,252,0.15)"), borderRadius: 8, padding: "6px 12px", color: form.styles.includes(s) ? "#38bdf8" : "#64748b", cursor: "pointer", fontSize: "0.85rem" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <textarea placeholder="Note..." value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} rows={3}
              style={{ marginTop: 14, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(125,211,252,0.2)", borderRadius: 10, padding: "10px 12px", color: "#e8f4ff", fontSize: "0.9rem", width: "100%", boxSizing: "border-box", resize: "vertical", outline: "none" }} />

            <button onClick={saveLog} style={{ marginTop: 16, width: "100%", background: "#0ea5e9", border: "none", borderRadius: 12, padding: "14px 0", color: "#fff", fontWeight: 700, fontSize: "1rem", cursor: "pointer" }}>
              Salveaza antrenamentul
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
