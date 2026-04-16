"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "../page.css";

export default function Recommendations() {
  const [pathways, setPathways] = useState<any[]>([]);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionId = localStorage.getItem("tenzorx_sessionId");
      if (!sessionId) {
        window.location.href = "/onboarding";
        return;
      }
      try {
        const res = await fetch(`/api/session?id=${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.recommendations) setPathways(JSON.parse(data.recommendations));
        }
      } catch (e) {}
    };
    fetchSession();
  }, []);

  return (
    <main className="landing-page" style={{ minHeight: "100vh", paddingBottom: "4rem" }}>
      <nav className="navbar">
        <div className="container nav-content">
          <Link href="/dashboard" className="logo gradient-text text-xl font-bold">← Back to Hub</Link>
        </div>
      </nav>

      <section className="container animate-fade-in" style={{ paddingTop: "6rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div>
           <h1 style={{ fontSize: "2.5rem" }}>Your AI <span className="gradient-text">Pathways</span></h1>
           <p style={{ color: "#94a3b8" }}>The top 3 global study routes mapped specifically to your profile.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
           {pathways.length === 0 ? (
               <div className="glass-panel"><span className="dot-blink">Fetching AI Analysis...</span></div>
           ) : (
               pathways.map((path, idx) => (
                 <div key={idx} className="glass-panel" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "2rem" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", borderRight: "1px solid var(--glass-border)", paddingRight: "1rem" }}>
                       <h3 className="gradient-text" style={{ fontSize: "1.5rem", margin: 0 }}>{path.title}</h3>
                       <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                          <span className="badge" style={{ background: "rgba(139, 92, 246, 0.2)", border: "1px solid var(--primary)" }}>{path.country}</span>
                          <span className="badge" style={{ background: "rgba(16, 185, 129, 0.2)", border: "1px solid var(--accent)" }}>{path.roi_score} ROI</span>
                       </div>
                       <p style={{ margin: 0, fontWeight: "bold" }}>Estimated Cost: {path.estimated_cost}</p>
                    </div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                       <div>
                          <h4 style={{ color: "var(--accent)", marginBottom: "0.5rem" }}>Why It Fits You</h4>
                          <p style={{ color: "#cbd5e1", margin: 0, lineHeight: 1.6 }}>{path.why_it_fits}</p>
                       </div>
                       <div>
                          <h4 style={{ color: "var(--primary)", marginBottom: "0.5rem" }}>Target Universities</h4>
                          <ul style={{ color: "#94a3b8", display: "flex", flexWrap: "wrap", gap: "1rem", padding: 0, listStyle: "none" }}>
                             {path.top_universities.map((uni: string, i: number) => (
                               <li key={i}>✓ {uni}</li>
                             ))}
                          </ul>
                       </div>
                    </div>
                 </div>
               ))
           )}
        </div>
      </section>
    </main>
  );
}
