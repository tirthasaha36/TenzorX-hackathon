"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState<{ user: string; text: string }[]>([
    { user: "AI", text: "Hi there! 👋 I'm your TenzorX Mentor. Need help finding a university or understanding education loans?" }
  ]);
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = message;
    setMessage("");
    
    // Add user message to history
    const currentHistory = [...history];
    const newHistory = [...history, { user: "User", text: userMsg }];
    setHistory(newHistory);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: currentHistory.slice(1) }), // Skip the system greeting in history sent to backend
      });

      const data = await res.json();
      if (res.ok) {
        setHistory([...newHistory, { user: "AI", text: data.text }]);
      } else {
        setHistory([...newHistory, { user: "System", text: "Connection error: " + data.error }]);
      }
    } catch {
      setHistory([...newHistory, { user: "System", text: "Failed to send message." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed", bottom: "30px", right: "30px", width: "60px", height: "60px",
          background: "linear-gradient(135deg, var(--primary), var(--secondary))",
          borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(109,40,217,0.5)", cursor: "pointer", zIndex: 1000,
          fontSize: "1.5rem", transition: "transform 0.3s ease"
        }}
        className={isOpen ? "" : "pulse-anim"}
      >
        {isOpen ? "✕" : "💬"}
      </div>

      {isOpen && (
        <div className="glass-panel" style={{
          position: "fixed", bottom: "100px", right: "30px", width: "350px", height: "500px",
          zIndex: 1000, display: "flex", flexDirection: "column", padding: "0", overflow: "hidden"
        }}>
          <div style={{ background: "rgba(109,40,217,0.2)", padding: "1rem", borderBottom: "1px solid var(--glass-border)" }}>
            <h3 style={{ margin: 0, fontSize: "1.1rem" }}>TenzorX Mentor</h3>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#94a3b8" }}>AI Copilot</p>
          </div>

          <div style={{ flex: 1, padding: "1rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {history.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.user === "User" ? "flex-end" : "flex-start",
                background: msg.user === "User" ? "var(--primary)" : "rgba(255,255,255,0.1)",
                padding: "0.75rem 1rem", borderRadius: "12px", maxWidth: "85%",
                fontSize: "0.9rem", lineHeight: "1.4"
              }}>
                {msg.text}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", background: "rgba(255,255,255,0.1)", padding: "0.75rem 1rem", borderRadius: "12px" }}>
                <span className="dot-blink">...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          <form onSubmit={handleSend} style={{ display: "flex", padding: "1rem", borderTop: "1px solid var(--glass-border)", background: "rgba(0,0,0,0.2)" }}>
            <input 
              type="text" value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything..."
              style={{ flex: 1, background: "transparent", border: "none", color: "#fff", outline: "none" }}
            />
            <button type="submit" disabled={loading} style={{ background: "transparent", border: "none", color: "var(--secondary)", cursor: "pointer", fontWeight: "bold" }}>
              Send
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes pulseChat {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .pulse-anim { animation: pulseChat 2s infinite; }
        .dot-blink { animation: blink 1.4s infinite both; }
        @keyframes blink { 0% { opacity: 0.2; } 20% { opacity: 1; } 100% { opacity: 0.2; } }
      `}</style>
    </>
  );
}
