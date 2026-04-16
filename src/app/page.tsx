import Link from "next/link";
import "./page.css";

export default function Home() {
  return (
    <main className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">
            <span className="gradient-text text-xl font-bold">TenzorX</span>
          </div>
          <div className="nav-links">
            <Link href="#features" className="nav-link">Features</Link>
            <Link href="#loans" className="nav-link">Education Loans</Link>
            <Link href="/dashboard" className="btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero container animate-fade-in">
        <div className="hero-text">
          <div className="badge">✨ AI-Powered Student Ecosystem</div>
          <h1 className="hero-title">
            <span className="gradient-text">Plan Your Study Abroad Journey with AI</span>
          </h1>
          <p className="hero-subtitle">
            From discovering the perfect university with our AI Career Navigator to securing the best education loan. Uncomplicate your study abroad journey.
          </p>
          <div className="hero-cta">
            <Link href="/onboarding" className="btn-primary btn-lg">
              Get Started
            </Link>
          </div>
        </div>
        
        {/* Abstract 3D/Glass Hero Visual */}
        <div className="hero-visual">
          <div className="glass-card card-1">
            <div className="card-icon">🎓</div>
            <div className="card-info">
              <h4>Top Universities Match</h4>
              <p>94% Acceptance Probability</p>
            </div>
          </div>
          <div className="glass-card card-2">
            <div className="card-icon">💸</div>
            <div className="card-info">
              <h4>Loan Pre-approved</h4>
              <p>At 8.5% Interest Rate</p>
            </div>
          </div>
          <div className="glow-sphere"></div>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="features" className="features-section container">
        <h2 className="section-title text-center">Engagement Driven by AI</h2>
        <div className="features-grid">
          <div className="feature-card glass-panel">
            <h3 className="feature-title inline-icon">🧭 AI Career Navigator</h3>
            <p>We analyze your profile using advanced LLMs to suggest the best-fit countries, courses, and tailored career pathways instantly.</p>
          </div>
          <div className="feature-card glass-panel">
            <h3 className="feature-title inline-icon">📈 Dynamic ROI Calculator</h3>
            <p>Input your education costs and expected salary to visually predict your Return on Investment over the next 10 years.</p>
          </div>
          <div className="feature-card glass-panel">
            <h3 className="feature-title inline-icon">🤖 Mentor Copilot</h3>
            <p>24/7 conversational guidance. Ask any doubt regarding visas, loans, or applications and get instant, accurate responses.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
