import { useState, useRef, useEffect } from "react";

const SUGGESTED_STARTERS = [
  "I need a jet from Miami to Aspen next Friday",
  "Looking for a round trip, 6 passengers, NYC to London",
  "What's this going to cost me roughly?",
];

function parseLead(content) {
  const idx = content.indexOf("---\nLEAD SUMMARY");
  if (idx === -1) return null;
  const block = content.slice(idx);
  const lines = block
    .split("\n")
    .filter((l) => l.includes(":") && !l.startsWith("---") && l !== "LEAD SUMMARY");
  const lead = {};
  lines.forEach((line) => {
    const [label, ...rest] = line.split(":");
    lead[label.trim().toLowerCase()] = rest.join(":").trim();
  });
  return lead;
}

export default function KristReserve() {
  const [view, setView] = useState("chat");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Good evening. I'm KRIST, your concierge for Alta Jet Partners. Where would you like to fly?",
    },
  ]);
  const [leads, setLeads] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text) {
    if (!text.trim() || loading) return;
    const newMessages = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Request failed");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
      const lead = parseLead(data.text);
      if (lead) {
        setLeads((prev) => [{ ...lead, id: Date.now(), capturedAt: new Date() }, ...prev]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function renderMessageContent(content) {
    const idx = content.indexOf("---\nLEAD SUMMARY");
    if (idx === -1) return <p className="msg-text">{content}</p>;
    const before = content.slice(0, idx).trim();
    const summaryBlock = content.slice(idx);
    const lines = summaryBlock
      .split("\n")
      .filter((l) => l.includes(":") && !l.startsWith("---") && l !== "LEAD SUMMARY");
    return (
      <>
        {before && <p className="msg-text">{before}</p>}
        <div className="summary-card">
          <div className="summary-header">
            <span className="summary-dot" />
            LEAD SUMMARY
          </div>
          {lines.map((line, i) => {
            const [label, ...rest] = line.split(":");
            return (
              <div className="summary-row" key={i}>
                <span className="summary-label">{label.trim()}</span>
                <span className="summary-value">{rest.join(":").trim()}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <div className="kr-root">
      <div className="kr-header">
        <div className="kr-brand">
          <div className="kr-wordmark">
            <span>KRIST</span> <span style={{ fontWeight: 400 }}>Reserve.</span>
          </div>
          <div className="kr-subline">for Alta Jet Partners</div>
        </div>
        <div className="kr-header-right">
          <div className="kr-tabs">
            <button
              className={`kr-tab ${view === "chat" ? "active" : ""}`}
              onClick={() => setView("chat")}
            >
              Concierge
            </button>
            <button
              className={`kr-tab ${view === "dashboard" ? "active" : ""}`}
              onClick={() => setView("dashboard")}
            >
              Leads{leads.length > 0 ? ` (${leads.length})` : ""}
            </button>
          </div>
          <div className="kr-status">
            <span className="kr-status-dot" />
            Online
          </div>
        </div>
      </div>

      {view === "dashboard" ? (
        <div className="kr-dashboard">
          {leads.length === 0 ? (
            <div className="kr-empty">
              <div className="kr-empty-title">No leads captured yet</div>
              <div className="kr-empty-sub">
                Completed conversations will appear here as qualified leads.
              </div>
            </div>
          ) : (
            <div className="kr-lead-list">
              {leads.map((lead) => (
                <div
                  className={`kr-lead-card ${
                    lead.urgency?.toLowerCase().includes("urgent") ? "urgent" : ""
                  }`}
                  key={lead.id}
                >
                  <div className="kr-lead-top">
                    <span className="kr-lead-route">{lead.route || "Route not specified"}</span>
                    {lead.urgency?.toLowerCase().includes("urgent") && (
                      <span className="kr-urgent-tag">Urgent</span>
                    )}
                  </div>
                  <div className="kr-lead-grid">
                    <div className="kr-lead-field">
                      <span className="kr-lead-label">Date(s)</span>
                      <span className="kr-lead-value">{lead["date(s)"] || "—"}</span>
                    </div>
                    <div className="kr-lead-field">
                      <span className="kr-lead-label">Passengers</span>
                      <span className="kr-lead-value">{lead.passengers || "—"}</span>
                    </div>
                    <div className="kr-lead-field">
                      <span className="kr-lead-label">Aircraft pref.</span>
                      <span className="kr-lead-value">{lead["aircraft preference"] || "—"}</span>
                    </div>
                    <div className="kr-lead-field">
                      <span className="kr-lead-label">Budget</span>
                      <span className="kr-lead-value">{lead["budget indication"] || "—"}</span>
                    </div>
                    <div className="kr-lead-field wide">
                      <span className="kr-lead-label">Special requests</span>
                      <span className="kr-lead-value">{lead["special requests"] || "—"}</span>
                    </div>
                    <div className="kr-lead-field wide">
                      <span className="kr-lead-label">Contact</span>
                      <span className="kr-lead-value">{lead.contact || "—"}</span>
                    </div>
                  </div>
                  <div className="kr-lead-time">
                    Captured{" "}
                    {lead.capturedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          <div className="kr-chat" ref={scrollRef}>
            {messages.map((m, i) => (
              <div className={`msg-row ${m.role}`} key={i}>
                <div className="msg-bubble">{renderMessageContent(m.content)}</div>
              </div>
            ))}
            {loading && (
              <div className="msg-row assistant">
                <div className="msg-bubble kr-thinking">
                  <span className="radar" />
                  <span className="kr-thinking-text">KRIST is typing</span>
                </div>
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="kr-starters">
              {SUGGESTED_STARTERS.map((s, i) => (
                <button className="starter-chip" key={i} onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="kr-inputbar">
            <input
              className="kr-input"
              placeholder="Message KRIST..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage(input);
              }}
            />
            <button
              className="kr-send"
              disabled={loading || !input.trim()}
              onClick={() => sendMessage(input)}
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 12L20 4L13 20L11 13L4 12Z" fill="#0B1520" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
