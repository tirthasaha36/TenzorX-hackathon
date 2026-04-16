import Link from "next/link";
import "../page.css";

export default function NextSteps() {
  const steps = [
    {
      title: "Preparation & Examinations",
      time: "Month 1 - 3",
      items: ["Register for IELTS / TOEFL", "Take GRE / GMAT (if necessary)", "Maintain academic GPA"],
      status: "active"
    },
    {
      title: "Shortlisting & Documentation",
      time: "Month 4 - 5",
      items: ["Review AI Recommendations", "Draft Statement of Purpose (SOP)", "Secure 2-3 Letters of Recommendation (LORs)"],
      status: "pending"
    },
    {
      title: "Application & Financing",
      time: "Month 6 - 8",
      items: ["Submit applications to target universities", "Simulate UI for pre-approved Education Loans"],
      status: "pending"
    },
    {
      title: "Visa & Departure",
      time: "Month 9 - 10",
      items: ["Receive i20 / CAS letter", "File student Visa application", "Book flight tickets!"],
      status: "pending"
    }
  ];

  return (
    <main className="landing-page" style={{ minHeight: "100vh", paddingBottom: "4rem" }}>
      <nav className="navbar">
        <div className="container nav-content">
          <Link href="/dashboard" className="logo gradient-text text-xl font-bold">← Back to Hub</Link>
        </div>
      </nav>

      <section className="container animate-fade-in" style={{ paddingTop: "6rem", display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
           <h1 style={{ fontSize: "2.5rem" }}>Application <span className="gradient-text">Timeline</span></h1>
           <p style={{ color: "#94a3b8" }}>Your comprehensive checklist mapped backwards from your target intake semester.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
           {steps.map((step, idx) => (
             <div key={idx} className="glass-panel" style={{ 
                borderLeft: step.status === "active" ? "4px solid var(--primary)" : "4px solid var(--glass-border)",
                opacity: step.status === "pending" ? 0.6 : 1
             }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                   <h3 style={{ margin: 0, color: step.status === "active" ? "#fff" : "#cbd5e1" }}>{idx + 1}. {step.title}</h3>
                   <span className="badge" style={{ background: step.status === "active" ? "rgba(139, 92, 246, 0.2)" : "rgba(255,255,255,0.05)", border: "none" }}>
                     {step.time}
                   </span>
                </div>
                <ul style={{ color: "#94a3b8", paddingLeft: "1.5rem", margin: 0, lineHeight: 1.8 }}>
                   {step.items.map((item, i) => (
                      <li key={i}>{item}</li>
                   ))}
                </ul>
             </div>
           ))}
        </div>
      </section>
    </main>
  );
}
