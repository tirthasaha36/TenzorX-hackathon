"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "../page.css";

export default function Dashboard() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
          setSession(data);
        } else {
           window.location.href = "/onboarding";
        }
      } catch (e) {
        console.error("Failed to load session", e);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  if (loading) {
     return <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}><div className="dot-blink" style={{color: "white"}}>Loading Hub...</div></div>;
  }

  let topCountry = "Not Available";
  if (session?.recommendations) {
     try {
       const parsed = JSON.parse(session.recommendations);
       topCountry = parsed[0]?.country || "Global";
     } catch (e) {}
  }

  return (
    <main className="landing-page" style={{ minHeight: "100vh", paddingBottom: "4rem" }}>
      <nav className="navbar">
        <div className="container nav-content">
          <Link href="/" className="logo gradient-text text-xl font-bold">TenzorX</Link>
          <div className="nav-links">
             <span className="badge" style={{background: "var(--primary)"}}>Active Session</span>
          </div>
        </div>
      </nav>

      <section className="container animate-fade-in" style={{ paddingTop: "6rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
         <div>
            <h1 style={{ fontSize: "2.5rem" }}>Student <span className="gradient-text">Hub</span></h1>
            <p style={{ color: "#94a3b8" }}>Everything you need in one place.</p>
         </div>

         {/* Quick Stats Banner */}
         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div className="glass-panel" style={{ padding: "1.5rem", borderLeft: "4px solid var(--primary)" }}>
               <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>Top Suggested Country</p>
               <h3 style={{ fontSize: "1.5rem", margin: "0.5rem 0 0 0" }}>{topCountry}</h3>
            </div>
            <div className="glass-panel" style={{ padding: "1.5rem", borderLeft: "4px solid var(--accent)" }}>
               <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>Your Budget (USD)</p>
               <h3 style={{ fontSize: "1.5rem", margin: "0.5rem 0 0 0" }}>${session?.budget?.toLocaleString()}</h3>
            </div>
            <div className="glass-panel" style={{ padding: "1.5rem", borderLeft: "4px solid var(--secondary)" }}>
               <p style={{ fontSize: "0.85rem", color: "#94a3b8", margin: 0 }}>Academic Profile (CGPA)</p>
               <h3 style={{ fontSize: "1.5rem", margin: "0.5rem 0 0 0" }}>{session?.cgpa}</h3>
            </div>
         </div>

         {/* Navigation Hub */}
         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginTop: "1rem" }}>
            <Link href="/recommendations" style={{ textDecoration: "none", color: "inherit" }}>
               <div className="glass-panel" style={{ border: "1px solid rgba(139, 92, 246, 0.3)", padding: "2rem", transition: "transform 0.2s" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎓</div>
                  <h3>AI Recommendations</h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>View detailed university pathways, courses, and why they fit your exact profile.</p>
               </div>
            </Link>

            <Link href="/roi-calculator" style={{ textDecoration: "none", color: "inherit" }}>
               <div className="glass-panel" style={{ border: "1px solid rgba(16, 185, 129, 0.3)", padding: "2rem", transition: "transform 0.2s" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📈</div>
                  <h3>ROI & Insights</h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Visualize the financial breakeven of your global education with interactive charts.</p>
               </div>
            </Link>

            <Link href="/loans" style={{ textDecoration: "none", color: "inherit" }}>
               <div className="glass-panel" style={{ border: "1px solid rgba(236, 72, 153, 0.3)", padding: "2rem", transition: "transform 0.2s" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>💰</div>
                  <h3>Education Loans</h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Check real-time loan eligibility, EMI structures, and apply instantly.</p>
               </div>
            </Link>

            <Link href="/next-steps" style={{ textDecoration: "none", color: "inherit" }}>
               <div className="glass-panel" style={{ border: "1px solid rgba(245, 158, 11, 0.3)", padding: "2rem", transition: "transform 0.2s" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📂</div>
                  <h3>Application Next Steps</h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Track your timeline: IELTS preparation, SOP drafting, and final submission dates.</p>
               </div>
            </Link>
         </div>
      </section>
    </main>
  );
}
