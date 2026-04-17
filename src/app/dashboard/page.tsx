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

         {/* Navigation Hub & Passport */}
         <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "2rem", marginTop: "1rem" }}>
            
            {/* Main Navigation Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <Link href="/recommendations" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="glass-panel" style={{ border: "1px solid rgba(139, 92, 246, 0.3)", padding: "1.5rem", transition: "transform 0.2s", height: "100%" }}>
                    <div style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>🎓</div>
                    <h3 style={{ fontSize: "1.1rem" }}>AI Recommendations</h3>
                    <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>View detailed university pathways mapped to your exact profile.</p>
                </div>
              </Link>

              <Link href="/roi-calculator" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="glass-panel" style={{ border: "1px solid rgba(16, 185, 129, 0.3)", padding: "1.5rem", transition: "transform 0.2s", height: "100%" }}>
                    <div style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>📈</div>
                    <h3 style={{ fontSize: "1.1rem" }}>ROI & Insights</h3>
                    <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Visualize the financial breakeven with interactive charts.</p>
                </div>
              </Link>

              <Link href="/loans" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="glass-panel" style={{ border: "1px solid rgba(236, 72, 153, 0.3)", padding: "1.5rem", transition: "transform 0.2s", height: "100%" }}>
                    <div style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>💰</div>
                    <h3 style={{ fontSize: "1.1rem" }}>Education Loans</h3>
                    <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Check real-time loan eligibility and EMI structures.</p>
                </div>
              </Link>

              <Link href="/next-steps" style={{ textDecoration: "none", color: "inherit" }}>
                <div className="glass-panel" style={{ border: "1px solid rgba(245, 158, 11, 0.3)", padding: "1.5rem", transition: "transform 0.2s", height: "100%" }}>
                    <div style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>📂</div>
                    <h3 style={{ fontSize: "1.1rem" }}>Next Steps</h3>
                    <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Track your timeline: IELTS, SOP, and submission dates.</p>
                </div>
              </Link>
            </div>

            {/* Academic Passport Card */}
            <div className="glass-panel" style={{ background: "rgba(255,255,255,0.03)", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ margin: 0 }}>Academic Passport</h3>
                  <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>Verified Student Profile</p>
                </div>
                <div className="badge" style={{ background: "var(--primary)" }}>Tier 1 Eligibility</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Degree</span>
                  <span style={{ fontWeight: 600 }}>{session?.degree || "N/A"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>University</span>
                  <span style={{ fontWeight: 600 }}>{session?.university || "Global Grad"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>IELTS / TOEFL</span>
                  <span style={{ fontWeight: 600, color: "var(--accent)" }}>{session?.ieltsScore || "Not Taken"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Work Experience</span>
                  <span style={{ fontWeight: 600 }}>{session?.workExp || 0} Years</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Target Intake</span>
                  <span style={{ fontWeight: 600 }}>{session?.intake || "Fall 2026"}</span>
                </div>
              </div>

              <div style={{ marginTop: "auto", background: "rgba(139, 92, 246, 0.1)", padding: "1rem", borderRadius: "12px", border: "1px dashed var(--primary)" }}>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#e2e8f0" }}>
                  💡 <span style={{ fontWeight: 600 }}>AI Tip:</span> Your {session?.ieltsScore >= 7.5 ? "excellent" : "good"} IELTS score makes you a top candidate for IVY League scholarship programs.
                </p>
              </div>
            </div>

         </div>
      </section>
    </main>
  );
}
