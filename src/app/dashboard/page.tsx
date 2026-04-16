"use client";

import { useState } from "react";
import Link from "next/link";
import "../page.css";

export default function Dashboard() {
  const [loanStatus, setLoanStatus] = useState("Pre-Approved");
  const [documents, setDocuments] = useState({
    offerLetter: false,
    kyc: false,
    financials: false,
  });

  const allUploaded = documents.offerLetter && documents.kyc && documents.financials;

  return (
    <main className="landing-page" style={{ minHeight: "100vh" }}>
      <nav className="navbar">
        <div className="container nav-content">
          <Link href="/" className="logo gradient-text text-xl font-bold">
            TenzorX
          </Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/navigator" className="nav-link">AI Navigator</Link>
          </div>
        </div>
      </nav>

      <section className="container animate-fade-in" style={{ padding: "4rem 2rem", display: "grid", gridTemplateColumns: "1fr 3fr", gap: "2rem" }}>
        {/* Sidebar */}
        <div className="glass-panel" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", margin: "0 0 0.5rem 0" }}>Student Hub</h3>
            <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: 0 }}>Arjun's Dashboard</p>
          </div>
          
          <div style={{ borderTop: "1px solid var(--glass-border)", paddingTop: "1.5rem" }}>
            <h4 style={{ marginBottom: "1rem", color: "var(--secondary)" }}>Your Journey</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.95rem" }}>
              <li style={{ color: "var(--accent)" }}>✓ Explored Universities</li>
              <li style={{ color: "var(--accent)" }}>✓ Calculated ROI</li>
              <li style={{ color: "#fff", fontWeight: "bold" }}>● Secure Education Loan</li>
              <li style={{ color: "#475569" }}>○ Visa Application</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Status Nudge */}
           <div className="glass-panel" style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid var(--accent)", padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "#fff" }}>Smart Nudge: Loan Pre-Approval</h3>
              <p style={{ margin: 0, color: "#cbd5e1", fontSize: "0.95rem" }}>Based on your target ROI and profile, you are eligible for up to <strong>$75,000</strong> at <strong>8.5% p.a.</strong></p>
            </div>
            <div className="badge" style={{ background: "var(--accent)", color: "#fff", border: "none" }}>{loanStatus}</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {/* Offer Details */}
            <div className="glass-panel">
              <h3 style={{ marginBottom: "1.5rem" }}>Dynamic Loan Offer</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--glass-border)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "#94a3b8" }}>Loan Amount</span>
                  <strong style={{ color: "#fff" }}>$75,000</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--glass-border)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "#94a3b8" }}>Interest Rate</span>
                  <strong style={{ color: "#fff" }}>8.5% (Variable)</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--glass-border)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "#94a3b8" }}>EMIs Begin</span>
                  <strong style={{ color: "#fff" }}>6 months post-graduation</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "#94a3b8" }}>Estimated Default Prob.</span>
                  <strong className="gradient-text">Low Risk (via AI)</strong>
                </div>
              </div>
            </div>

            {/* Document Checklist */}
            <div className="glass-panel">
              <h3 style={{ marginBottom: "1.5rem" }}>Document Checklist</h3>
              <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "1.5rem" }}>Upload the necessary documents. Our AI agent will auto-fill your application automatically.</p>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}>
                  <input type="checkbox" checked={documents.offerLetter} onChange={(e) => setDocuments({...documents, offerLetter: e.target.checked})} style={{ width: "20px", height: "20px", accentColor: "var(--primary)" }} />
                  <span style={{ color: documents.offerLetter ? "var(--accent)" : "#fff" }}>University Offer Letter</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}>
                  <input type="checkbox" checked={documents.kyc} onChange={(e) => setDocuments({...documents, kyc: e.target.checked})} style={{ width: "20px", height: "20px", accentColor: "var(--primary)" }} />
                  <span style={{ color: documents.kyc ? "var(--accent)" : "#fff" }}>KYC Documents (Aadhar/Passport)</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer" }}>
                  <input type="checkbox" checked={documents.financials} onChange={(e) => setDocuments({...documents, financials: e.target.checked})} style={{ width: "20px", height: "20px", accentColor: "var(--primary)" }} />
                  <span style={{ color: documents.financials ? "var(--accent)" : "#fff" }}>Co-applicant Financials (ITR)</span>
                </label>
              </div>

              <div style={{ marginTop: "2rem" }}>
                {!allUploaded ? (
                   <div style={{ fontSize: "0.85rem", color: "#ef4444", padding: "0.5rem", background: "rgba(239, 68, 68, 0.1)", borderRadius: "8px", textAlign: "center" }}>
                     Please tick all documents to simulate upload and proceed.
                   </div>
                ) : (
                  <button 
                    onClick={() => setLoanStatus("Application Under Review")}
                    className="btn-primary" 
                    style={{ width: "100%" }}
                  >
                    Simulate AI Auto-Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
