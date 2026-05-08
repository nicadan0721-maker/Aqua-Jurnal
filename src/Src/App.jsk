import { useState, useEffect } from “react”;
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from “recharts”;

const MOODS = [
{ emoji: “🤩”, label: “Excepțional” },
{ emoji: “😊”, label: “Bine” },
{ emoji: “😐”, label: “Normal” },
{ emoji: “😓”, label: “Obosit” },
{ emoji: “💀”, label: “Epuizat” },
];

const STYLES = [“Liber”, “Spate”, “Bras”, “Fluture”, “Mixt”];

const initialLogs = [
{ id: 1, date: “2026-04-28”, distance: 3200, duration: 62, pulseAvg: 142, pulseMax: 178, bestTime100: 64.2, mood: “😊”, styles: [“Liber”, “Spate”], sleep: 7.5, hydration: 2.5, notes: “Antrenament bun, viraje îmbunătățite” },
{ id: 2, date: “2026-04-29”, distance: 2800, duration: 55, pulseAvg: 138, pulseMax: 172, bestTime100: 63.8, mood: “😐”, styles: [“Liber”], sleep: 6, hydration: 2, notes: “” },
{ id: 3, date: “2026-04-30”, distance: 4000, duration: 75, pulseAvg: 155, pulseMax: 185, bestTime100: 62.5, mood: “🤩”, styles: [“Liber”, “Fluture”, “Mixt”], sleep: 8, hydration: 3, notes: “Record personal 100m!” },
{ id: 4, date: “2026-05-01”, distance: 1500, duration: 35, pulseAvg: 128, pulseMax: 160, bestTime100: 65.1, mood: “😓”, styles: [“Spate”], sleep: 5.5, hydration: 1.8, notes: “Zi de recuperare” },
{ id: 5, date: “2026-05-02”, distance: 3600, duration: 68, pulseAvg: 148, pulseMax: 181, bestTime100: 63.2, mood: “😊”, styles: [“Liber”, “Bras”], sleep: 8, hydration: 2.8, notes: “” },
{ id: 6, date: “2026-05-05”, distance: 3800, duration: 70, pulseAvg: 150, pulseMax: 183, bestTime100: 62.9, mood: “😊”, styles: [“Liber”, “Fluture”], sleep: 7, hydration: 2.6, notes: “Săptămâna nouă, energie bună” },
{ id: 7, date: “2026-05-06”, distance: 4200, duration: 78, pulseAvg: 158, pulseMax: 188, bestTime100: 61.8, mood: “🤩”, styles: [“Liber”, “Mixt”], sleep: 8.5, hydration: 3.2, notes: “Alt record! 61.8s pe 100m” },
];

function formatDate(dateStr) {
const d = new Date(dateStr);
return d.toLocaleDateString(“ro-RO”, { day: “numeric”, month: “short” });
}

function getWeekLabel(dateStr) {
const d = new Date(dateStr);
const week = Math.ceil(d.getDate() / 7);
return `S${week} ${d.toLocaleDateString("ro-RO", { month: "short" })}`;
}

function groupByWeek(logs) {
const weeks = {};
logs.forEach(log => {
const d = new Date(log.date);
const monday = new Date(d);
monday.setDate(d.getDate() - d.getDay() + 1);
const key = monday.toISOString().split(“T”)[0];
if (!weeks[key]) weeks[key] = [];
weeks[key].push(log);
});
return weeks;
}

function weekStats(logs) {
if (!logs.length) return null;
const totalDist = logs.reduce((s, l) => s + l.distance, 0);
const totalDur = logs.reduce((s, l) => s + l.duration, 0);
const avgPulse = Math.round(logs.reduce((s, l) => s + l.pulseAvg, 0) / logs.length);
const maxPulse = Math.max(…logs.map(l => l.pulseMax));
const bestTime = Math.min(…logs.map(l => l.bestTime100));
const avgTime = (logs.reduce((s, l) => s + l.bestTime100, 0) / logs.length).toFixed(1);
const avgSleep = (logs.reduce((s, l) => s + l.sleep, 0) / logs.length).toFixed(1);
return { totalDist, totalDur, avgPulse, maxPulse, bestTime, avgTime, avgSleep, sessions: logs.length };
}

const CustomTooltip = ({ active, payload, label }) => {
if (active && payload && payload.length) {
return (
<div style={{ background: “#0a1628”, border: “1px solid #1e4a7a”, borderRadius: 10, padding: “10px 14px”, fontSize: 13, fontFamily: “sans-serif” }}>
<div style={{ color: “#7dd3fc”, marginBottom: 4 }}>{label}</div>
{payload.map((p, i) => (
<div key={i} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></div>
))}
</div>
);
}
return null;
};

export default function AquaJournal() {
const [tab, setTab] = useState(“dashboard”);
const [logs, setLogs] = useState(initialLogs);
const [showForm, setShowForm] = useState(false);
const [selectedLog, setSelectedLog] = useState(null);
const [form, setForm] = useState({
date: new Date().toISOString().split(“T”)[0],
distance: “”, duration: “”, pulseAvg: “”, pulseMax: “”,
bestTime100: “”, mood: “😊”, styles: [], sleep: “”, hydration: “”, notes: “”
});

const weeks = groupByWeek(logs);
const weekKeys = Object.keys(weeks).sort();
const currentWeekKey = weekKeys[weekKeys.length - 1];
const prevWeekKey = weekKeys[weekKeys.length - 2];
const currentWeek = weekStats(weeks[currentWeekKey] || []);
const prevWeek = weekStats(weeks[prevWeekKey] || []);

const allTimeBest = Math.min(…logs.map(l => l.bestTime100));
const totalKm = (logs.reduce((s, l) => s + l.distance, 0) / 1000).toFixed(1);
const streak = 3;

const chartData = logs.slice(-7).map(l => ({
date: formatDate(l.date),
distanță: l.distance,
puls: l.pulseAvg,
timp: l.bestTime100,
durată: l.duration,
}));

const weeklyChartData = weekKeys.map(wk => {
const s = weekStats(weeks[wk]);
const d = new Date(wk);
return {
săpt: `${d.getDate()}/${d.getMonth() + 1}`,
distanță: Math.round(s.totalDist / 1000 * 10) / 10,
puls: s.avgPulse,
timp: parseFloat(s.bestTime),
};
});

function handleAddLog() {
const newLog = {
id: Date.now(),
…form,
distance: parseInt(form.distance),
duration: parseInt(form.duration),
pulseAvg: parseInt(form.pulseAvg),
pulseMax: parseInt(form.pulseMax),
bestTime100: parseFloat(form.bestTime100),
sleep: parseFloat(form.sleep),
hydration: parseFloat(form.hydration),
};
setLogs([…logs, newLog].sort((a, b) => a.date.localeCompare(b.date)));
setShowForm(false);
setForm({ date: new Date().toISOString().split(“T”)[0], distance: “”, duration: “”, pulseAvg: “”, pulseMax: “”, bestTime100: “”, mood: “😊”, styles: [], sleep: “”, hydration: “”, notes: “” });
}

function diff(curr, prev, key, lower = false) {
if (!prev || !curr) return null;
const d = curr[key] - prev[key];
const pct = Math.round(Math.abs(d) / prev[key] * 100);
const good = lower ? d < 0 : d > 0;
return { d: d.toFixed(1), pct, good, zero: d === 0 };
}

const inp = (placeholder, key, type = “number”) => (
<input
type={type} placeholder={placeholder} value={form[key]}
onChange={e => setForm({ …form, [key]: e.target.value })}
style={{
background: “rgba(255,255,255,0.06)”, border: “1px solid rgba(125,211,252,0.2)”,
borderRadius: 10, padding: “10px 14px”, color: “#e8f4ff”, fontFamily: “sans-serif”,
fontSize: “0.9rem”, width: “100%”, boxSizing: “border-box”, outline: “none”,
}}
/>
);

return (
<div style={{
minHeight: “100vh”,
background: “#060f1e”,
fontFamily: “‘Georgia’, serif”,
color: “#e8f4ff”,
position: “relative”,
}}>
{/* Header */}
<div style={{
background: “linear-gradient(180deg, #0a1f3d 0%, #060f1e 100%)”,
borderBottom: “1px solid rgba(125,211,252,0.1)”,
padding: “20px 20px 0”,
}}>
<div style={{ maxWidth: 900, margin: “0 auto” }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 20 }}>
<div>
<h1 style={{
margin: 0, fontSize: “1.8rem”, fontWeight: 800,
background: “linear-gradient(90deg, #38bdf8, #7dd3fc)”,
WebkitBackgroundClip: “text”, WebkitTextFillColor: “transparent”,
letterSpacing: “-0.5px”,
}}>AquaJournal 🌊</h1>
<p style={{ margin: “2px 0 0”, color: “#475569”, fontFamily: “sans-serif”, fontSize: “0.8rem” }}>
Jurnal performanță • Înotători de elită
</p>
</div>
<button onClick={() => setShowForm(true)} style={{
background: “linear-gradient(135deg, #0ea5e9, #0284c7)”,
border: “none”, borderRadius: 12, padding: “10px 18px”,
color: “#fff”, fontFamily: “sans-serif”, fontWeight: 700,
fontSize: “0.9rem”, cursor: “pointer”,
boxShadow: “0 4px 15px rgba(14,165,233,0.35)”,
}}>+ Antrenament</button>
</div>

```
      {/* Tabs */}
      <div style={{ display: "flex", gap: 0 }}>
        {[["dashboard", "📊 Dashboard"], ["jurnal", "📝 Jurnal"], ["saptamana", "📅 Săptămânal"], ["grafice", "📈 Grafice"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            padding: "10px 16px", border: "none", background: "transparent",
            color: tab === key ? "#38bdf8" : "#475569",
            fontFamily: "sans-serif", fontSize: "0.85rem", fontWeight: tab === key ? 700 : 400,
            cursor: "pointer", borderBottom: tab === key ? "2px solid #38bdf8" : "2px solid transparent",
            transition: "all 0.2s", whiteSpace: "nowrap",
          }}>{label}</button>
        ))}
      </div>
    </div>
  </div>

  <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px 60px" }}>

    {/* DASHBOARD */}
    {tab === "dashboard" && (
      <div>
        {/* Hero stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Total KM", value: `${totalKm}`, unit: "km", icon: "🌊", color: "#38bdf8" },
            { label: "Best 100m", value: allTimeBest.toFixed(1), unit: "sec", icon: "⚡", color: "#f59e0b" },
            { label: "Streak", value: streak, unit: "zile", icon: "🔥", color: "#ef4444" },
            { label: "Sesiuni", value: logs.length, unit: "total", icon: "🏊", color: "#a78bfa" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.04)", border: `1px solid ${s.color}33`,
              borderRadius: 16, padding: "16px 14px", textAlign: "center",
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color, fontFamily: "sans-serif", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: "0.7rem", color: "#64748b", fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: 1, marginTop: 2 }}>{s.unit} {s.label}</div>
            </div>
          ))}
        </div>

        {/* Comparatie saptamani */}
        {currentWeek && prevWeek && (
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(125,211,252,0.12)",
            borderRadius: 20, padding: 22, marginBottom: 24,
          }}>
            <h3 style={{ margin: "0 0 16px", color: "#7dd3fc", fontSize: "1rem", fontFamily: "sans-serif" }}>
              📅 Comparație săptămânală
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { label: "Distanță totală", curr: (currentWeek.totalDist/1000).toFixed(1), prev: (prevWeek.totalDist/1000).toFixed(1), unit: "km", key: "totalDist", scale: 1/1000 },
                { label: "Puls mediu", curr: currentWeek.avgPulse, prev: prevWeek.avgPulse, unit: "bpm", key: "avgPulse", lower: true },
                { label: "Puls maxim", curr: currentWeek.maxPulse, prev: prevWeek.maxPulse, unit: "bpm", key: "maxPulse", lower: true },
                { label: "Best 100m", curr: currentWeek.bestTime, prev: prevWeek.bestTime, unit: "sec", key: "bestTime", lower: true },
                { label: "Medie timp 100m", curr: currentWeek.avgTime, prev: prevWeek.avgTime, unit: "sec", key: "avgTime", lower: true },
                { label: "Somn mediu", curr: currentWeek.avgSleep, prev: prevWeek.avgSleep, unit: "ore", key: "avgSleep" },
              ].map((item, i) => {
                const currVal = parseFloat(item.curr);
                const prevVal = parseFloat(item.prev);
                const delta = currVal - prevVal;
                const pct = Math.abs(Math.round(delta / prevVal * 100));
                const good = item.lower ? delta < 0 : delta > 0;
                const arrow = delta > 0 ? "↑" : delta < 0 ? "↓" : "→";
                const color = delta === 0 ? "#64748b" : good ? "#22c55e" : "#ef4444";
                return (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.03)", borderRadius: 12,
                    padding: "14px", border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <div style={{ color: "#64748b", fontFamily: "sans-serif", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>{item.label}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: "1.3rem", fontWeight: 700, color: "#e8f4ff", fontFamily: "sans-serif" }}>{item.curr}<span style={{ fontSize: "0.75rem", color: "#475569", marginLeft: 3 }}>{item.unit}</span></span>
                      <span style={{ color, fontFamily: "sans-serif", fontSize: "0.85rem", fontWeight: 700 }}>{arrow} {pct}%</span>
                    </div>
                    <div style={{ color: "#475569", fontFamily: "sans-serif", fontSize: "0.75rem", marginTop: 4 }}>Prev: {item.prev} {item.unit}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* AI Insights */}
        <div style={{
          background: "linear-gradient(135deg, rgba(14,165,233,0.1), rgba(168,85,247,0.08))",
          border: "1px solid rgba(14,165,233,0.25)", borderRadius: 20, padding: 22, marginBottom: 24,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <span style={{ fontSize: 20 }}>🤖</span>
            <h3 style={{ margin: 0, color: "#7dd3fc", fontSize: "1rem", fontFamily: "sans-serif" }}>AI Insights</h3>
            <span style={{ background: "rgba(14,165,233,0.2)", color: "#38bdf8", borderRadius: 6, padding: "2px 8px", fontSize: "0.7rem", fontFamily: "sans-serif", fontWeight: 700 }}>PREMIUM</span>
          </div>
          {[
            { icon: "⚡", text: "Ai îmbunătățit best-ul pe 100m cu 2.4s față de săptămâna trecută. Continuă intervalele de viteză!", color: "#f59e0b" },
            { icon: "❤️", text: "Pulsul mediu a crescut cu 8 bpm. Recomand o zi de recuperare activă mâine.", color: "#ef4444" },
            { icon: "😴", text: "Somnul mediu (6.8h) este sub optim. Performanța ta ar crește cu 7-12% la 8h somn.", color: "#a78bfa" },
            { icon: "🎯", text: "Ești pe drumul cel bun! La acest ritm vei atinge 60s pe 100m în ~3 săptămâni.", color: "#22c55e" },
          ].map((ins, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, padding: "10px 0",
              borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
              alignItems: "flex-start",
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{ins.icon}</span>
              <span style={{ fontFamily: "sans-serif", fontSize: "0.87rem", color: "#cbd5e1", lineHeight: 1.5 }}>{ins.text}</span>
            </div>
          ))}
        </div>

        {/* Ultimul antrenament */}
        {logs.length > 0 && (() => {
          const last = logs[logs.length - 1];
          return (
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(125,211,252,0.12)",
              borderRadius: 20, padding: 22,
            }}>
              <h3 style={{ margin: "0 0 16px", color: "#7dd3fc", fontSize: "1rem", fontFamily: "sans-serif" }}>
                🏊 Ultimul antrenament — {formatDate(last.date)}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[
                  ["Distanță", `${last.distance}m`, "🌊"],
                  ["Durată", `${last.duration} min`, "⏱️"],
                  ["Puls mediu", `${last.pulseAvg} bpm`, "❤️"],
                  ["Puls max", `${last.pulseMax} bpm`, "💓"],
                  ["Best 100m", `${last.bestTime100}s`, "⚡"],
                  ["Stare", last.mood, ""],
                ].map(([label, val, icon], i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "12px 14px" }}>
                    <div style={{ color: "#475569", fontFamily: "sans-serif", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: 0.5 }}>{icon} {label}</div>
                    <div style={{ fontFamily: "sans-serif", fontWeight: 700, color: "#e8f4ff", fontSize: "1.05rem", marginTop: 4 }}>{val}</div>
                  </div>
                ))}
              </div>
              {last.notes && (
                <div style={{ marginTop: 14, padding: "12px 16px", background: "rgba(125,211,252,0.06)", borderRadius: 12, fontFamily: "sans-serif", fontSize: "0.88rem", color: "#94a3b8", fontStyle: "italic" }}>
                  💬 "{last.notes}"
                </div>
              )}
            </div>
          );
        })()}
      </div>
    )}

    {/* JURNAL */}
    {tab === "jurnal" && (
      <div>
        <div style={{ display: "grid", gap: 12 }}>
          {[...logs].reverse().map(log => (
            <div key={log.id} onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)}
              style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(125,211,252,0.1)",
                borderRadius: 16, overflow: "hidden", cursor: "pointer",
                transition: "all 0.2s",
              }}>
              <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ fontSize: 28 }}>{log.mood}</div>
                  <div>
                    <div style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "1rem", color: "#e8f4ff" }}>{formatDate(log.date)}</div>
                    <div style={{ fontFamily: "sans-serif", fontSize: "0.8rem", color: "#475569", marginTop: 2 }}>
                      {log.distance}m · {log.duration} min · {log.styles.join(", ")}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "sans-serif", fontWeight: 700, color: "#f59e0b", fontSize: "1.1rem" }}>{log.bestTime100}s</div>
                  <div style={{ fontFamily: "sans-serif", fontSize: "0.75rem", color: "#475569" }}>100m best</div>
                </div>
              </div>
              {selectedLog === log.id && (
                <div style={{ padding: "0 20px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 14 }}>
                    {[
                      ["❤️ Puls mediu", `${log.pulseAvg} bpm`],
                      ["💓 Puls max", `${log.pulseMax} bpm`],
                      ["😴 Somn", `${log.sleep}h`],
                      ["💧 Hidratare", `${log.hydration}L`],
                    ].map(([l, v], i) => (
                      <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 12px" }}>
                        <div style={{ fontFamily: "sans-serif", fontSize: "0.72rem", color: "#475569" }}>{l}</div>
                        <div style={{ fontFamily: "sans-serif", fontWeight: 700, color: "#7dd3fc", marginTop: 3 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                  {log.notes && (
                    <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(125,211,252,0.05)", borderRadius: 10, fontFamily: "sans-serif", fontSize: "0.85rem", color: "#94a3b8", fontStyle: "italic" }}>
                      💬 "{log.notes}"
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}

    {/* SAPTAMANAL */}
    {tab === "saptamana" && (
      <div style={{ display: "grid", gap: 20 }}>
        {weekKeys.reverse().map(wk => {
          const s = weekStats(weeks[wk]);
          const d = new Date(wk);
          const label = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
          const isLatest = wk === weekKeys[0];
          return (
            <div key={wk} style={{
              background: isLatest ? "rgba(14,165,233,0.08)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${isLatest ? "rgba(14,165,233,0.3)" : "rgba(125,211,252,0.1)"}`,
              borderRadius: 20, padding: 22,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontFamily: "sans-serif", fontSize: "1rem", color: isLatest ? "#38bdf8" : "#7dd3fc" }}>
                  {isLatest && "🔥 "} Săptămâna {label}
                </h3>
                <span style={{ fontFamily: "sans-serif", fontSize: "0.8rem", color: "#475569" }}>{s.sessions} sesiuni</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[
                  ["🌊 Distanță", `${(s.totalDist/1000).toFixed(1)} km`],
                  ["⏱️ Timp total", `${s.totalDur} min`],
                  ["❤️ Puls mediu", `${s.avgPulse} bpm`],
                  ["💓 Puls max", `${s.maxPulse} bpm`],
                  ["⚡ Best 100m", `${s.bestTime}s`],
                  ["📊 Medie 100m", `${s.avgTime}s`],
                ].map(([l, v], i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 14px" }}>
                    <div style={{ fontFamily: "sans-serif", fontSize: "0.72rem", color: "#475569" }}>{l}</div>
                    <div style={{ fontFamily: "sans-serif", fontWeight: 700, color: "#e8f4ff", fontSize: "1.05rem", marginTop: 4 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
                {weeks[wk].map(l => (
                  <span key={l.id} title={formatDate(l.date)} style={{ fontSize: 22 }}>{l.mood}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    )}

    {/* GRAFICE */}
    {tab === "grafice" && (
      <div style={{ display: "grid", gap: 24 }}>
        {[
          { title: "⚡ Progres 100m (ultimele 7 sesiuni)", dataKey: "timp", color: "#f59e0b", unit: "s", data: chartData },
          { title: "❤️ Puls mediu (ultimele 7 sesiuni)", dataKey: "puls", color: "#ef4444", unit: "bpm", data: chartData },
          { title: "🌊 Distanță pe săptămână (km)", dataKey: "distanță", color: "#38bdf8", unit: "km", data: weeklyChartData, bar: true },
        ].map((g, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(125,211,252,0.1)",
            borderRadius: 20, padding: 22,
          }}>
            <h3 style={{ margin: "0 0 20px", fontFamily: "sans-serif", fontSize: "0.95rem", color: "#7dd3fc" }}>{g.title}</h3>
            <ResponsiveContainer width="100%" height={180}>
              {g.bar ? (
                <BarChart data={g.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="săpt" tick={{ fill: "#475569", fontSize: 11, fontFamily: "sans-serif" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#475569", fontSize: 11, fontFamily: "sans-serif" }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey={g.dataKey} fill={g.color} radius={[6, 6, 0, 0]} fillOpacity={0.8} />
                </BarChart>
              ) : (
                <LineChart data={g.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" tick={{ fill: "#475569", fontSize: 11, fontFamily: "sans-serif" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#475569", fontSize: 11, fontFamily: "sans-serif" }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey={g.dataKey} stroke={g.color} strokeWidth={2.5} dot={{ fill: g.color, r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* FORM MODAL */}
  {showForm && (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, padding: 16,
    }}>
      <div style={{
        background: "#0a1628", border: "1px solid rgba(125,211,252,0.2)",
        borderRadius: 24, padding: 28, width: "100%", maxWidth: 500,
        maxHeight: "90vh", overflowY: "auto",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ margin: 0, color: "#38bdf8", fontSize: "1.2rem" }}>+ Antrenament nou</h2>
          <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", color: "#475569", fontSize: 22, cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {inp("Data", "date", "date")}
            {inp("Distanță (m)", "distance")}
            {inp("Durată (min)", "duration")}
            {inp("Puls mediu (bpm)", "pulseAvg")}
            {inp("Puls maxim (bpm)", "pulseMax")}
            {inp("Best 100m (sec)", "bestTime100")}
            {inp("Somn (ore)", "sleep")}
            {inp("Hidratare (L)", "hydration")}
          </div>

          {/* Mood */}
          <div>
            <div style={{ color: "#475569", fontFamily: "sans-serif", fontSize: "0.8rem", marginBottom: 8 }}>Cum te-ai simțit?</div>
            <div style={{ display: "flex", gap: 10 }}>
              {MOODS.map(m => (
                <button key={m.emoji} onClick={() => setForm({ ...form, mood: m.emoji })}
                  title={m.label}
                  style={{
                    background: form.mood === m.emoji ? "rgba(14,165,233,0.25)" : "rgba(255,255,255,0.05)",
                    border: `2px solid ${form.mood === m.emoji ? "#38bdf8" : "transparent"}`,
                    borderRadius: 10, padding: "8px 10px", fontSize: 24, cursor: "pointer",
                  }}>{m.emoji}</button>
              ))}
            </div>
          </div>

          {/* Stiluri */}
          <div>
            <div style={{ color: "#475569", fontFamily: "sans-serif", fontSize: "0.8rem", marginBottom: 8 }}>Stiluri practicate</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {STYLES.map(s => (
                <button key={s} onClick={() => setForm({ ...form, styles: form.styles.includes(s) ? form.styles.filter(x => x !== s) : [...form.styles, s] })}
                  style={{
                    background: form.styles.includes(s) ? "rgba(14,165,233,0.25)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${form.styles.includes(s) ? "#38bdf8" : "rgba(125,211,252,0.15)"}`,
                    borderRadius: 8, padding: "6px 14px", color: form.styles.includes(s) ? "#38bdf8" : "#64748b",
                    fontFamily: "sans-serif", fontSize: "0.85rem", cursor: "pointer",
                  }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Note */}
          <textarea placeholder="Note / observații..."
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            rows={3}
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(125,211,252,0.2)",
              borderRadius: 10, padding: "10px 14px", color: "#e8f4ff", fontFamily: "sans-serif",
              fontSize: "0.9rem", width: "100%", boxSizing: "border-box", resize: "vertical", outline: "none",
            }} />

          <button onClick={handleAddLog} style={{
            background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
            border: "none", borderRadius: 14, padding: "14px 0",
            color: "#fff", fontFamily: "sans-serif", fontWeight: 700,
            fontSize: "1rem", cursor: "pointer", width: "100%",
            boxShadow: "0 4px 15px rgba(14,165,233,0.35)",
          }}>✅ Salvează antrenamentul</button>
        </div>
      </div>
    </div>
  )}
</div>
```

);
}
