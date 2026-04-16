"use client";

import { useState } from "react";
import Link from "next/link";
import "../page.css";

export default function ROICalculator() {
  const [tuition, setTuition] = useState<number>(40000);
  const [living, setLiving] = useState<number>(15000);
  const [duration, setDuration] = useState<number>(2);
  const [expectedSalary, setExpectedSalary] = useState<number>(85000);

  const totalCost = (tuition + living) * duration;
  const breakEvenYears = totalCost / (expectedSalary * 0.3); // Assumes 30% of salary goes to repayment
  
  const EXCHANGE_RATE = 83; // Approx 1 USD = 83 INR
  const formatCurrency = (usd: number) => `$${usd.toLocaleString()} (₹${(usd * EXCHANGE_RATE).toLocaleString('en-IN')})`;

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

      <section className="container animate-fade-in" style={{ paddingTop: "4rem" }}>
        <div className="text-center" style={{ marginBottom: "3rem" }}>
          <div className="badge">📈 Financial Planning</div>
          <h1 className="hero-title" style={{ fontSize: "3rem" }}>
            Dynamic <span className="gradient-text">ROI Calculator</span>
          </h1>
          <p className="hero-subtitle" style={{ margin: "1rem auto 0" }}>
            Plan your education upfront. See exactly when your study abroad returns its investment.
          </p>
        </div>

        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", alignItems: "flex-start" }}>
          <div className="glass-panel" style={{ flex: "1 1 400px" }}>
            <h3 style={{ marginBottom: "1.5rem" }}>Cost Assumptions</h3>
            
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                Annual Tuition Fee: <span className="gradient-text font-bold">{formatCurrency(tuition)}</span>
              </label>
              <input 
                type="range" 
                min="10000" max="100000" step="1000"
                value={tuition}
                onChange={(e) => setTuition(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--primary)" }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                Annual Living Expenses: <span className="gradient-text font-bold">{formatCurrency(living)}</span>
              </label>
              <input 
                type="range" 
                min="5000" max="40000" step="500"
                value={living}
                onChange={(e) => setLiving(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--primary)" }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                Duration of Course (Years): <span className="gradient-text font-bold">{duration}</span>
              </label>
              <input 
                type="range" 
                min="1" max="5" step="1"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--primary)" }}
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", marginBottom: "0.5rem" }}>
                Expected Graduate Salary: <span className="gradient-text font-bold">{formatCurrency(expectedSalary)}</span>
              </label>
              <input 
                type="range" 
                min="30000" max="250000" step="5000"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--primary)" }}
              />
            </div>
          </div>

          <div className="glass-panel" style={{ flex: "1 1 400px", background: "rgba(109, 40, 217, 0.1)", border: "1px solid var(--primary)" }}>
            <h3 style={{ marginBottom: "2rem" }}>Your ROI Projection</h3>
            
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Total Education Cost</p>
              <h2 style={{ fontSize: "2.5rem", color: "#fff", lineHeight: "1.1" }}>{formatCurrency(totalCost)}</h2>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>Estimated Break-Even Time</p>
              <h2 style={{ fontSize: "2.5rem" }} className="gradient-text">
                {breakEvenYears.toFixed(1)} Years
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                *Assuming 30% of post-tax salary is used for repayment
              </p>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid var(--glass-border)", margin: "2rem 0" }} />

            <Link href="/dashboard" className="btn-primary" style={{ width: "100%" }}>
              Get Pre-Approved Loan Offer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
