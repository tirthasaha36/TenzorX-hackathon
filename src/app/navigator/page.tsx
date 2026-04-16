"use client";

import { useState } from "react";
import Link from "next/link";
import "../page.css";

interface Pathway {
  title: string;
  country: string;
  top_universities: string[];
  estimated_cost: string;
  roi_score: string;
  why_it_fits: string;
}

export default function CareerNavigator() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Pathway[] | null>(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    education: "B.Tech in Computer Science",
    field: "Artificial Intelligence",
    budget: 50000,
    duration: 2,
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults(null);

    try {
      const res = await fetch("/api/navigator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      
      setResults(data.pathways || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="landing-page" style={{ minHeight: "100vh" }}>
      <nav className="navbar">
        <div className="container nav-content">
          <Link href="/" className="logo gradient-text text-xl font-bold">
            TenzorX
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
          </div>
        </div>
      </nav>

      <section className="container animate-fade-in" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
        <div className="text-center" style={{ marginBottom: "3rem" }}>
          <div className="badge">🧭 AI-Powered Decision Making</div>
          <h1 className="hero-title" style={{ fontSize: "3rem" }}>
            AI Career <span className="gradient-text">Navigator</span>
          </h1>
          <p className="hero-subtitle" style={{ margin: "1rem auto 0" }}>
            Let our Generative AI model match your profile with the best global education pathways instantly.
          </p>
        </div>

        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          {/* Input Form */}
          <div className="glass-panel" style={{ flex: "1 1 350px" }}>
            <h3 style={{ marginBottom: "1.5rem" }}>Your Profile Profile</h3>
            <form onSubmit={handleGenerate}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Current Education</label>
                <input 
                  type="text" 
                  className="input-glass" 
                  value={formData.education}
                  onChange={(e) => setFormData({...formData, education: e.target.value})}
                  required
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Target Field of Study</label>
                <input 
                  type="text" 
                  className="input-glass" 
                  value={formData.field}
                  onChange={(e) => setFormData({...formData, field: e.target.value})}
                  placeholder="e.g. Data Science, MBA"
                  required
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Family Budget limit (USD)</label>
                <input 
                  type="number" 
                  className="input-glass" 
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
                  required
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.9rem" }}>Preferred Duration (Years)</label>
                <input 
                  type="number" 
                  className="input-glass" 
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})}
                  min="1" max="5"
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: "100%" }} disabled={loading}>
                {loading ? "Generating Pathways..." : "Analyze with AI"}
              </button>
            </form>
          </div>

          {/* Results Area */}
          <div style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {!loading && !results && !error && (
              <div className="glass-panel text-center" style={{ padding: "4rem 2rem", opacity: 0.7 }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✨</div>
                <h3>Awaiting Inputs</h3>
                <p>Fill out the form to let our LLM map out your dream career.</p>
              </div>
            )}

            {error && (
              <div className="badge" style={{ borderColor: "#ef4444", color: "#ef4444", backgroundColor: "rgba(239, 68, 68, 0.1)" }}>
                Error: {error}
              </div>
            )}

            {loading && (
               <div className="glass-panel text-center animate-fade-in" style={{ padding: "4rem 2rem" }}>
                 <div className="glow-sphere" style={{ width: "60px", height: "60px", animationDuration: "1s", margin: "0 auto 1.5rem" }}></div>
                 <h3>Consulting AI...</h3>
                 <p>Finding the highest ROI pathways matching your profile.</p>
               </div>
            )}

            {results && results.map((path, idx) => (
              <div key={idx} className="glass-panel animate-fade-in" style={{ animationDelay: `${idx * 0.1}s`, borderLeft: "4px solid var(--primary)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <h3 style={{ margin: "0 0 0.2rem 0" }}>{path.title}</h3>
                    <p className="gradient-text" style={{ fontWeight: 600, margin: 0 }}>📍 {path.country}</p>
                  </div>
                  <div className="badge" style={{ margin: 0, padding: "0.2rem 0.6rem", fontSize: "0.75rem", background: path.roi_score === "High" ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.1)", border: "none" }}>
                    {path.roi_score} ROI
                  </div>
                </div>

                <p style={{ fontSize: "0.95rem", color: "#cbd5e1", marginBottom: "1rem" }}>
                  {path.why_it_fits}
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.85rem", background: "rgba(0,0,0,0.3)", padding: "1rem", borderRadius: "8px" }}>
                  <div>
                    <strong style={{ color: "#94a3b8" }}>Top Schools:</strong>
                    <div>{path.top_universities.slice(0, 2).join(", ")}</div>
                  </div>
                  <div>
                    <strong style={{ color: "#94a3b8" }}>Est. Cost:</strong>
                    <div>{path.estimated_cost}</div>
                  </div>
                </div>
              </div>
            ))}

            {results && (
              <Link href="/dashboard" className="btn-secondary" style={{ textAlign: "center", padding: "1rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", marginTop: "1rem" }}>
                Ready to Fund This? Proceed to Dashboard →
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
