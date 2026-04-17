"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "../page.css";

export default function Onboarding() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    degree: "B.Tech",
    university: "",
    cgpa: "8.5",
    gradYear: "2024",
    ieltsScore: "7.0",
    greScore: "",
    workExp: "0",
    budget: 50000,
    preferredCountry: "USA",
    intake: "Fall 2026"
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const calculateStrength = () => {
    let filled = 0;
    const total = Object.keys(formData).length;
    Object.values(formData).forEach(val => {
      if (val !== "" && val !== 0) filled++;
    });
    return Math.round((filled / total) * 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Send data to Groq AI Navigator (Updated to include all fields)
      const resAI = await fetch("/api/navigator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          education: formData.degree,
          university: formData.university,
          cgpa: formData.cgpa,
          ielts: formData.ieltsScore,
          gre: formData.greScore,
          workExp: formData.workExp,
          budget: formData.budget,
          country: formData.preferredCountry,
          intake: formData.intake
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

      localStorage.setItem("tenzorx_sessionId", sessionData.id);
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
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
             <div style={{ width: "150px", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ width: `${calculateStrength()}%`, height: "100%", background: "var(--primary)", transition: "width 0.5s ease" }}></div>
             </div>
             <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{calculateStrength()}% Profile Strength</span>
          </div>
        </div>
      </nav>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div className="glass-panel animate-fade-in" style={{ width: "100%", maxWidth: "600px", padding: "3rem" }}>
          
          {step === 1 && (
            <div className="step-content">
              <div className="badge" style={{ marginBottom: "1rem" }}>Step 1 of 3: Academic Background</div>
              <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Where did you start?</h2>
              <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Share your graduation details to build your foundation.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label className="label">Most Recent Degree</label>
                    <select className="input" value={formData.degree} onChange={(e) => setFormData({...formData, degree: e.target.value})}>
                      <option value="B.Tech">B.Tech / BE</option>
                      <option value="B.Com">B.Com</option>
                      <option value="BCA">BCA / BSc CS</option>
                      <option value="BBA">BBA / BBM</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Graduation Year</label>
                    <input type="number" className="input" value={formData.gradYear} onChange={(e) => setFormData({...formData, gradYear: e.target.value})} placeholder="2024" />
                  </div>
                </div>
                <div>
                  <label className="label">University Name</label>
                  <input type="text" className="input" value={formData.university} onChange={(e) => setFormData({...formData, university: e.target.value})} placeholder="Enter university name" />
                </div>
                <div>
                  <label className="label">Current CGPA (out of 10)</label>
                  <input type="number" step="0.1" className="input" value={formData.cgpa} onChange={(e) => setFormData({...formData, cgpa: e.target.value})} />
                </div>
                <button onClick={nextStep} className="btn-primary" style={{ marginTop: "1rem", width: "100%", justifyContent: "center" }}>Continue to Global Standing</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <div className="badge" style={{ marginBottom: "1rem" }}>Step 2 of 3: Global Readiness</div>
              <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Your competitive edge.</h2>
              <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Standardized tests and experience help AI find Tier 1 matches.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label className="label">IELTS / TOEFL Score</label>
                    <input type="number" step="0.5" className="input" value={formData.ieltsScore} onChange={(e) => setFormData({...formData, ieltsScore: e.target.value})} placeholder="e.g. 7.5" />
                  </div>
                  <div>
                    <label className="label">GRE / GMAT (Optional)</label>
                    <input type="number" className="input" value={formData.greScore} onChange={(e) => setFormData({...formData, greScore: e.target.value})} placeholder="e.g. 320" />
                  </div>
                </div>
                <div>
                  <label className="label">Work Experience (Years)</label>
                  <input type="number" className="input" value={formData.workExp} onChange={(e) => setFormData({...formData, workExp: e.target.value})} />
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button onClick={prevStep} className="btn-secondary glass-panel" style={{ flex: 1, justifyContent: "center" }}>Back</button>
                  <button onClick={nextStep} className="btn-primary" style={{ flex: 2, justifyContent: "center" }}>Continue to Goals</button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content">
              <div className="badge" style={{ marginBottom: "1rem" }}>Step 3 of 3: Vision & Budget</div>
              <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Where are you headed?</h2>
              <p style={{ color: "#94a3b8", marginBottom: "2rem" }}>Finalize your destination and financial capacity.</p>
              
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label className="label">Preferred Country</label>
                    <select className="input" value={formData.preferredCountry} onChange={(e) => setFormData({...formData, preferredCountry: e.target.value})}>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Target Intake</label>
                    <select className="input" value={formData.intake} onChange={(e) => setFormData({...formData, intake: e.target.value})}>
                      <option value="Fall 2026">Fall 2026</option>
                      <option value="Spring 2026">Spring 2026</option>
                      <option value="Fall 2025">Fall 2025</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label">Total Education Budget (USD)</label>
                  <input type="number" className="input" value={formData.budget} onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})} />
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button type="button" onClick={prevStep} className="btn-secondary glass-panel" style={{ flex: 1, justifyContent: "center" }}>Back</button>
                  <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 2, justifyContent: "center" }}>
                    {loading ? "Creating Passport..." : "Submit Passport"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .label { display: block; margin-bottom: 0.5rem; color: #e2e8f0; font-size: 0.9rem; }
        .input { 
          width: 100%; padding: 0.75rem; 
          background: rgba(0,0,0,0.3); border: 1px solid var(--glass-border); 
          borderRadius: 8px; color: white; outline: none; transition: border-color 0.2s;
        }
        .input:focus { border-color: var(--primary); }
        .step-content { animation: slideIn 0.4s ease-out; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </main>
  );
}
