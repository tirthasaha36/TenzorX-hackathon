"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../page.css";

export default function Onboarding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cgpa: "8.5",
    budget: 50000,
    preferredCountry: "USA",
    duration: 2
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Send data to Groq AI Navigator
      const resAI = await fetch("/api/navigator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          education: "Undergraduate",
          field: "Masters/Post-grad general",
          budget: formData.budget,
          duration: formData.duration
        })
      });
      const aiData = await resAI.json();

      // 2. Save profile and AI results to Database
      const resSession = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recommendations: JSON.stringify(aiData.pathways)
        })
      });
      const sessionData = await resSession.json();

      // Save the DB Session ID to the browser to persist the state
      localStorage.setItem("tenzorx_sessionId", sessionData.id);

      // Redirect to the Dashboard hub
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <main className="landing-page" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <nav className="navbar">
        <div className="container nav-content">
          <Link href="/" className="logo gradient-text text-xl font-bold">TenzorX</Link>
        </div>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div className="glass-panel animate-fade-in" style={{ width: "100%", maxWidth: "500px", padding: "3rem" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Let's build your profile.</h2>
          <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Share a few details so our AI can map your optimal education pathway.</p>
          
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "#e2e8f0" }}>Current CGPA</label>
              <input 
                type="number" step="0.1" max="10" required
                value={formData.cgpa} onChange={(e) => setFormData({...formData, cgpa: e.target.value})}
                style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--glass-border)", borderRadius: "8px", color: "white" }}
              />
            </div>
            
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", color: "#e2e8f0" }}>Total Education Budget (USD)</label>
              <input 
                type="number" required
                value={formData.budget} onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
                style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--glass-border)", borderRadius: "8px", color: "white" }}
              />
            </div>

            <div>
               <label style={{ display: "block", marginBottom: "0.5rem", color: "#e2e8f0" }}>Preferred Country</label>
               <select 
                  value={formData.preferredCountry} onChange={(e) => setFormData({...formData, preferredCountry: e.target.value})}
                  style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--glass-border)", borderRadius: "8px", color: "white" }}
                >
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
               </select>
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ width: "100%", marginTop: "1rem", textAlign: "center", justifyContent: "center" }}>
              {loading ? "Generating Pathways..." : "Analyze Profile"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
